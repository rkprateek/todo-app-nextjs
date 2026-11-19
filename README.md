# Taskly — Next.js To-Do List

A simple, responsive task manager built with Next.js App Router and React.

## Features

- Add tasks
- Mark tasks as complete or active
- Delete individual tasks
- Filter all, active, and completed tasks
- View pending/completed counts and progress
- Clear all completed tasks
- Automatically save tasks in browser `localStorage`
- Responsive layout for desktop and mobile

## Requirements

- Node.js 18.18 or newer (Node.js 20 LTS recommended)
- npm

## Run locally

1. Extract the ZIP file.
2. Open the extracted `todo-app` folder in VS Code.
3. Open the terminal in that folder.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

## Production build

```bash
npm run build
npm start
```

## Notes

This is a frontend-only project. Tasks are stored in the browser that you use.
Clearing browser storage or switching browsers/devices will not transfer tasks.
