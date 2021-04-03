import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/collections/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = { rememberme: true } as UserModel;
  recordarme = false;
  errMsg = '';

  constructor(
    private authLogin: AuthService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
  loginGmail() {
    this.authLogin
      .GoogleAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/login');
      });
  }
  recoveryPass(mail: string) {
    this.errMsg = '';
    Swal.fire({
      title: 'Inserta tu email',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Recuperar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        let email = resultado.value;

        Swal.fire('Enviando mensaje a ', email, 'info');
        this.authService
          .recoveryPassword(email)
          .then(() => {
            this.errMsg = 'Email enviado a ' + email;
            this.user.email = '';
            this.user.password = '';
            Swal.close();
            Swal.fire('Mensaje Enviado ', email, 'success');
          })
          .catch((error) => {
            // An error happened.
            this.errMsg = 'Email NO enviado!: ' + error.message;
            Swal.close();
            Swal.fire('Mensaje No Enviado ', error.message, 'error');
          })
      }
    });
  }
  loginFace() {
    this.authLogin
      .FacebookAuth()
      .then((val) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.router.navigateByUrl('/login');
      });
  }

  async onLogin(form: NgForm) {
    this.errMsg = '';
    
    if (!form.valid) {
      this.errMsg = 'Tus datos contienen algún error.';
      return;
    }
    
    try {
      await this.authService
        .login(this.user)
        .then((res) => {
          if (res.code) {
            Swal.fire('Error al iniciar sesión', res.message, 'error');
            console.log('error login: ' + res);
          } else {
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          Swal.fire('Error al iniciar sesión', error.message, 'error');
          console.log('error login: ' + error);
        });
    } catch (error) {
      console.log('error login: ' + error);
    }
  }
}

