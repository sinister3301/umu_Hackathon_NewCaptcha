# 🧠 Passive Bot Detection (No CAPTCHA)

🚀 **Live Demo:** [**http://new-captcha.netlify.app**](http://new-captcha.netlify.app)

🔗 **GitHub Repository:** [https://github.com/sinister3301/umu_Hackathon_NewCaptcha](https://github.com/sinister3301/umu_Hackathon_NewCaptcha)

---

## 🛡️ Overview

**Passive Bot Detection** is an advanced behavioral analysis system that verifies if a user is human — **without using traditional CAPTCHAs**.  
Instead of solving puzzles, the app observes real-time interactions such as **mouse movements**, **click patterns**, **scrolling**, and **keystrokes** to calculate a **Trust Score** that represents how “human” the user’s behavior appears.

This project was developed for the **UMU Hackathon** as an innovative solution for CAPTCHA-free authentication.

---

## 🎯 Key Features

- ✅ **No CAPTCHA Required** – Passive verification through behavioral analysis  
- 🖱️ Tracks mouse speed, movement variance, and activity level  
- ⌨️ Monitors keystroke patterns and timing  
- 📜 Analyzes scrolling and touch gestures  
- 🕒 Measures time spent on the page  
- 📊 Calculates a real-time **Trust Score** (0–100%)  
- 💡 Clean, modern, and responsive UI using **React + Tailwind CSS**

---

## 🧩 Tech Stack

| Technology | Description |
|-------------|--------------|
| ⚛️ **React.js** | Frontend framework |
| 🎨 **Tailwind CSS** | Styling and design system |
| 🧰 **Lucide React** | Icon library for modern UI |
| 🌐 **Netlify** | Hosting platform for live deployment |

---

## 🧠 How It Works

1. The system begins **tracking user behavior** (mouse, keyboard, scroll, touch) the moment the page loads.  
2. Each behavioral metric (e.g., mouse speed, keystroke frequency, time on page) contributes to a **weighted trust score**.  
3. After ~5 seconds of observation, the algorithm decides whether the user is **human** or **bot-like**.  
4. The user can then submit the form only if identified as **human**.  

---

## 🧾 Example Metrics

| Metric | Description |
|--------|-------------|
| 🖱️ Mouse Movements | Tracks X/Y coordinates and speed variance |
| 🖲️ Click Patterns | Measures interval variance between clicks |
| ⌨️ Keystrokes | Counts and times key presses |
| 📜 Scroll Behavior | Detects natural scrolling activity |
| 📱 Touch Events | Detects human touch interactions |
| 🕒 Time on Page | Measures total engagement duration |

---

## ⚙️ Installation & Setup


### 1️⃣ Clone the Repository
git clone https://github.com/sinister3301/umu_Hackathon_NewCaptcha.git
cd umu_Hackathon_NewCaptcha  ```bash

### 2️⃣ Install Dependencies
git clone https://github.com/sinister3301/umu_Hackathon_NewCaptcha.git
cd umu_Hackathon_NewCaptcha

### 3️⃣ Run the App Locally

git clone https://github.com/sinister3301/umu_Hackathon_NewCaptcha.git
cd umu_Hackathon_NewCaptcha

### 4️⃣ Build for Production

git clone https://github.com/sinister3301/umu_Hackathon_NewCaptcha.git
cd umu_Hackathon_NewCaptcha


📂 Project Structure
umu_Hackathon_NewCaptcha/
├── build/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.js
│   └── styles/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


🧩 Form Workflow

The user enters:

Aadhaar Number

Full Name

Mobile Number

While typing and interacting, the system silently monitors and updates the trust score.

Once verified as human, the Submit Request button activates.

If detected as a bot, a message alerts:

“Bot detected. Please try again with natural interaction.”

📊 Trust Score Interpretation
Score Range	Status	Meaning
70–100%	🟢 Human Verified	Natural behavior detected
40–69%	🟡 Uncertain	Low interaction or inconsistent behavior
0–39%	🔴 Suspicious	Possible automated behavior


🔒 Disclaimer

This project is created for demonstration and research purposes only.
It is not affiliated with UIDAI or any government organization.
The "UIDAI Passive Bot Detection" name is used for conceptual illustration only.


For Any Query :- 
mfislam3301@gmail.com



