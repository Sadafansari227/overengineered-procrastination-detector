# The Overengineered Procrastination Detector

> A cyberpunk-inspired, local-first productivity dashboard that turns
> focus sessions and distraction tracking into a command-center
> experience.

The **Overengineered Procrastination Detector** is a React + TypeScript
web application designed to help users run focus sessions, track
distractions, review productivity metrics, and explore session activity
through a dark, terminal-inspired interface.

It combines a playful "behavioural threat analysis" theme with practical
focus-session tools. The interface is intentionally styled like a local
system console, with neon-green accents, status indicators, telemetry
panels, and a multi-section sidebar.

## Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Application Sections](#application-sections)
-   [Technology Stack](#technology-stack)
-   [Getting Started](#getting-started)
-   [Available Scripts](#available-scripts)
-   [How to Use](#how-to-use)
-   [Privacy and Limitations](#privacy-and-limitations)
-   [Build and Deployment](#build-and-deployment)
-   [Project Structure](#project-structure)
-   [Troubleshooting](#troubleshooting)
-   [Future Improvements](#future-improvements)
-   [Contributing](#contributing)
-   [License](#license)

## Overview

Procrastination can be difficult to notice while it is happening. This
project presents focus activity and distraction records in a dashboard
that makes a work session feel like a mission-control operation.

The application includes a dashboard, session controls, live-monitoring
views, incident/distraction records, analytics, reports, settings,
privacy controls, and an emergency-mode section. It is intended as a
productivity aid and demonstration project---not as a real surveillance
or security-monitoring tool.

**Repository:**
`https://github.com/Sadafansari227/overengineered-procrastination-detector`

## Features

-   **Focus-session timer** --- start, pause, and manage a focus session
    from the dashboard.
-   **Productivity dashboard** --- view focus-related metrics, session
    time, incident counts, and a themed threat-level indicator.
-   **Distraction and incident tracking** --- review recorded events in
    the incident registry.
-   **Live-monitoring interface** --- view session-related activity and
    productivity telemetry.
-   **Analytics and reports** --- explore productivity metrics and
    session summaries.
-   **Session history** --- review saved session information where
    supported by the current app state.
-   **Settings and preferences** --- access controls such as sound
    effects, reduced motion, notifications, and privacy mode where
    implemented.
-   **Emergency mode** --- a dedicated interface for emergency-mode
    controls.
-   **Privacy-conscious presentation** --- the interface indicates that
    monitoring is limited to observable application events and does not
    perform external browser or operating-system surveillance.
-   **Responsive, terminal-inspired UI** --- dark panels, neon accents,
    status labels, icons, and a command-center layout.

> **Note:** The exact behaviour of individual sections depends on the
> current implementation. The app should not be described as using AI,
> machine-learning predictions, or operating-system surveillance unless
> those capabilities are actually implemented and verified.

## Application Sections

The sidebar is organised into these main areas:

  -----------------------------------------------------------------------
  Section                             Purpose
  ----------------------------------- -----------------------------------
  **Dashboard** (`/dashboard.sh`)     Overview of productivity metrics
                                      and quick actions.

  **Live Monitor**                    Session activity and monitoring
  (`/live-monitor.sh`)                interface.

  **Incident Registry**               Review distraction or incident
                                      records.

  **Intelligence**                    Productivity insights and related
                                      interface.

  **Excuse Analyser**                 Explore the excuse-analysis
                                      interface.

  **Analytics**                       Review productivity metrics and
                                      trends.

  **Session Reports**                 View session summaries and reports.

  **Emergency Mode**                  Access the emergency-mode
                                      interface.

  **Privacy & Security**              Review privacy-related controls and
                                      information.

  **System Configuration**            Access application preferences and
                                      configuration.
  -----------------------------------------------------------------------

Some menu labels use terminal-style names for visual effect. They are
application sections, not actual shell commands.

## Technology Stack

The project is built with a modern frontend toolchain:

-   **React** --- component-based user interface.
-   **TypeScript** --- typed application code.
-   **Vite** --- development server and production bundler.
-   **Lucide React** --- interface icons.
-   **CSS** --- styling and visual effects.

The repository's `package.json` is the source of truth for the installed
versions and available scripts.

## Getting Started

### Prerequisites

Install the following before running the project:

-   [Node.js](https://nodejs.org/) (use a current LTS release)
-   npm (included with Node.js)
-   Git (optional, if cloning the repository)

### 1. Clone the repository

``` bash
git clone https://github.com/Sadafansari227/overengineered-procrastination-detector.git
cd overengineered-procrastination-detector
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start the development server

``` bash
npm run dev
```

Vite will print a local URL in the terminal, commonly
`http://localhost:5173/`. Open the exact URL shown in your terminal.

If the default port is already occupied, Vite may select another port,
such as `5174` or `5175`.

### 4. Create a production build

``` bash
npm run build
```

The production-ready files are generated in the `dist/` directory.

### 5. Preview the production build locally

``` bash
npm run preview
```

Use the URL printed by Vite to inspect the production build locally.

## Available Scripts

  -----------------------------------------------------------------------
  Command                             Description
  ----------------------------------- -----------------------------------
  `npm run dev`                       Starts the Vite development server.

  `npm run build`                     Runs the TypeScript build step and
                                      creates the production bundle.

  `npm run preview`                   Serves the production build locally
                                      for a final check.

  `npm run lint`                      Runs the project's lint checks, if
                                      configured in `package.json`.
  -----------------------------------------------------------------------

If a command is not present in the project's `package.json`, use the
scripts that are actually defined there.

## How to Use

1.  Start the app with `npm run dev`.
2.  Open the local URL printed in the terminal.
3.  Explore the **Dashboard** to see the current productivity overview.
4.  Start a focus session using the session control button.
5.  Pause or resume the session as needed.
6.  Record or review distractions through the incident-related section,
    if enabled in the current build.
7.  Explore **Live Monitor**, **Analytics**, and **Session Reports** to
    inspect the available activity views.
8.  Open **Settings** to test available preferences, then reload the
    page to check whether settings and session information persist.
9.  Run `npm run build` before submitting or deploying the project.

## Privacy and Limitations

Privacy is an important design consideration for this project.

-   The current interface presents itself as a **local-only**
    application.
-   It does **not** claim to monitor other browser tabs, inspect other
    applications, or surveil the operating system.
-   Any metrics should be understood as values collected or calculated
    by the application itself.
-   Data persistence depends on the implementation. If the app uses
    browser storage, data may remain only in that browser and on that
    device.
-   No cloud synchronisation, user accounts, remote database, or backend
    API should be assumed unless separately implemented and configured.
-   The "threat level" is a themed productivity indicator, not a
    cybersecurity threat assessment or medical diagnosis.

Avoid entering passwords, private information, or sensitive personal
data into the application.

## Build and Deployment

This is a Vite frontend application, so it can be deployed to a static
hosting provider after a successful production build.

1.  Run:

    ``` bash
    npm install
    npm run build
    ```

2.  Confirm that the `dist/` directory is created.

3.  Deploy the **contents of `dist/`** using a static hosting service
    such as GitHub Pages, Netlify, or Vercel.

4.  Configure the host's build settings as appropriate:

    -   **Build command:** `npm run build`
    -   **Output directory:** `dist`

5.  Open the deployed URL and test the dashboard, navigation, session
    controls, and page reload behaviour.

### GitHub Pages note

If deploying to a GitHub Pages project site, confirm the Vite `base`
setting in `vite.config.ts`. For a project repository named
`overengineered-procrastination-detector`, the base path may need to be:

``` ts
export default defineConfig({
  base: '/overengineered-procrastination-detector/',
  // keep the project's existing plugins and other configuration
});
```

Do not replace the entire Vite configuration with this snippet; merge
the `base` option into the existing configuration. If the project is
deployed at a root domain or a host that serves from `/`, the required
base may be different.

After deployment, test direct navigation and page refreshes on nested
routes. Configure SPA fallback or routing behaviour if the chosen host
requires it.

## Project Structure

The project uses a typical Vite + React structure. The exact files may
change as the project evolves.

``` text
overengineered-procrastination-detector/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Imported assets
│   ├── components/         # Reusable UI components and views
│   ├── App.tsx              # Main application component (if present)
│   ├── main.tsx             # Frontend entry point (if present)
│   └── types.ts             # Shared TypeScript types (if present)
├── index.html               # HTML entry point
├── package.json             # Dependencies and npm scripts
├── tsconfig*.json            # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

This is an illustrative structure; filenames may differ in the
repository.

## Troubleshooting

### The browser shows a black or blank screen

1.  Check the terminal where `npm run dev` is running.
2.  Open the browser developer tools (`F12`) and check the **Console**
    tab for errors.
3.  Confirm that the app's entry point imports and renders the main
    React component.
4.  Check for runtime errors in recently edited components.
5.  Stop duplicate development servers if necessary, then run
    `npm run dev` again and open the exact URL it prints.

### Vite says a port is already in use

This usually means another development server is still running. Either
reuse the existing server URL or stop the old server with `Ctrl+C` in
its terminal before starting a new one.

### The build fails

Run:

``` bash
npm install
npm run build
```

Read the **first** TypeScript or build error in the terminal and fix
that error before addressing later errors. Unused imports and variables
can also cause TypeScript build failures when the project uses strict
compiler settings.

### The deployed site looks different from localhost

Check the Vite `base` setting, asset paths, browser console, and the
deployment provider's build logs. Test the built version locally with
`npm run preview` before deploying again.

## Future Improvements

Potential next steps include:

-   Add a clear onboarding flow and a short explanation of how focus
    scoring works.
-   Improve keyboard accessibility, focus states, and screen-reader
    labels.
-   Add configurable focus/break durations.
-   Provide export options for session reports.
-   Add charts with clear definitions for every metric.
-   Add automated tests for timer behaviour, settings, and session
    persistence.
-   Document exactly where session data is stored and how users can
    clear it.
-   Add screenshots or a short demo GIF to the repository.
-   Add a deployment workflow and status badge once continuous
    deployment is configured.

## Contributing

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Make a focused change.
4.  Run `npm run build` and any configured lint or test commands.
5.  Open a pull request describing the change and how it was tested.

## License

No license has been specified here. Until a license file is added to the
repository, do not assume that the project is open source or that others
have permission to reuse, modify, or redistribute its code. Add a
`LICENSE` file if you want to grant those permissions.

------------------------------------------------------------------------

**Built as a productivity-focused frontend project with a cyberpunk
command-center aesthetic.**
