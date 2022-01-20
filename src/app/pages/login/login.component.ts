import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  
  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  iniciarSesion() {
    console.log(this.email + '->' + this.password);
    const user: User = new User();
    user.email = this.email;
    user.password = this.password;

    this.http.post('https://www.e-eventos.com/dymabogados/backend/login_admin.php', user).subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {
        this.router.navigate(['inicio']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
          text: 'Por favor inténtalo nuevamente',

        });
      }

      // tslint:disable-next-line:no-string-literal
      // this.items = data;

    });
  }
}
