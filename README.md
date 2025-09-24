# React Vite App

This folder contains a Vite + React (JSX) conversion of the original `index.html` page. It focuses on rendering the same layout and content and provides components that can be extended further.

How to run (Windows PowerShell):

```powershell
cd react-vite-app
npm install
npm run dev
```

Notes:
- Large inline scripts from the original site are not fully ported; key static content and styles were moved into React components and `global.css`.
- If you want the original interactivity (search suggestions, chat backend, typed animations, etc.), I can port those into React hooks and components in a follow-up.
