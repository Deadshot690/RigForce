# RigForce

## Overview
RigForce is a modern web application for planning, previewing, and optimizing PC builds. It provides a user-friendly interface to select components, check compatibility, estimate performance, and manage your build budget.

## Purpose
The purpose of Build Master Studio is to simplify the process of building custom PCs by offering:
- Real-time compatibility checks
- Performance and budget planning
- 3D previews of your build
- Easy-to-use dashboards and selectors

## Features
- Component selection (CPU, GPU, RAM, Storage, etc.)
- Compatibility engine to prevent mismatched parts
- Budget planner and estimator
- Performance dashboard
- 3D PC preview
- Modern UI with shadcn-ui and Tailwind CSS
- Responsive design for desktop and mobile
- Fast build and hot-reload with Vite

## Tech Stack
- **React** (UI library)
- **TypeScript** (type safety)
- **Vite** (build tool)
- **shadcn-ui** (UI components)
- **Tailwind CSS** (utility-first CSS)
- **Radix UI** (accessible primitives)
- **Three.js** (3D rendering)
- **React Three Fiber** (React renderer for Three.js)
- **Zod** (schema validation)

## Folder Structure
```
build-master-studio-main/
├── public/                # Static assets (logo, robots.txt, etc.)
├── src/
│   ├── components/        # React components (UI, selectors, dashboards, etc.)
│   │   └── ui/            # shadcn-ui based components
│   ├── data/              # PC parts data (CPUs, GPUs, etc.)
│   ├── engines/           # Business logic (compatibility, performance, budget)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page-level components (Index, NotFound)
│   ├── test/              # Tests and setup
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── ...
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS config
├── vite.config.ts         # Vite config
└── ...
```

## Setup
1. **Clone the repository:**
	```sh
	git clone https://github.com/Deadshot690/RigForce.git
	cd build-master-studio-main
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Start the development server:**
	```sh
	npm run dev
	```
4. **Open your browser:**
	Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request describing your changes

For major changes, please open an issue first to discuss what you would like to change.


