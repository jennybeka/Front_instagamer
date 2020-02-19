import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(formData) {
    this.auth.login(formData.email, formData.password).subscribe(res => {
      sessionStorage.setItem('token', res.token);
       this.router.navigate(['instagamer/login']);
    });
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
