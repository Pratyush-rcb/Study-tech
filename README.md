# StudyTech — Full-Stack Ed-Tech & Course Marketplace

🔗 **Live Demo:** [https://study-tech-alpha.vercel.app](https://study-tech-alpha.vercel.app)

StudyTech is a full-stack e-learning and course marketplace platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), featuring role-based dashboards, OTP email authentication, cloud media streaming, and integrated Razorpay payment checkout.

---

## 🚀 Key Features

- **Role-Based Authentication & Security**: JWT session management with dedicated workflows for **Students**, **Instructors**, and **Admins**.
- **OTP Email Verification**: Automated account verification powered by time-limited OTPs with MongoDB TTL indexing.
- **Course Discovery & Enrollment**: Browse published courses, preview curriculum sections, and enroll securely with **Razorpay** payment gateway integration.
- **Instructor Dashboard**: Create, structure, and publish multi-section video courses with **Cloudinary** media asset storage.
- **Student Profile & Progress Tracking**: Track enrolled courses, lecture completion progress, and profile details.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, RESTful APIs
- **Database**: MongoDB / Mongoose
- **Authentication & Services**: JSON Web Tokens (JWT), Bcrypt.js, Cloudinary, Razorpay, Nodemailer
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## 📁 Project Structure

    StudyTech/
    ├── src/        # React Frontend (Pages, Components, Redux Slices)
    ├── server/     # Node.js + Express Backend (Models, Controllers, Routes, Middlewares)
    ├── .gitignore
    └── README.md

---

## ⚙️ Local Installation & Setup

1. **Clone the repository**

       git clone https://github.com/Pratyush-rcb/Study-tech.git
       cd Study-tech

2. **Install dependencies**

       npm install

3. **Configure environment variables**
   Create a `.env` file in the root and `server/` directories with your MongoDB URI, JWT secret, Cloudinary credentials, Razorpay keys, and mail credentials.

4. **Run the project**

       npm start

---

## 👤 Author

**Pratyush Krishna**  
- Portfolio: [https://pratyush-portfolio-green.vercel.app](https://pratyush-portfolio-green.vercel.app)  
- GitHub: [https://github.com/Pratyush-rcb](https://github.com/Pratyush-rcb)
