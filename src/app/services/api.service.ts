import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Fighter } from '../models/fighter';
import { Category } from '../models/category';

const apiUrl = 'https://unimetrocamp-ufc-api.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFighters(): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${apiUrl}/fighters`);
  }

  getFighter(id: number): Observable<Fighter> {
    return this.http.get<Fighter>(`${apiUrl}/fighters/${id}`);
  }

  getMaleCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/categories/male.json');
  }

  getFemaleCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/categories/female.json');
  }

  addFighter(fighter: Fighter): Observable<Fighter> {
    return this.http.post<Fighter>(`${apiUrl}/fighters`, fighter);
  }

  generateFight(gender: string, category: string): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${apiUrl}/fighters/random/${gender}/${category}`);
  }
}
