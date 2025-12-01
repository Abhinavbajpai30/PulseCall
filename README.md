# ⚡ PulseCall

> **Connect Instantly. Communicate Seamlessly.**

![PulseCall Banner](https://via.placeholder.com/1200x400?text=PulseCall+Video+Platform)

**PulseCall** is a state-of-the-art video conferencing and real-time messaging platform designed for seamless communication. Built with the MERN stack and powered by **Stream IO**, it delivers high-quality video calls and instant messaging in a sleek, modern interface.

---

## 🚀 Features

*   **🎥 HD Video Calling**: Crystal clear video calls with low latency using Stream's global edge network.
*   **💬 Real-time Messaging**: Instant chat with typing indicators, read receipts, and rich media support.
*   **🔐 Secure Authentication**: Robust user authentication system using JWT and secure password hashing.
*   **🎨 Modern UI/UX**: A beautiful, dark-themed interface built with React and Tailwind CSS for a premium user experience.
*   **🔔 Smart Notifications**: Real-time alerts for incoming calls and messages.
*   **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
*   **👥 User Presence**: See who's online and available to chat instantly.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Framework**: [React](https://reactjs.org/) (Vite)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: React Context API
*   **Real-time Communication**: [GetStream.io](https://getstream.io/) (Chat & Video)
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios

### **Backend**
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication**: JSON Web Tokens (JWT) & Bcrypt

---

## 🏁 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites
*   Node.js (v16+)
*   npm or yarn
*   MongoDB Atlas Account (or local instance)
*   Stream IO Account (API Key & Secret)

### 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/pulsecall.git
    cd pulsecall
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

### 🔑 Environment Configuration

Create `.env` files in both `backend` and `frontend` directories.

**Backend (`backend/.env`)**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🏃‍♂️ Running the Application

1.  **Start the Backend Server**
    ```bash
    cd backend
    npm start
    ```
    *Server runs on http://localhost:5000*

2.  **Start the Frontend Development Server**
    ```bash
    cd frontend
    npm run dev
    ```
    *App runs on http://localhost:5173*

---

## 📂 Project Structure

```
PulseCall/
├── backend/                 # Node.js/Express Server
│   ├── controllers/         # Route Logic
│   ├── models/              # Mongoose Models
│   ├── routes/              # API Endpoints
│   └── server.js            # Entry Point
│
└── frontend/                # React Application
    ├── src/
    │   ├── components/      # Reusable UI Components
    │   ├── context/         # Global State (Auth, Stream)
    │   ├── pages/           # Application Views
    │   └── services/        # API Integration
    └── vite.config.js       # Vite Configuration
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/abhinavbajpai30">Abhinav Bajpai</a>
</p>
