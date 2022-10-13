import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
export class Story {
  _id: number;
  title: string;
  content: string;
}
const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  endpoint = 'http://localhost:8080/api/stories/';

  constructor(private httpClient: HttpClient) { }

  createStory(story, blob) {
    let data = new FormData();
    data.append("title", story.title);
    data.append("content", story.content);
    data.append("file", blob);
    return this.httpClient.post(this.endpoint, data)
      .pipe(
        tap(_ => console.log(`Story created:`)),
        // catchError(this.handleError<Story[]>('Create story'))
      );
  }

  getStories() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        tap(users => console.log('Stories retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }
  getStory(id) {
    return this.httpClient.get(this.endpoint + id)
      .pipe(
        tap(_ => console.log(`Story fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }
  deleteStory(id) {
    return this.httpClient.delete(this.endpoint + id)
      .pipe(
        tap(_ => console.log(`Story deleted: ${id}`)),
        // catchError(this.handleError<Story[]>('Delete story'))
      );
  }
  updateStory(id, story, blob) {
    let data = new FormData();
    data.append("title", story.title);
    data.append("content", story.content);
    data.append("file", blob);
    console.log("aaa")
    return this.httpClient.put(this.endpoint + id, data)
      .pipe(
        tap(_ => console.log(`Story updated: ${id}`)),
        // catchError(this.handleError<Story[]>('Update story'))
      );
  }
  // updateStoryFull(id, story, blob) {
  //   let data = new FormData();
  //   data.append("title", story.title);
  //   data.append("content", story.content);
  //   data.append("file", blob);
  //   console.log(blob)
  //   return this.httpClient.put(this.endpoint + id, data)
  //     .pipe(
  //       tap(_ => console.log(`Story updated: ${id}`)),
  //       // catchError(this.handleError<Story[]>('Update story'))
  //     );
  // }
  // private handleError(operation = 'operation', result?: ) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
}
