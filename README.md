# Station445 | Cosmic Relay

> *"Static Speaks: Decoding the Background..."*

Station445 is an ultra-minimalist, cosmic horror/sci-fi blog platform broadcasting signals from the void. It serves as a digital archive for intercepted transmissions, visual logs, and auditory hallucinations from deep space.

![Station445 Header](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop)

## 📡 Transmission Status

- **Status:** ONLINE
- **Protocol:** SECURE
- **Frequency:** 445.00 MHz
- **Location:** Sector 7G (Unknown Coordinates)

## 🌌 Overview

Station445 is built with modern web technologies to deliver a high-performance, immersive experience. The design philosophy focuses on "The Void" - utilizing deep blacks, subtle animations, and specific typography to evoke a sense of isolation and mystery.

### Key Features

*   **Immersive "Void" UI**: calculated use of black space, mono-spaced typography, and subtle CRT/scanline effects.
*   **Dynamic Status System**: The station reacts to different states (ONLINE, OFFLINE, SILENT, CRITICAL), changing the visual atmosphere of the entire site.
*   **Starfield Background**: A performant, canvas-based animated background giving depth to the void.
*   **Content Modules**:
    *   **Transmissions**: Long-form blog posts (interfaced with Ghost CMS).
    *   **Echo Signals**: Audio log archives.
    *   **Visual Logs**: Protected terminal for classified imagery.
    *   **Must See Moments**: Curated visual anomalies.
*   **Secure Access**: Certain areas (Admin, Visual Logs) are protected by simulation-authentic security layers.

## 🛠️ Tech Stack

*   **Core**: React 19, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS (v3.4), Custom CSS Variables
*   **Icons**: Lucide React
*   **Routing**: React Router DOM (HashRouter)
*   **State Management**: React Hooks (Context/Local State)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the frequency:
    ```bash
    git clone https://github.com/alexgabe-dev/station455.git
    cd station445
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Initialize the uplink (Run Development Server):
    ```bash
    npm run dev
    ```

4.  Build for deployment:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
📦 station445
├── 📂 components        # UI Components (Header, Footer, Starfield, etc.)
├── 📂 pages             # Route Components (Home, Transmissions, etc.)
├── 📂 services          # Data fetching (Ghost CMS, LocalStorage)
├── 📄 App.tsx           # Main Application Layout & Routing
├── 📄 index.css         # Global Styles & Tailwind Directives
├── 📄 index.tsx         # Entry Point
├── 📄 tailwind.config.js # Styling Configuration
└── 📄 vite.config.ts    # Build Configuration
```

## 🎨 Theme & Design System

The project uses a custom Tailwind configuration to define the "Void" palette:

- **Colors**:
    - `bg-void` (#050505): Main background.
    - `text-signal` (#e0e0e0): Primary text.
    - `text-alert` (#ff4500): Critical warnings/accents.
- **Typography**:
    - `font-inter`: General readability.
    - `font-mono`: "Space Mono" for headers, data, and terminal text.

## 🤝 Contributing

Transmissions from other sectors are welcome. Please open a channel (Pull Request) for review.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/new-signal`).
3.  Commit your changes (`git commit -m 'Add new signal type'`).
4.  Push to the branch (`git push origin feature/new-signal`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*End of Transmission // Station445*
