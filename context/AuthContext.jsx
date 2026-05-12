"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  async function syncUserToBackend(user) {
    if (!user) {
      setDbUser(null);
      return null;
    }

    const token = await user.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/sync`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to sync user.");
    }

    setDbUser(data.user);
    return data.user;
  }

  async function registerWithEmail({ name, email, password }) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
    });

    await result.user.reload();

    const updatedUser = auth.currentUser;
    await syncUserToBackend(updatedUser);

    return updatedUser;
  }

  async function loginWithEmail({ email, password }) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await syncUserToBackend(result.user);
    return result.user;
  }

  async function loginWithGoogle() {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, googleProvider);
    await syncUserToBackend(result.user);
    return result.user;
  }

  async function logout() {
    await signOut(auth);
    setFirebaseUser(null);
    setDbUser(null);
  }

  async function getToken() {
    if (!auth.currentUser) {
      return null;
    }

    return auth.currentUser.getIdToken();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setFirebaseUser(user);

        if (user) {
          await syncUserToBackend(user);
        } else {
          setDbUser(null);
        }
      } catch (error) {
        console.error(error);
        setDbUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    firebaseUser,
    dbUser,
    isAuthLoading,
    isLoggedIn: Boolean(firebaseUser),
    role: dbUser?.role || "guest",
    isAdmin: dbUser?.role === "admin",
    isManager: dbUser?.role === "manager",
    isUser: dbUser?.role === "user",
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    getToken,
    syncUserToBackend,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}