import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  saveEmployee(data: any){
    return this.http.post<any>(`${this.apiUrl}saveEmployee`, data);
  }

  getEmployees(){
    return this.http.get<any>(`${this.apiUrl}getEmployees`);
  }

  getEmployeeDetails(employeeId: string){
    return this.http.get<any>(`${this.apiUrl}getEmployeeDetails?employeeId=${employeeId}`);
  }

  updateEmployee(data: any){
    return this.http.put<any>(`${this.apiUrl}updateEmployee`, data);
  }

  deleteEmployee(data: any){
    return this.http.put<any>(`${this.apiUrl}deleteEmployee`, data);
  }
}
