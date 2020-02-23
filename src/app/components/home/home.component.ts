import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  page: number = 0;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
  }

 
}
