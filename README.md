# OpenPrinting Website

The official website for [OpenPrinting](https://openprinting.github.io/), built with Next.js, Tailwind CSS, and Framer Motion.

OpenPrinting is a Linux Foundation workgroup that manages the printing architecture for Linux and UNIX-like operating systems.

## Getting Started

First, make sure you have [Node.js](https://nodejs.org/) installed, and then install the dependencies using your preferred package manager:

```bash
yarn install
# or
npm install
```

Start the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router containing pages and layouts.
- `components/` - Reusable UI components.
- `contents/` - Markdown content representing news, blogs, and documentation.
- `lib/` - Utility functions and shared library code.
- `scripts/` - Build scripts, such as search index generation.
- `public/` - Static files and assets.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find a bug or want to propose an enhancement.

When making UI changes, please follow the existing Tailwind CSS design patterns.

## Deployment

This project is meant to be deployed statically on GitHub Pages. Note that Next.js is configured for static export in this repository.

To build the static export locally:

```bash
yarn build
# or
npm run build
```

This will generate an `out/` directory containing the static HTML/CSS/JS files which are then hosted on GitHub Pages.
