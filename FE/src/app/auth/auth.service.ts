import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  async getOrCreateUser(): Promise<User> {
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    }
    const result = await signInAnonymously(this.auth);
    return result.user;
  }
}
