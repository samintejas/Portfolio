---
title: "Setting Up a Next.js Project Manually (with TypeScript)"
description: "A step-by-step guide to Setting Up a Next.js Project Manually with TypeScript."
date: "2025-06-20"
readTime: "8 min read"
featured: true
tags:
  - Next.js
  - Typescript
  - Frontend
author: "Samin Tejas"
---

# Setting Up a Next.js Project Manually (with TypeScript)

This guide walks you through **manually setting up a Next.js project** using TypeScript—**without** using `create-next-app`. This approach gives you full control over your configuration and setup from the ground up.

---

## Step 1: Initialize `package.json`

Start by creating a `package.json` file using:

```bash
npm init -y
```

The `-y` flag accepts default values. Without it, `npm` will prompt you to fill in the project details manually.

Now update `package.json` as follows:

```json
{
  "name": "mmtm",
  "version": "1.0.0",
  "description": "MindMirror Task Manager",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Samin Tejas",
  "license": "ISC",
  "type": "commonjs"
}
```

---

## Step 2: Install Core Dependencies

Install the essential Next.js and React packages:

```bash
npm install next react react-dom
```

- **next** – The core framework providing routing, SSR, static generation, and more.
- **react** – The React library for building UIs.
- **react-dom** – Handles DOM rendering for React.

---

## Step 3: Add TypeScript Support

Install TypeScript and type definitions for React and Node.js:

```bash
npm install --save-dev typescript @types/react @types/node
```

These are dev dependencies as they are only required during development.

---

## Step 4: Update `package.json` Scripts

Update the scripts section to include common Next.js commands:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

Your updated `package.json` should now look like:

```json
{
  "name": "mmtm",
  "version": "1.0.0",
  "description": "MindMirror Task Manager",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "keywords": [],
  "author": "Samin Tejas",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "next": "^15.3.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/node": "^24.0.3",
    "@types/react": "^19.1.8",
    "typescript": "^5.8.3"
  }
}
```

---

## Step 5: Create Configuration Files

### `next.config.js`

```js
/** @type{import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### `next-env.d.ts`

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

---

## Step 6: Create Project Structure

Create necessary directories:

```bash
mkdir app styles public
```

---

## Step 7: Add Global Styles

Create a global stylesheet:

**`styles/global.css`**:

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #f4f4f4;
}
```

---

## Step 8: Build Your First Page

### Layout Component

**`app/layout.tsx`**:

```tsx
import "./global.css";
import { ReactNode } from "react";

export const metadata = {
  title: "mmtm",
  description: "MindMirror Task Manager",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### Home Page

**`app/page.tsx`**:

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Our first page in Next.js with TypeScript</h1>
    </main>
  );
}
```

---

You now have a fully working custom-configured Next.js project with TypeScript—without relying on boilerplate.

Stay tuned for Part 2: _Setting up routing, components, and API routes_.
