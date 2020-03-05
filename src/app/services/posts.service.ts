import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  /**Pegar todoas os posts de quem eu sigo */
  getPublicPosts(page: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(`http://localhost:3001/instagamer/posts/${page}`, { headers });
  }

  /**Pegar as informações de uma foto especifica, comentarios, likes e tags */
  getPhotoDetails(id:number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(`http://localhost:3001/instagamer/posts/photo/${id}`, { headers });
  }

    like(idphoto:number){
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(`http://localhost:3001/instagamer/posts/like/${idphoto}`, { headers });
    }
      
}
