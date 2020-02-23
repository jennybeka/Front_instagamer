import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getProfile(page: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    console.log(`Chamando aquiiiii`)
    return this.http.get(`http://localhost:3001/instagamer/profile/${page}`, { headers });
  }

  createPost(image_url: string, text_photo: string, tags_image: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    console.log(`Chamando o outro ${tags_image}`)
    return this.http.post('http://localhost:3001/instagamer/posts/create', {image_url, text_photo, tags_image}, { headers } );
  }
}
