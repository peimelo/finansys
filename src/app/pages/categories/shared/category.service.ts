import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiPath)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get<Category>(url).pipe(catchError(this.handleError));
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.apiPath, category)
      .pipe(catchError(this.handleError));
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    console.log(category);

    return this.http.put<Category>(url, category).pipe(
      map(() => category),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PRIVATE METHODS

  // private jsonDataToCategories(jsonData: any[]): Category[] {
  //   const categories: Category[] = [];
  //   jsonData.forEach((element) => categories.push(element as Category));
  //   return categories;
  // }

  // private jsonDataToCategory(jsonData: any): Category {
  //   return jsonData as Category;
  // }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
