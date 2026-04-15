🏠 Smart Home Energy Management System

A full-stack web application that helps users monitor, control, and optimize energy usage in a smart home environment.
The system provides real-time monitoring, device control, and energy analytics through an interactive dashboard.


---

📌 Features

⚡ Core Features

📊 Energy Overview (daily, weekly, monthly usage)

💰 Estimated electricity bill calculation

🔌 Device control (ON/OFF toggle)

🏠 Room-wise device management

📈 Energy analytics & charts

⚡ Real-time energy monitoring


🔐 Security Features

OTP-based authentication (Email verification)

JWT-based secure login


📊 Dashboard Features

Live power consumption (Watts)

Active devices count

Peak usage time detection



---

🛠️ Tech Stack

Frontend

React.js

HTML, CSS

Tailwind CSS

JavaScript


Backend

Spring Boot

Core Java

REST APIs


Database

H2 Database

Hibernate

Spring Data JPA


Tools & Services

Maven

Git & GitHub

JavaMailSender (SMTP for OTP)



---

📂 Project Structure

smart-home-energy/
│── frontend/        # React frontend
│── backend/         # Spring Boot backend
│── database/        # DB configs
│── README.md


---

⚙️ Requirements

Make sure you have the following installed:

Node.js (v16 or above)

Java JDK (v17 recommended)

Maven

Git

IDE (VS Code / IntelliJ)



---

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/smart-home-energy.git
cd smart-home-energy


---

2️⃣ Backend Setup (Spring Boot)

cd backend
mvn clean install
mvn spring-boot:run

👉 Backend will run on:
http://localhost:8080


---

3️⃣ Frontend Setup (React)

cd frontend
npm install
npm run dev

👉 Frontend will run on:
http://localhost:5173


---

🔐 Environment Configuration

Update the following in backend:

📧 Email (OTP Setup)

spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password


---

📡 API Endpoints (Sample)

Method	Endpoint	Description

GET	/api/devices	Get all devices
POST	/api/devices/toggle/{id}	Toggle device
GET	/api/energy/summary	Energy overview
GET	/api/energy/live	Real-time data
POST	/api/auth/login	User login (OTP)



---

📊 Dashboard Overview

The dashboard provides:

Real-time energy monitoring

Device management panel

Energy analytics with charts

Alerts for high usage



---

🧠 Future Enhancements

AI-based energy prediction

IoT device integration

Mobile app version

Voice assistant support



---

👨‍💻 Team Members

Muskan Bhatt

Hithashree K V

Gargee Badgaiyan



---

🙏 Acknowledgement

Special thanks to Infosys Springboard for providing this internship opportunity and guidance throughout the project.


---

📜 License

This project is for education purpose
