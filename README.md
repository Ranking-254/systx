# SYSTX // DIGITAL_INFRASTRUCTURE

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3FCF8E?style=flat-square&logo=supabase)

A high-performance digital infrastructure company website built with Next.js 16, featuring a distinctive terminal/hacker aesthetic, authentication system, client portal, and admin dashboard.

---

- # Here is a live website url feel free to check it out 👇👇
  [Live Website](https://systx-infra.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**SYSTX** is a modern, dark-themed website for a digital infrastructure company specializing in:

- Custom Software Development
- Cloud Infrastructure (AWS/Azure)
- Cybersecurity Solutions
- Digital SaaS Products
- Media Production & Event Coverage

The application features a unique "terminal/hacker" visual aesthetic with:

- Particle background animations
- Monospace typography throughout
- Real-time project tracking
- Role-based authentication (admin/client)
- Live updates via Supabase subscriptions

---

## Tech Stack

| Category            | Technology                    |
| ------------------- | ----------------------------- |
| **Framework**       | Next.js 16.1.6 (App Router)   |
| **Language**        | TypeScript                    |
| **Styling**         | Tailwind CSS v4               |
| **Database & Auth** | Supabase (PostgreSQL)         |
| **Forms**           | Formspree                     |
| **Animations**      | Framer Motion                 |
| **Icons**           | Lucide React                  |
| **Themes**          | next-themes (dark/light mode) |
| **Runtime**         | Node.js                       |

---

## Project Structure

```
systx-core/
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── auth/            # Authentication (login/register)
│   │   ├── contacts/        # Contact page
│   │   ├── dashboard/       # Admin dashboard (protected)
│   │   ├── media/           # Media gallery & cinema booking
│   │   ├── portal/          # Client portal (protected)
│   │   ├── services/        # Services listing & booking
│   │   ├── tools/           # Utility tools (jokes, converter, meme gen)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page (home)
│   │   └── providers.tsx    # Theme providers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx   # Site footer
│   │   │   └── Navbar.tsx  # Navigation bar
│   │   └── ui/
│   │       ├── AuthInput.tsx      # Authentication input component
│   │       ├── ContactForm.tsx    # Shared contact form
│   │       ├── Particles.tsx      # Particle background animation
│   │       ├── ServiceCard.tsx    # Service display card
│   │       ├── SystxLogo.tsx      # Company logo
│   │       └── TypingEffect.tsx   # Typing animation
│   ├── lib/
│   │   ├── auth-actions.ts  # Authentication helper functions
│   │   └── superbase.ts     # Supabase client configuration
│   └── middleware.ts        # Route protection middleware
├── package.json
├── tailwind.conf.ts         # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── postcss.config.mjs      # PostCSS configuration
```

---

## Features

### Public Pages

1. **Landing Page** (`/`)
   - Hero section with particle animation
   - Services overview (Software Dev, Cloud Infra, Cyber Sec, Digital SaaS)
   - Tech stack showcase
   - Client experience section
   - Contact/onboarding form

2. **Services** (`/services`)
   - Service categories with icons
   - Service booking modal with date/time selection
   - Form submission to Supabase `bookings` table

3. **Tools** (`/tools`)
   - **Joke Decrypter**: Random jokes from Supabase database
   - **Ultra Converter**: Image format conversion (WebP, PNG, JPEG)
   - **HUD Meme Generator**: Military-style HUD overlay on images

4. **About** (`/about`)
   - Company vision and mission
   - Core values (Precision, Performance, Collaboration, Expertise)
   - Operational timeline/milestones

5. **Contacts** (`/contacts`)
   - Contact information display
   - Contact form (Formspree integration)
   - Social media links

6. **Media** (`/media`)
   - Visual gallery with hover effects
   - Cinema Plus+ premium booking section

### Authentication Pages

7. **Auth** (`/auth`)
   - Login form with email/password
   - Registration with display name
   - Password strength indicator
   - Role-based redirection (admin → dashboard, client → portal)

### Protected Pages (Requires Authentication)

8. **Dashboard** (`/dashboard`) - _Admin Only_
   - Lead management (view/delete inquiries)
   - Booking management with progress tracking
   - Manual progress override
   - Milestone management
   - Real-time updates via Supabase subscriptions
   - Statistics: total leads, bookings, DB stability, uptime

9. **Portal** (`/portal`) - _Clients_
   - View active booking/project status
   - Real-time progress tracking
   - Milestone timeline display
   - Live sync notifications

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd systx-core
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to [[text](https://systx-infra.vercel.app/)](<[text](https://systx-infra.vercel.app/)>)

---

## Environment Variables

| Variable                        | Description                        | Required |
| ------------------------------- | ---------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL               | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key             | ✅       |
| `NEXT_PUBLIC_FORMSPREE_ID`      | Formspree form ID for contact form | ✅       |

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API**
3. Copy the **Project URL** and **anon public** key

---

## Database Schema

The application uses the following Supabase tables:

### `profiles` (Managed via Supabase Auth Triggers)

| Column         | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `id`           | uuid      | User ID (primary key, references auth.users) |
| `email`        | text      | User email                                   |
| `display_name` | text      | User's display name                          |
| `role`         | text      | User role ('admin' or 'client')              |
| `created_at`   | timestamp | Creation timestamp                           |

### `leads`

| Column       | Type      | Description        |
| ------------ | --------- | ------------------ |
| `id`         | uuid      | Primary key        |
| `full_name`  | text      | Lead's full name   |
| `email`      | text      | Lead's email       |
| `message`    | text      | Inquiry message    |
| `created_at` | timestamp | Creation timestamp |

### `bookings`

| Column           | Type      | Description              |
| ---------------- | --------- | ------------------------ |
| `id`             | uuid      | Primary key              |
| `user_id`        | uuid      | Foreign key to profiles  |
| `service_type`   | text      | Type of service booked   |
| `preferred_date` | date      | Preferred booking date   |
| `preferred_time` | time      | Preferred booking time   |
| `full_name`      | text      | Client name              |
| `email`          | text      | Client email             |
| `phone`          | text      | Client phone             |
| `progress`       | numeric   | Project progress (0-100) |
| `created_at`     | timestamp | Creation timestamp       |

### `milestones`

| Column         | Type      | Description             |
| -------------- | --------- | ----------------------- |
| `id`           | uuid      | Primary key             |
| `booking_id`   | uuid      | Foreign key to bookings |
| `title`        | text      | Milestone title         |
| `description`  | text      | Milestone description   |
| `order_index`  | integer   | Display order           |
| `is_completed` | boolean   | Completion status       |
| `created_at`   | timestamp | Creation timestamp      |

### `jokes` (For Tools Page)

| Column     | Type | Description   |
| ---------- | ---- | ------------- |
| `id`       | uuid | Primary key   |
| `question` | text | Joke question |
| `answer`   | text | Joke answer   |
| `field`    | text | Joke category |

---

## Database Setup SQL

Run this in your Supabase SQL Editor to set up the tables:

````sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role TEXT DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  service_type TEXT,
  preferred_date DATE,
  preferred_time TIME,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  progress NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create milestones table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jokes table
CREATE TABLE jokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT,
  answer TEXT,
  field TEXT DEFAULT 'GENERAL'
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE jokes ENABLE ROW LEVEL SECURITY;




---

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Build command
npm run build

# Output directory
.next
````

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## License

All Rights Reserved © 2025-2026 SYSTX Creations

---

## Credits

- **Framework**: [Next.js](https://nextjs.org)
- **Database**: [Supabase](https://supabase.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [Formspree](https://formspree.io)

---

## Support

For questions or inquiries:

- **Email**: info@systx.co.ke
- **Location**: Meru, Kenya
- **WhatsApp**: +254 716 700 151

---

<div align="center">

**BUILT WITH PRECISION // DEPLOYED WITH PRIDE**

_SYSTX // DIGITAL_INFRASTRUCTURE_

</div>
