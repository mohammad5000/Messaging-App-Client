import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected account = inject(AccountService);
  protected creds: any = {};
  protected isLoggedIn = signal(false);

  login() {
    this.account.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.isLoggedIn.set(true);
        this.creds = {}; // Clear credentials after successful login
      },
      error: (error) => alert('Login failed' + error.message),
    });
  }
  logout() {
    this.account.logout();
  }
}
