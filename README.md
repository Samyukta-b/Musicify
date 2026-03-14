# Musicify

## Purpose
Musicify is a web application that allows users to generate custom Spotify playlists using a local AI model. Users provide their Spotify User ID, a theme (e.g., "upbeat pop for a road trip"), and the number of songs desired (1-10). The app leverages a local Ollama model to create a playlist name, description, and curated song list, along with a text-based album art description.

The application then searches Spotify for the recommended songs, creates a new private playlist in the user's account, and embeds it directly in the interface for immediate playback.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (with jQuery for DOM manipulation)
- **Backend/APIs**:
  - Ollama (local LLM for text generation, e.g., Llama 2 or Mistral)
  - Spotify Web API (searching tracks, creating playlists, and embedding)
- **Dependencies**:
  - Express.js (Node.js framework, server-side handling)
  - jpeg-js (JPEG image processing)
  - pica (image resizing and manipulation)

## How to Run
1. Install Ollama from [ollama.ai](https://ollama.ai) and run a model locally (e.g., `ollama run llama2`).
2. Clone the repository.
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open `http://localhost:3000` in a browser.

Note: Ensure Ollama is running on `localhost:11434` and Spotify access token is set up.

## Features
- AI-powered playlist generation based on user themes (using local Ollama model).
- Text-based album art description.
- Direct Spotify integration for playlist creation and embedding.
- Responsive UI with loading indicators and error handling.

## License
© 2024 Musicify. All rights reserved. 