# 🧠 The Overengineered Procrastination Detector

> An interactive, cybersecurity-inspired productivity dashboard designed to monitor focus sessions, track distractions, analyze productivity, and encourage better time management.

## 📌 Overview

The Overengineered Procrastination Detector is a productivity monitoring web application with a futuristic, terminal-inspired interface.

It combines productivity tracking with a cyber-themed dashboard to help users understand their focus habits, manage distractions, and review their work sessions.

The application features an interactive dashboard, session controls, incident tracking, analytics, privacy settings, and emergency productivity tools.

## ✨ Features

### 📊 1. Interactive Dashboard
- View productivity and focus metrics.
- Monitor focus scores and session duration.
- View incident counts and threat-level indicators.
- Access productivity tools through a sidebar.

### ⏱️ 2. Focus Session Management
- Start and pause focus sessions.
- Track session duration.
- Monitor active session status.
- Manage productivity sessions through interactive controls.

### 🚨 3. Incident and Distraction Tracking
- Record distractions during focus sessions.
- Maintain an incident registry.
- Review distraction-related information.
- Analyze events that interrupt productivity.

### 📈 4. Analytics and Productivity Metrics
- View productivity-related metrics.
- Analyze focus and distraction patterns.
- Review session information to understand productivity habits.

### 🧠 5. Intelligence and Excuse Analysis
- Explore productivity-related intelligence tools.
- Analyze excuses and behaviors associated with procrastination.

### ⚡ 6. Emergency Mode
- Access dedicated emergency productivity controls.
- Use the available tools to support focused work during urgent tasks.

### 🔐 7. Privacy and Settings
- Access privacy-related controls.
- Configure available application settings.
- Manage supported preferences, including sound and reduced-motion options.

### 📝 8. Session Reports
- Review saved session information.
- Access productivity reports.
- Track focus-session activity.

> Note: Available features depend on the current implementation. The application is primarily a frontend demonstration and should not be assumed to provide real cybersecurity monitoring.

## 🛠️ Technology Stack

- **Frontend:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS and Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** npm
- **Version Control:** Git and GitHub

## 📂 Project Structure

```text
overengineered-procrastination-detector/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ActivityTimeline.tsx
│   │   ├── Analytics.tsx
│   │   ├── AnalyticsView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── EmergencyView.tsx
│   │   ├── ExcuseView.tsx
│   │   ├── Header.tsx
│   │   ├── IncidentsView.tsx
│   │   ├── IntelligenceView.tsx
│   │   ├── MetricCards.tsx
│   │   ├── MonitoringView.tsx
│   │   ├── PrivacyView.tsx
│   │   ├── ReportsView.tsx
│   │   ├── SessionControls.tsx
│   │   └── SessionReport.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

*This is an illustrative overview of the project structure. Your local files may contain additional components and configuration files.*

## 🚀 Installation and Setup

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — preferably version 18 or newer.
- npm, which is included with Node.js.
- Git, if you want to clone the repository.

### 1. Clone the Repository

```bash
git clone https://github.com/Sadafansari227/overengineered-procrastination-detector.git
```

### 2. Navigate to the Project Directory

```bash
cd overengineered-procrastination-detector
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal.

For example:

```text
http://localhost:5173/
```

Vite may use a different port if the default port is already occupied.

### 6. Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The generated production files are normally placed in the `dist/` directory.

## 🌐 Deployment

This project can be deployed using static hosting platforms that support Vite applications, such as GitHub Pages, Vercel, or Netlify.

Before deploying:

1. Run `npm run build`.
2. Confirm that the production build completes successfully.
3. Configure the hosting platform for the project.
4. Deploy the generated application.
5. Test the deployed URL.

**Important:** Uploading the source code to GitHub does not automatically make the application publicly accessible as a live website. Deployment must be configured separately.

## 🔒 Security and Privacy

The application uses a cybersecurity-inspired interface, but it is a productivity tool rather than a security scanner.

- Do not enter real passwords, API keys, or confidential information.
- Do not assume that displayed threat levels represent actual security threats.
- Review the application's data-storage behavior before using sensitive information.
- Keep dependencies updated and avoid committing secrets to GitHub.

## 🎯 Project Goals

The project aims to:

- Encourage awareness of personal productivity habits.
- Help users monitor focus sessions and distractions.
- Present productivity information through an interactive dashboard.
- Explore dashboard design using React and TypeScript.
- Demonstrate a futuristic terminal-inspired user interface.

## 🔮 Future Improvements

Potential enhancements include:

- Persistent session history.
- Advanced productivity analytics and visualizations.
- Customizable focus-session durations.
- Daily and weekly productivity reports.
- Notifications and reminders.
- Improved accessibility and mobile responsiveness.
- Optional backend integration for securely storing user data.

These are proposed enhancements and may not be implemented in the current version.

## 👩‍💻 Author

**Sadaf Ansari**

GitHub: [@Sadafansari227](https://github.com/Sadafansari227)

## 📄 License

No license has been specified yet. Unless a license is added to this repository, reuse and redistribution remain subject to applicable copyright law.

---

*Built to explore the intersection of productivity, interactive dashboards, and cyber-inspired design.*