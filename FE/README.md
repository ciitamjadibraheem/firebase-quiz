# Firebase Quiz Application

A simple quiz application built with Angular and Firebase. This application allows users to:
- Answer a quiz question about Firebase
- Submit their name along with their answer
- Accept terms and conditions
- View their previous submission if they've already completed the quiz

## Project Overview

This project demonstrates the integration of Angular with Firebase services:
- **Firebase Authentication**: Anonymous authentication for tracking user submissions
- **Firestore Database**: Storing quiz submissions with user answers
- **Firebase Hosting**: Deploying the application to Firebase's hosting service

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v8 or later)
- [Angular CLI](https://angular.io/cli) (v17.3.17)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)

## Firebase Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup steps
3. Give your project a name (e.g., "firebase-quiz")
4. Enable Google Analytics if desired
5. Click "Create project"

### 2. Register Your Web App

1. In the Firebase Console, click on your project
2. Click the web icon (</>) to add a web app
3. Register your app with a nickname (e.g., "firebase-quiz-web")
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this for the next step)

### 3. Configure Firebase in the Application

1. Update the Firebase configuration in the environment files:
   - `src/environments/environment.ts` (development)
   - `src/environments/environment.prod.ts` (production)

Example configuration:
```typescript
export const environment = {
  production: false, // or true for environment.prod.ts
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

### 4. Enable Authentication

1. In the Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable the "Anonymous" sign-in method
4. Click "Save"

### 5. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in production mode or test mode (you can change this later)
4. Choose a database location close to your users
5. Click "Enable"

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

For production builds, use:
```bash
ng build --configuration production
```

## Deployment to Firebase Hosting

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project (if not already initialized):
```bash
firebase init
```
   - Select "Hosting"
   - Select your Firebase project
   - Specify "dist/fe/browser" as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys with GitHub: No (or Yes if desired)

4. Deploy to Firebase:
```bash
firebase deploy
```

## Project Structure

The application follows a standard Angular project structure with the following key components:

- **src/app/quiz**: Main quiz component with form and submission logic
- **src/app/auth**: Authentication service for Firebase Auth
- **src/environments**: Environment configuration including Firebase settings
- **firebase.json**: Firebase configuration for hosting and deployment

## Authentication Service

The application uses Firebase Authentication with anonymous sign-in. The `AuthService` provides:

- Anonymous authentication for users
- User tracking for quiz submissions
- Persistent user sessions

## Further Help

- [Angular Documentation](https://angular.io/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Angular Fire Documentation](https://github.com/angular/angularfire)
