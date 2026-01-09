# ⚠️ Note: This  will not be updated further.

# 💌 HappySend v1.5.0

**HappySend** is a modern web application for creating, customizing, and sending digital greetings with a "WOW" factor. The app is designed to give the feeling of opening a real, physical card, complete with a 3D envelope, animations, and confetti.

## ✨ Features

- **Interactive 3D Experience**: An animated 3D envelope that reacts to mouse movements and opens to reveal the card.
- **Full Customization**: Choose between different card types (Friend, Love, Secret Admirer), colors, fonts, borders, and effects (hearts, stars, waves).
- **Ultra-compact Links**: Uses advanced Base64 positional encoding to compress all card content into a single, extremely short URL.
- **Multi-language Support**: Full support for both Norwegian and English (i18n).
- **Dashboard & History**: Overview of received cards and your own sending history (stored locally).
- **About HappySend**: Integrated section in settings with information about the mission, vision, and creator.
- **Responsive Design**: Optimized for a "zero-scroll" experience on all screen sizes.
- **Dark/Light Mode**: Full support for system-selected or manual theme.
- **Timed Opening**: Set a date and time for the card to be opened (e.g., "Don't open until Christmas Eve!").

## 🛠 Technology

- **Framework**: [Next.js 16.1+](https://nextjs.org/) (App Router with stable **Turbopack**)
- **UI Logic**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Hugeicons](https://hugeicons.com/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Type Safety**: [TypeScript 5+](https://www.typescriptlang.org/)
- **PWA (Progressive Web App)**: Allows you to install HappySend as an app on your phone outside the App Store.

## 🚀 Getting Started

### Prerequisites

- Node.js and pnpm (or npm/yarn) installed.

### Installation

1. Clone the project:

   ```bash
   git clone https://github.com/TheFrostBunny/HappySend.git
   cd HappySend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/app`: Next.js routes and pages (`/send`, `/receive`, `/history`, etc.)
- `/components`: Reusable React components.
- `/components/Pages`: Hovedlogikken for de forskjellige seksjonene.
- `/lib/i18n`: Internasjonalisering og oversettelsesfiler.
- `/public`: Statiske filer som logoer og favicon.

---

Laget med ❤️ av David
