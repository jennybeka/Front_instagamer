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
    this.postsService.getPublicPosts().subscribe(res => this.posts = res.posts);
  }

  getPhoto() {
    this.postsService.getPhotoDetails().subscribe(res => this.posts = res.posts);
  }

}
