import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User } from '@angular/fire/auth';

/**
 * Authentication Service
 *
 * This service handles user authentication using Firebase Authentication.
 * Currently, it supports anonymous authentication for the quiz application,
 * allowing users to submit quiz responses without creating an account.
 *
 * The service is provided at the root level, making it a singleton
 * available throughout the application.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Constructor for AuthService
   *
   * @param auth - Firebase Auth instance injected by Angular
   */
  constructor(private auth: Auth) {}

  /**
   * Gets the current user or creates a new anonymous user
   *
   * This method checks if there's already an authenticated user.
   * If a user exists, it returns that user.
   * If no user exists, it creates a new anonymous user via Firebase.
   *
   * @returns Promise resolving to a Firebase User object
   */
  async getOrCreateUser(): Promise<User> {
    // Return current user if already authenticated
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    }

    // Otherwise, create a new anonymous user
    const result = await signInAnonymously(this.auth);
    return result.user;
  }
}
