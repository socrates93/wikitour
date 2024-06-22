> **This README assumes that you already have Docker and NodeJS installed on your computer**.

# Project Overview

## Description

This project aims to create a gallery of articles using the Wikipedia API. It allows users to filter articles by date and language. The frontend is built with React using ViteJS for project construction. The backend is developed with NestJS, and it integrates with LibreTranslate for translation services. All components are containerized and orchestrated using Docker and Docker Compose.

## Dependencies

### Frontend

- **Framework:** React
- **Build Tool:** ViteJS
- **Dependencies:**
  - react
  - react-dom
  - @capacitor/android
  - @capacitor/core
  - @capacitor/ios
  - tailwindcss
  - prettier
  - ESLint plugins

### Backend

- **Framework:** NestJS
- **ORM/Database:** Prisma with @prisma/client
- **External Service Integration:**
  - Wikipedia API
  - LibreTranslate
  - Axios for HTTP requests
- **Dependencies:**
  - @nestjs
  - prisma
  - @prisma/client
  - axios
  - ESLint
  - Prettier

### Common

- **Language:** TypeScript is used in both frontend and backend for type safety and modern JavaScript features.

## Deployment

- The entire application is containerized using Docker.
- Docker Compose is used for managing multiple containers (frontend, backend, services).

# Setup

For both projects to be built successfully via docker-compose it is necessary to create an `.env` file in the **frontend** and **backend** folders, taking as a reference the `.env.template` file found in each folder.

# Running Instructions

### Web

- At the root level of the project, run `docker-compose up --build` command. This will build and serve the projects in **dev mode only**.

### Mobile with capacitor

To run this project with capacitor, you must build both projects separately following the README.MD of each one.

### Note:

This process may take a few minutes because both backend and fronted projects will be built, along with the translation service, which will download the translation files needed for proper operation. You can use the frontend while these resources are being downloaded, keeping in mind that the translation will not work properly until this process is finished.

Once built, you can access the project via this link http://localhost:5173/.
Also, you can hit the backend directly via this link http://localhost:3000/.

# ¿Why those dependencies were chosen?

- **TailwindCSS**: It's incredibly useful for designing web applications and is very popular nowadays. It helps a lot on creating visually appealing interfaces.
- **Prettier**: This helps a lot in the development process, since it helps to standarize our codebase with specified rules for the whole project.
- **Eslint**: Like Prettier, this is super helpful to catch type errors and to help us to implement our functionalities in the right way.
- **Prisma**: A great ORM that greatly facilitates the way we communicate with a database from the backend.
- **Axios**: Used for the backend to communicate with external services via HTTP calls.

# Resources

- [Wikipedia API](https://api.wikimedia.org/wiki/Feed_API/Reference/Featured_content)
- [Libre Translate](https://libretranslate.com/docs/)
- [CapacitorJS](https://capacitorjs.com/)
