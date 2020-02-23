import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  info: any[] = [];
  user: any[] = [];
  totalPosts: number;
  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,

    ) { }

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {
    this.usersService.getProfile(this.route.snapshot.params['page'])
    .subscribe(res => {
                        this.info = res.info;
                        this.user = res.user;
                        this.totalPosts = res.pageQt;
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

  createPhoto(photoForm) {
    console.log(`Chamando criação ${photoForm.tags_image}`)
    this.usersService.createPost(photoForm.image_url, photoForm.text_image, photoForm.tags_image).subscribe(res => {
      console.log("funciona");
    });
    
  }

}
