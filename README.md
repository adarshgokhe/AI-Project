# AI Project Backend

A Node.js backend server handling the core logic for the AI chat application.

## Overview
This project serves as the fast backend infrastructure, utilizing Express and Node.js to securely manage API routes, handle OpenAI integration, and serve the frontend web interface.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Copy `.env.example` to `.env` (or configure the provided `.env` file) and add your `OPENAI_API_KEY`.
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```
3. **Start the Server**:
   ```bash
   node server.js
   ```
   The server will start on port `3000`.

## Features
- Fast asynchronous chat routing.
- Securely stores OpenAI keys in backend logic.
- Built-in timeout and error handling.
