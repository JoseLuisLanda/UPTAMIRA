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
  roles = [
    {id: 1, name: "Visitante/Aspirante"},
    {id: 2, name: "Administrativo"},
    {id: 3, name: "Ingenieria"},
    {id: 4, name: "Licenciatura"},
    {id: 5, name: "Maestría"}
  ];
  constructor(
    private authLogin: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user.title = "Visitante/Aspirante";
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }
    //console.log("forma: "+JSON.stringify(form.value));
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