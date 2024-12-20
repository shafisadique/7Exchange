import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoGeneratePasswordService {

  constructor() { }
  generateRandomPassword(length: number): string {
    const charset = '0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }
}
