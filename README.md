# Ziva: Event Management System (Frontend)

This is the **frontend client** for the **Ziva Event Management System**, a web application that allows users to explore, create, and manage events. The frontend communicates with a backend API to provide features like user authentication, event creation, and registration management.

The project is built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, following a feature-based architecture for maintainability and scalability.

---

## ✨ Key Features

- **User Authentication**: Secure registration and login using email/password.
- **Event Dashboard**: View a list of upcoming events with details such as date, location, and available spots.
- **Event Creation & Management**: Authenticated users can create, update, and delete their own events.
- **One-Click Registration**: Users can register for an event or cancel existing registrations easily.
- **Personalized Registration Hub**: Dedicated page to view and manage all registrations of the logged-in user.
- **Capacity Management**: Displays available spots and prevents registrations for full events.
- **Protected Routes**: Only authenticated users can access certain pages and perform specific actions.
- **Form Validation & Error Handling**: Prevents invalid data submissions and handles API errors gracefully.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **API Requests**: Native `fetch` API (or can switch to Axios)  
- **State Management**: React Context + Custom Hooks (`useAuth`, `useEvents`)  
- **Form Validation**: Client-side validation before submitting to backend  
- **Linting & Formatting**: ESLint + Prettier for consistent code style  

---

## 🏗️ Architecture & Design Decisions

- **Feature-Based Organization**: Components, hooks, and pages are grouped by feature (`auth`, `events`, `registrations`) instead of type, which improves maintainability.  
- **Next.js App Router**: Leverages nested layouts, route groups, and server components for faster loading and clean organization.  
- **Custom Hooks for State**: `useAuth` manages authentication state, while `useEvents` handles event data fetching and manipulation.  
- **Centralized API Layer**: All backend interactions are handled in `lib/api.ts` for consistent API calls and token management.  
- **Type Safety with TypeScript**: All components, hooks, and API responses are strongly typed to reduce runtime errors.  

---

## 📂 Project Structure

```

ziva-frontend/
├── app/
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/                   # Main app pages
│   │   ├── events/page.tsx
│   │   └── registrations/page.tsx
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home/Landing page
├── components/
│   ├── auth/                     # Login/Register components
│   ├── events/                   # EventCard, EventForm components
│   └── ui/                       # Generic UI components: Button, Input, Navbar
├── hooks/
│   ├── useAuth.tsx               # Authentication logic & state
│   └── useEvents.tsx             # Event fetching and management logic
├── lib/
│   ├── api.ts                    # Centralized API requests
│   └── utils.ts                  # Helper functions
├── types/
│   └── types.ts                  # TypeScript types for entities
├── .env.local                     # Environment variables
├── package.json
└── tsconfig.json

````

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher  
- **pnpm** (recommended) or `npm`/`yarn`  

### Installation & Setup

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/ziva-frontend.git
cd ziva-frontend
````

2. **Install dependencies**

```bash
pnpm install
```

3. **Create `.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Ensure your backend server is running at this URL.

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Pages Overview

| Page          | Route            | Description                                                     |
| ------------- | ---------------- | --------------------------------------------------------------- |
| Login         | `/login`         | User login form                                                 |
| Register      | `/register`      | New user registration form                                      |
| Events        | `/events`        | Lists all events; allows registration                           |
| Create Event  | `/events/create` | Form to create a new event (authenticated users only)           |
| Registrations | `/registrations` | Displays events the user is registered for; allows cancellation |
| Home          | `/`              | Landing page / overview                                         |

---

## 🔗 API Integration

* Base URL: `NEXT_PUBLIC_API_URL` (from `.env.local`)
* All requests are made via `fetch` wrapped in `lib/api.ts`
* Authentication is handled via JWT stored in cookies

Example request in `lib/api.ts`:

```ts
export async function fetchEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}
```

---

## 📝 Notes & Recommendations

* Form validation is implemented on the client side for better UX.
* Protected routes redirect unauthenticated users to `/login`.
* Can be extended with UI libraries like **ShadCN**, **Radix**, or **Material UI** for a more polished look.
* Ready for deployment on **Vercel** or any static hosting provider.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please fork the repository and create a pull request with your improvements.

---

## 🧩 Future Enhancements

* Add search, filter, and sorting for events.
* Add pagination for large event lists.
* Implement notifications for successful registrations.
* Improve accessibility and responsiveness across devices.

---

