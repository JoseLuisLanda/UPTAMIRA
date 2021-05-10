import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementId } from 'src/app/core/collections/element';
import { UserModel } from 'src/app/core/collections/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: ElementId = {} as ElementId;
  recordarme = false;
  ruta = 'usuario';
  passwordConfirm = '';
  constructor(
    private authLogin: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }
    try {
      if (this.user.password !== this.passwordConfirm) {
        return;
      }
      const user = await this.authLogin.newUser(this.user);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: UserModel): void {
    if (!user.emailVerified) {
      this.router.navigate(['/verification']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loginFace(): void {
    this.authLogin
      .FacebookAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/login');
      });
  }

  loginGmail(): void {
    this.authLogin
      .GoogleAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/login');
      });
  }
}