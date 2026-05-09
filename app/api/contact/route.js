import nodemailer from "nodemailer";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      country,
      subject,
      message,
      verificationAnswer,
      expectedAnswer,
      website,
    } = body;

    if (website) {
      return Response.json(
        { message: "Message submitted successfully." },
        { status: 200 }
      );
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !country ||
      !subject ||
      !message ||
      verificationAnswer === undefined ||
      expectedAnswer === undefined
    ) {
      return Response.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (Number(verificationAnswer) !== Number(expectedAnswer)) {
      return Response.json(
        { message: "Human verification failed." },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_RECEIVER_EMAIL
    ) {
      return Response.json(
        { message: "Email server is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
        <h2>New Contact Message - Adlume Media</h2>

        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <hr />

        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Adlume Media Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: emailHtml,
    });

    return Response.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error?.message ||
          "Something went wrong while sending the message.",
      },
      { status: 500 }
    );
  }
}