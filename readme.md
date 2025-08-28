# Realtime Quiz Platform 🎯

A backend platform for creating and managing **realtime online quizzes** with user authentication, caching, and real-time communication.

## 🚀 Features
- User registration & login with **JWT Authentication** and **bcrypt** password hashing
- **MongoDB** for user management
- **MySQL** for quiz storage and retrieval
- **Redis** caching for performance optimization
- Real-time communication with **WebSocket** and **Long Polling**
- RESTful API design with **Express.js**
- Modular code structure and clean architecture
- Ready for deployment with **Docker & Docker Compose**

---

## 🛠️ Tech Stack
- **Node.js (Express.js)**
- **MongoDB**
- **MySQL**
- **Redis**
- **JWT, bcrypt**
- **WebSocket**
- **Docker & Docker Compose**

---

## ⚡ Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Soorena1090/realtime-quiz.git
cd realtime-quiz
```

### 2️⃣ Configure environment variables
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/realtime-quiz
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=example
MYSQL_DATABASE=quizdb
REDIS_URL=redis://redis:6379
JWT_SECRET=supersecretkey
WS_PORT=8080
```

### 3️⃣ Run with Docker Compose
```bash
docker-compose up --build
```

### 4️⃣ Access services
- Backend API → `http://localhost:5000`
- WebSocket → `ws://localhost:8080`

---

## 📌 API Endpoints (Examples)

### Authentication
- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login & get JWT

### Quiz
- `POST /api/quiz` → Create new quiz
- `GET /api/quiz` → Get all quizzes
- `GET /api/quiz/:id` → Get quiz by ID

### Users
- `GET /api/users` → Get cached list of users (Redis)

---

## 🐳 Deployment with Docker
The project includes a `Dockerfile` and `docker-compose.yml` for running:
- Node.js backend
- MongoDB
- MySQL
- Redis

---

## 🤝 Contribution
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request 🚀

---

## 📜 License
MIT License