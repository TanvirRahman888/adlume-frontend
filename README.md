# Adlume Media Frontend

Frontend website for Adlume Media, a digital marketing agency website built with Next.js, React.js, Tailwind CSS, and Firebase Authentication. The frontend connects with a separate Node.js/Express backend API to load services, portfolio projects, and client reviews dynamically.

## Live Website

https://adlumemedia.vercel.app

## Backend API

https://adlume-backend.onrender.com

## Features

- Modern responsive agency website
- Light and dark mode support
- Dynamic homepage sections
- Hero image slider using Swiper.js
- Services page loaded from backend API
- Dynamic service details pages using slugs
- Portfolio page with category filtering
- Dynamic portfolio details pages using slugs
- Client feedback slider loaded from MongoDB
- Review modal for long feedback
- Contact page with validated contact form
- Human verification on contact form
- Loading states and success/error modals
- Email sending through Nodemailer API route
- Frontend deployed on Vercel
- Backend connected through environment-based API URL

## Tech Stack

- Next.js
- React.js
- Tailwind CSS
- JavaScript / JSX
- Firebase Authentication
- Swiper.js
- Lucide React
- React Icons
- Nodemailer
- Vercel

## Project Structure

```txt
adlume-frontend/
  app/
    about/
    api/
      contact/
        route.js
    blog/
      [slug]/
    contact/
    portfolio/
      [slug]/
    services/
      [slug]/
    globals.css
    layout.js
    page.js

  components/
    about/
    blog/
    contact/
    home/
    portfolio/
    services/
    Container.jsx
    Footer.jsx
    Navbar.jsx
    PrimaryButton.jsx
    SectionTitle.jsx
    ThemeProvider.jsx
    ThemeToggle.jsx

  data/
    blogData.js

  public/
    images/
      hero/
      logo/
      projects/
      services/

  .env.local
  .gitignore
  package.json
  README.md
```

## Main Pages

### Home Page

```txt
/
```

Includes:

- Hero slider
- Services preview
- Why choose us section
- Recent projects
- Process section
- Pricing section
- Client feedback section
- CTA section

### About Page

```txt
/about
```

Includes agency introduction, mission, values, process, and brand-focused content.

### Services Page

```txt
/services
```

Loads service data from the backend API.

Service details pages use dynamic slugs:

```txt
/services/digital-marketing
/services/social-media-marketing
/services/facebook-instagram-ads
/services/content-creation
/services/graphic-design-branding
/services/web-design-development
/services/lead-generation
/services/google-local-business-setup
```

### Portfolio Page

```txt
/portfolio
```

Loads portfolio projects from the backend API and supports category filtering.

Portfolio details pages use dynamic slugs:

```txt
/portfolio/fresh-healthy-food-design
/portfolio/shoe-sale-campaign
/portfolio/interior-design-website
```

### Blog Page

```txt
/blog
```

Blog content is currently managed from local data.

### Contact Page

```txt
/contact
```

Includes:

- Full name field
- Contact email field
- Contact number field
- Country field
- Subject selection
- Custom subject option
- Message textarea
- Terms checkbox
- Human verification
- Loading submit button
- Success and failure modal
- Email sending through API route

## Environment Variables

Create a `.env.local` file in the frontend root directory.

```env
NEXT_PUBLIC_API_URL=https://adlume-backend.onrender.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_google_app_password
CONTACT_RECEIVER_EMAIL=your_receiver_email@gmail.com
```

For local backend development, use:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Important:

```txt
Never push .env.local to GitHub.
```

## Installation

Clone the repository:

```bash
git clone https://github.com/TanvirRahman888/adlume-frontend.git
```

Go to the project folder:

```bash
cd adlume-frontend
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and add the required environment variables.

## Run Locally

Start the frontend development server:

```bash
npm run dev
```

Frontend will run locally at:

```txt
http://localhost:3000
```

Make sure the backend is also running locally or deployed.

Local backend URL:

```txt
http://localhost:5000
```

Live backend URL:

```txt
https://adlume-backend.onrender.com
```

## API Connection

The frontend connects to the backend using:

```env
NEXT_PUBLIC_API_URL=https://adlume-backend.onrender.com
```

Dynamic sections using backend API:

```txt
Homepage Services
Homepage Recent Projects
Homepage Client Reviews
Services Page
Service Details Pages
Portfolio Page
Portfolio Details Pages
```

## Contact Form Email

The contact form sends email using a Next.js API route:

```txt
app/api/contact/route.js
```

The email system uses Nodemailer with SMTP configuration.

Required SMTP variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_google_app_password
CONTACT_RECEIVER_EMAIL=your_receiver_email@gmail.com
```

For Gmail, use a Google App Password instead of the normal Gmail password.

## Deployment

This frontend is deployed on Vercel.

Vercel environment variable:

```env
NEXT_PUBLIC_API_URL=https://adlume-backend.onrender.com
```

If the contact form is used in production, also add:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_google_app_password
CONTACT_RECEIVER_EMAIL=your_receiver_email@gmail.com
```

After adding or changing environment variables in Vercel, redeploy the project.

## Backend CORS

The backend must allow the frontend domain.

Backend environment variable example:

```env
PRODUCTION_FRONTEND_URL=https://adlumemedia.vercel.app
```

If the frontend cannot fetch backend data, check:

```txt
Browser Console → CORS error
Backend Render environment variables
Frontend Vercel NEXT_PUBLIC_API_URL
```

## Useful Commands

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Lint project:

```bash
npm run lint
```

## Related Backend

Backend repository:

```txt
https://github.com/TanvirRahman888/adlume-backend
```

Backend live API:

```txt
https://adlume-backend.onrender.com
```

Backend stack:

```txt
Node.js, Express.js, MongoDB, Mongoose, Firebase Admin SDK, Render
```

## Project Summary

Adlume Media Website is a full-stack digital marketing agency website. The frontend is built with Next.js and Tailwind CSS, while the backend is built separately with Node.js, Express.js, and MongoDB. The website dynamically displays services, portfolio projects, and client reviews from the backend API and provides a validated contact form for client inquiries.

## Author

Md Tanvir Rahman
01770-888106
tanvirrahman8888@gmail.com