import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;
  loading = false;
  info: any[] = [];
  user: any[] = [];
  postId: any[] = [];
  totalPosts: number;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private alertService: AlertService

    ) { }

  ngOnInit() {
      this.getMyProfile();
      this.postForm = this.formBuilder.group({
        image_url: ['', Validators.required],
        text_image:[''],
        tags_image:['']
      });
  }
  get f() { return this.postForm.controls; }

  getMyProfile() {
    this.usersService.getProfile(this.route.snapshot.params['page'])
    .subscribe(res => {
                        this.info = res.info;
                        this.user = res.user;
                        this.totalPosts = res.totalPosts;
                        console.log(this.info);
                        console.log(this.user);
                        console.log(this.totalPosts);
                      });
  }

   openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
  
  /**modal scroll */
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  resetForm() {
    this.submitted = false;
    this.f.image_url.setValue("");
    return;
  }

  createPhoto() {
      this.submitted = true;
      this.alertService.clear();

      if (this.postForm.invalid) {
        return;
      }
      this.loading = true;
   
    console.log(`Chamando criação ${this.f.image_url}`)
    this.usersService.createPost(this.f.image_url.value, this.f.text_image.value, this.f.tags_image.value)
    .pipe(first())
    .subscribe(
                res => { this.postId = res.postId
                  this.loading = false;
                  alert('Post created!')
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    alert('connection error')
                });
      }
    
  }

  

