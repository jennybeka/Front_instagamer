import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
 
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  totalPosts: number;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
    
  ) {
  this.route.params.subscribe(res => console.log(res.id));
  this.route.params.subscribe(res => console.log(res.page));
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPublicPosts(this.route.snapshot.params['page'])
    .subscribe(res =>{
                  this.posts = res.posts
                  this.totalPosts = res.pageQt;
               });
  }

  getPhoto() {
    this.postsService.getPhotoDetails(this.route.snapshot.params['id'])
    .subscribe(res => this.posts = res.posts);
  }

  postComment(commentForm) {
    this.postsService.createComment(commentForm.comment,commentForm.photoId, commentForm.userId)
    .subscribe(res => this.posts = res.posts);
  }

}
