import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/app/services/search.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 
  dataNotFound: Boolean;
  search: FormGroup;
  allUser: any[] = [];

  controlPage: number = 0;
  totalPosts: number;
  username: string;
  gravatar: string;
  page: number = 0;
  posts: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
    this.search = this.formBuilder.group({
      searchUsers: ['']

    });
    this.searchUsers('');
  }

  get s() { return this.search.controls; }

  searchUsers(paramInput: string) {
    
    this.searchService.getAllUsers(this.route.snapshot.params['page'], paramInput)
      .subscribe(res => {
        this.allUser = res.posts;
        this.totalPosts = res.pageQt;
        // console.log(this.username)

        if (this.allUser.length == 0) {
          this.dataNotFound = true
          console.log(this.dataNotFound)
        } else {
          console.log("Aqui elsa!")
          this.username = this.allUser[0]['username'];
          this.gravatar = this.allUser[0]['gravatar_hash'];
          this.dataNotFound = false
        }
      });

  }

  loadMoreUsers(paramInput: string) {
    console.log("Alluser antes")
    console.log(this.allUser)
    this.controlPage++;

    this.searchService.getAllUsers(this.route.snapshot.params['page'] + this.controlPage, paramInput)
      .subscribe(res => {
        for (let user of res.posts) {
          this.allUser.push(user);
        };
        console.log("Alluser depois")
        console.log(res.posts)
      })
  }



}
