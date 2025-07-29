# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# 🛒 MarketTrack

MarketTrack is a full-featured market monitoring and product listing web application built with React, Firebase, MongoDB, and Express.js. It allows users to explore real-time local market product prices, trends, and vendor-submitted data. Admins and vendors have dedicated dashboards to manage products and advertisements.

## 🌐 Live URL
[👉 Visit MarketTrack Live](https://market-track-project.web.app/)  

---

## 🎯 Project Purpose

The purpose of MarketTrack is to help users track daily market prices for fresh produce and other local goods, understand market trends, and purchase products directly. Vendors can submit updated price entries, and admins oversee and moderate submitted content. This creates a dynamic, transparent ecosystem for buyers, sellers, and market researchers.

---

## 🚀 Key Features

### 🌟 Public Features
- 🔝 **Navbar** with conditional buttons for login/logout/profile/dashboard.
- 🖼️ **Animated Banner** with Framer Motion and a professional image.
- 🛍️ **Product Section**: Shows latest 6 approved products (based on date).
- 📢 **Advertisement Carousel**: Highlights all current vendor ads dynamically.
- 📝 **All Products Page**: Full list with filter & sort (by price/date).
- 🔍 **Product Details Page**: Full breakdown, user reviews, watchlist & order button.
- 📉 **Price Comparison**: Recharts graph for tracking past vs. current prices.
- 📬 **Footer**: Includes logo, contact, terms & social links.

### 🔐 Authentication
- 🔑 JWT-based login using Firebase.
- ⏳ Persistent login via token stored in `localStorage`.

### 📊 Dashboards

#### 🧑‍💼 User Dashboard
- 📈 View price trends (Recharts)
- ⭐ Manage watchlist (Add/Remove)
- 🛒 View past orders (with details)

#### 🧑‍🌾 Vendor Dashboard
- ➕ Add Product (with dynamic pricing entries)
- 📋 My Products (update, delete, view status)
- 📢 Manage Advertisements (create, update, delete)

#### 🛠️ Admin Dashboard
- 👥 Manage Users (search by name/email, update roles)
- ✅ Review Products (approve/reject with reason, update/delete)
- 📢 Review Advertisements (approve/delete)
- 🧾 View All Orders

### 📈 Data Visualization
- Integrated `Recharts` for price comparisons and trends.

### 📦 Additional Functionalities
- 🔁 Pagination implemented on All Products and All Users page.
- 🔍 Search bar with backend filtering on users table.
- 🚫 Admin rejection modal collects reason & vendors see feedback.
- 🔔 Toast notifications (success/error) across all user actions.

---

## 📦 Used NPM Packages

- `react` & `react-dom` – Core React libraries
- `react-router` – Routing and navigation
- `@tanstack/react-query` – Server state & data fetching
- `axios` – API calls
- `firebase` – Auth (JWT) and Firebase SDK
- `framer-motion` – Smooth UI animations
- `@smastrom/react-rating` – Product reviews & ratings
- `@stripe/react-stripe-js` & `@stripe/stripe-js` – Payment integration
- `react-toastify` – Toast notifications
- `recharts` – Charts and data visualization
- `date-fns` – Date formatting and manipulation
- `react-datepicker` – Date picking component
- `react-hook-form` – Form management and validation
- `sweetalert2` – Confirmation modals
- `react-icons` – Icons
- `react-spinners` – Loading spinner animations
- `swiper` – Carousel for advertisements
- `tailwindcss` & `@tailwindcss/vite` – Styling and utility-first CSS

---

## 📄 Tech Stack Summary
- **Frontend:** React 19, TailwindCSS, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (no Mongoose)
- **Auth:** Firebase JWT, localStorage
- **Payment:** Stripe Integration
- **Charting:** Recharts

---

## 🧠 Tips
- Filter, sorting, and pagination are optimized via backend queries.
- Only approved products are visible to users.
- Role-based routing is enforced across all dashboards.

---

> 💡 Built with ❤️ to empower local market transparency and empower vendors and buyers alike.
