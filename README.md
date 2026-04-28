

# 🌍 Impact Connect – AI Powered Emergency Response Platform

A modern **React + TypeScript** application that combines **Google Maps + AI (Gemma)** to visualize emergency requests, track volunteers, and provide intelligent assistance.

---

## 🚀 Overview

Impact Connect is a **smart disaster-response platform** that:

* 📍 Maps real-time emergency requests
* 👥 Tracks volunteer locations
* 🧠 Uses AI (Gemma) for intelligent insights
* 🗺️ Provides a modern Google Maps interface

---

## ✨ Key Features

### 🗺️ Google Maps Integration

* Interactive map using Google Maps API
* Smooth zoom, pan, and navigation
* Marker clustering and hotspot visualization

---

### 🚨 Emergency Request Visualization

* Color-coded urgency levels:
  * 🔴 Critical
  * 🟠 High
  * 🔵 Medium
  * ⚪ Low
* Dynamic circle markers for affected areas

---

### 👥 Volunteer Tracking

* Real-time volunteer location markers
* Availability status (Available / Busy)
* Skill-based filtering (future feature)

---

### 🧠 AI Integration (Gemma)

Powered by  **Google Gemma (via local or API inference)** :

* 📊 Analyze emergency severity
* 💡 Suggest resource allocation
* 🗣️ Chat-based assistance (future-ready)
* 📄 Summarize disaster reports

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React (Vite + TypeScript)
* 🎨 Tailwind CSS
* 🧩 shadcn/ui

### Maps

* 🗺️ Google Maps API (`@react-google-maps/api`)

### AI / ML

* 🤖 Gemma (Google AI model)
* 🧠 Ollama (local inference support)

---

## 📁 Project Structure

```text
impact-connect/
├── public/
│   ├── logo.png
├── src/
│   ├── components/
│   ├── pages/
│   │   └── MapPage.tsx
│   ├── lib/
│   │   └── mockData.ts
│   ├── ai/
│   │   └── gemmaService.ts
│   └── main.tsx
├── .env
├── index.html
├── package.json
└── README.md
```

---

## 🔑 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/impact-connect.git
cd impact-connect
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Google Maps Setup

Get API key from **Google Maps Platform**

Enable:

* Maps JavaScript API

Add to `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

Use in code:

```tsx
<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
```

---

### 4️⃣ Gemma AI Setup (Local)

Install Ollama:

```bash
ollama pull gemma:2b
```

Run model:

```bash
ollama run gemma:2b
```

---

### 5️⃣ Run the Project

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🧠 Example Gemma Integration

```ts
// src/ai/gemmaService.ts
export async function askGemma(prompt: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "gemma:2b",
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
}
```

---

## 🔐 Environment Variables

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 🎯 Future Enhancements

* 🔥 Heatmap visualization
* 🎤 Voice AI (speech-to-text + text-to-speech)
* 📷 Image-based disaster detection
* 📡 Real-time updates (WebSockets / Firebase)
* 🌙 Dark theme maps

---

## ⚠️ Notes

* Do not expose API keys publicly
* Ensure Google Maps billing is enabled
* Use `.env` for secure config

---

## 🤝 Contributing

Pull requests are welcome!
Open an issue for major changes.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Pragadeeshwaran R**
B.E. Information Technology (2027)

---

## ⭐ Acknowledgements

* Google Maps Platform
* Google Gemma AI
* Ollama (Local LLM runtime)
* React Ecosystem

---
