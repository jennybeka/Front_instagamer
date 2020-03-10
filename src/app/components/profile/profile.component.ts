import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
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
  closeResult: string;
  postForm: FormGroup;
  submitted = false;
  loading = false;

  info: any[] = [];
  user: any[] = [];
  postId: any[] = [];
  profileName: string;
  profileGravatar: string;
  profileFollowing: number;
  profileFollowers: number;

  totalPosts: number;
  controlPage: number = 0;
  photoDetails: any[] = [];
  photoTags: any[];
  photoComments: any[];
  commentForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.getMyProfile();
    this.postForm = this.formBuilder.group({
      image_url: ['', Validators.required],
      text_image: [''],
      tags_image: ['']
    });
    // comments
    this.commentForm = this.formBuilder.group({
      comments: ['',]
    });

  }
  get f() { return this.postForm.controls; }
  get c() { return this.commentForm.controls; }


  getMyProfile() {
    this.usersService.getProfile(this.route.snapshot.params['page'])
      .subscribe(res => {
        this.info = res.info;
        this.user = res.user;
        this.totalPosts = res.totalPosts;
        this.profileName = this.user[0]['name'];
        this.profileGravatar = this.user[0]['gravatar_hash'];
        this.profileFollowing = this.user[0]['seguindoCount'];
        this.profileFollowers = this.user[0]['seguidoresCount'];

      });
  }

  loadMorePhotos() {
    this.controlPage++;
    this.usersService.getProfile(this.route.snapshot.params['page'] + this.controlPage)
      .subscribe(res => {
        for (let photo of res.info) {
          this.info.push(photo);
        };

      })
  }

  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  /**modal scroll 1 */
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
  /**modal scroll 2 */
  openModalPhoto(modalPhoto) {
    this.modalService.open(modalPhoto, { scrollable: true });
  }

  resetForm() {
    this.submitted = false;
    this.f.image_url.setValue("");
    this.f.text_image.setValue("");
    this.f.tags_image.setValue("");

    return;
  }

  createPhoto() {
    this.submitted = true;
    this.alertService.clear();

    if (this.postForm.invalid) {
      return;
    }
    this.loading = true;

    this.usersService.createPost(this.f.image_url.value, this.f.text_image.value, this.f.tags_image.value)
      .pipe(first())
      .subscribe(
        res => {
          this.postId = res.postId
          this.loading = false;
          alert('Post created!')
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          alert('connection error')
        });
  }

  deletePhoto(idphoto: number) {
    this.usersService.deleteImage(idphoto)
      .subscribe(
        res => {
          alert("Photo deleted!")
          console.log(res)
        });
  }

  getDetailsPhoto(photoId: number) {
    this.postsService.getPhotoDetails(photoId)
      .subscribe(
        res => {
          this.photoDetails = res.photo
          this.photoTags = res.tags
          this.photoComments = res.comments
        });
  }

  giveLike(photoId: number) {
    this.postsService.like(photoId)
      .subscribe(
        res => {
          console.log("Retorno LIKE BD")
          console.log(res)
        });
  }

  removeLike(photoId: number) {

    this.postsService.dislike(photoId)
      .subscribe(
        res => {
          console.log("Retorno DISLIKE BD")
          console.log(res)
        });
  }

  createComment(photoId: number) {

    this.postsService.createComment(this.c.comments.value, photoId)
      .pipe(first())
      .subscribe(
        res => {
          console.log("Retorno POSTCOMMENT BD")
          this.c.comments.setValue("");
          console.log(res)
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          alert('connection error')
        });
  }

  deleteComment(idComment: number) {
    this.postsService.getDeleteComment(idComment)
      .subscribe(
        res => {
          alert("Comment deleted!")
          console.log(res)
        });
  }

}



