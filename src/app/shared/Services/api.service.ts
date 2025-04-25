import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getItems(Module: string, Accion: string = ''): Observable<any[]> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.get<any[]>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}`);
  }

  getItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.get<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}/${id}`);
  }

  postItem(Module: string, data: any, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.post<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}`, data);
  }

  updateItem(Module: string, id: number, data: any, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.put<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}/${id}`, data);
  }

  deleteItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.delete<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}/${id}`);
  }

  accionValor(Accion: string) {
    return Accion != '' ? `/${Accion}` : '';
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/logout`, {}).pipe(
      tap(() => {
        // Si la petición es exitosa, elimina los datos almacenados en localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        console.log('Sesión cerrada y datos eliminados del localStorage.');
      }),
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        throw error;
      })
    );
  }
}
