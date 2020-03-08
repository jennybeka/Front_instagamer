import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  page: number = 0;
  commentForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comments: ['', ]
  });
  }

  sendComment(){
    this.submitted = true;
  }

  logout() {
    sessionStorage.removeItem('token');
  }

 
}
