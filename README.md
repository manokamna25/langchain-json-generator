
# 🤖 AI-Powered Structured Output Engine 🚀

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![Express](https://img.shields.io/badge/Express-5.1.0-61DAFB?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![LangChain](https://img.shields.io/badge/LangChain-Enabled-green?style=for-the-badge)

**A professional full-stack boilerplate to get clean, structured JSON data from AI models.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup Guide](#-setup-guide) • [Project Structure](#-project-structure)

</div>

---

## 🌟 Overview
Yeh project ek modern **Full-Stack Application** hai jo AI models (Gemini, Groq, OpenAI) se **Structured JSON Output** lene ke liye design kiya gaya hai. Isme frontend ke liye **Next.js 16** aur backend ke liye **Express + LangChain** ka use hua hai.

### ✨ Features
- 🎯 **Structured AI Responses**: Always get data in the exact JSON format you need using Zod.
- ⚡ **Multi-Model Support**: Easily switch between Google Gemini, Groq, and OpenAI.
- 🎨 **Premium UI**: Crafted with Next.js, Tailwind v4, and Radix UI components.
- 🛠️ **Developer Friendly**: Highly documented codebase with Hinglish explanations.

---

## 🛠️ Tech Stack

| Frontend | Backend |
| :--- | :--- |
| **Next.js 16 (App Router)** | **Express.js (v5)** |
| **Tailwind CSS v4** | **LangChain.js** |
| **Lucide Icons** | **Zod (Schema Validation)** |
| **Radix UI Components** | **TypeScript** |

---

## 🚀 Setup Guide

### 1. Clone & Install
\`\`\`bash
# Install Backend Dependencies
cd backend && npm install

# Install Client Dependencies
cd ../client && npm install
\`\`\`

### 2. Environment Setup (.env)

**Backend (.env):**
\`\`\`env
PORT=5000
GOOGLE_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
\`\`\`

**Client (.env):**
\`\`\`env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
\`\`\`

### 3. Run the App
\`\`\`bash
# Start Backend (Term 1)
cd backend && npm run dev:server

# Start Client (Term 2)
cd client && npm run dev
\`\`\`

---

## 📁 Project Structure

\`\`\`text
├── backend/
│   ├── src/
│   │   ├── ask-core.ts   # Core AI logic
│   │   ├── lc-model.ts   # LangChain model config
│   │   ├── server.ts     # Express server
│   │   └── schema.ts     # Zod schemas for AI output
├── client/
│   ├── src/app/
│   │   ├── page.tsx      # Main frontend UI
│   │   └── api/ask/      # Proxy route to backend
\`\`\`

---

<div align="center">
  <p>Made with ❤️ and TypeScript</p>
  <sub>Happy Coding! 🚀</sub>
</div>

