import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestModel } from './Test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService implements OnInit {
  constructor(
    public http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  getTest(): Observable<TestModel[]> {
    return this.http.get<TestModel[]>('http://localhost:5000/api/Tests').pipe(

    );
  }

  create(resource: TestModel): Observable<TestModel[]> {
    return this.http.post<TestModel[]>('http://localhost:5000/api/Tests', resource).pipe(

    );
  }

  getTestById(id: number): Observable<TestModel[]> {
    return this.http.get<TestModel[]>('http://localhost:5000/api/Tests/' + id).pipe();
  }
}
