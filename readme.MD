# PulseCall: Realtime Video Chat App


## 1. Problem Statement
During online meetings and remote communication, people often face poor connectivity, complex setup, or lack of integrated chat options. PulseCall aims to provide a simple and reliable platform for realtime video calling and chatting that works directly from the browser without installation.
## 2. System Architecture
Structure:
 Frontend → Backend (API + Signaling) → Database → WebRTC (for video/audio)
Tech Stack:
Frontend: React.js, TailwindCSS, Socket.io, WebRTC


Backend: Node.js, Express.js, Socket.IO, Prisma


Database: MySQL


Authentication: JWT-based login/signup


Hosting: Frontend (Vercel), Backend (Render)


3. Key Features
Category
Features
Authentication
Login, Signup, JWT-based sessions
Routing
Frontend routing using React Router (Home, Login, Dashboard, Room)
Video Calls
1:1 or group calls using WebRTC
Realtime Chat
Text chat during calls using Socket.IO
Screen Sharing
Share screen with participants
Room Management
Create or join private/public rooms
Presence
Show who’s online or in a call
Pagination
Paginate chat messages and room lists for better performance
Searching
Search through chat history or room participants
Sorting
Sort based on meeting date, duration, etc.
Filtering
FIltering on the basis of meeting type, meeting date, etc.

4. API Overview
Endpoint
Method
Description
Access
/api/auth/signup
POST
Register new user
Public
/api/auth/login
POST
Authenticate user
Public
/api/room
POST
Create new video room
Authenticated
/api/room/:id
GET
Fetch room details
Authenticated


/api/room/:id
PUT
Change room details
Authenticated
/api/room/:id
DELETE
Delete room
Authenticated

5. Working Flow
User logs in and creates a room.


A unique room ID is generated and shared with others.


Users join the room via link.


Socket.IO handles signaling, and WebRTC connects peers.


Users can chat, talk, or share screens in realtime.

Outcome: A working realtime web app enabling smooth video calls and chatting with modern technologies like React, Node.js, Socket.IO, and WebRTC.

