import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected account = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {};

  login() {
    this.account.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Login successful');
        this.creds = {};
      },
      error: (error) => {
        this.toast.error(error.error);
      },
    });
  }
  logout() {
    this.account.logout();
    this.router.navigateByUrl('/');
  }
}
