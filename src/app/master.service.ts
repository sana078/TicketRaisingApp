import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = "https://freeapi.miniprojectideas.com/api/TicketsNew/";

  constructor(private http: HttpClient) { }

  //function for an api call
  login(obj:any){
    debugger;
    //here we need to call the api
    return this.http.post(this.apiUrl + "Login",obj);
  }
  //service for Role
  getAllRoles():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetAllRoles`);
  }
  getAllDepartment():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetDepartments`); //template literal
  }
  createNewDepartment(obj:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CreateDepartment`, obj);
  }
  updateDepartment(obj:any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}UpdateDepartment`,obj);
  }
  deleteDepartmentbyId(id : number):Observable<any>{
   return  this.http.delete<any>(`${this.apiUrl}DeleteDepartment?id=${id}`);
  }

  //services for parent-category
  getAllParentCategory():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetParentCategory`); //template literal
  }
  createNewParentCategory(obj:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CreateParentCategory`, obj);
  }
  updateParentCategory(obj:any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}UpdateParentCategory`,obj);
  }
  deleteParentCategorybyId(id : number):Observable<any>{
   return  this.http.delete<any>(`${this.apiUrl}DeleteParentCategory?id=${id}`);
  }

   //services for child-category
   getAllChildCategory():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetChildCategory`); //template literal
  }
  createNewChildCategory(obj:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CreateChildCategory`, obj);
  }
  updateChildCategory(obj:any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}UpdateChildCategory`,obj);
  }
  deleteChildCategorybyId(id : number):Observable<any>{
   return  this.http.delete<any>(`${this.apiUrl}DeleteChildCategory?id=${id}`);
  }
  //services for employee
  getAllEmployee():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetEmployees`); //template literal
  }
  createEmp(obj:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CreateEmployee`, obj);
  }
  updateEmp(obj:any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}UpdateEmployee`,obj);
  }
  deleteEmp(id : number):Observable<any>{
   return  this.http.delete<any>(`${this.apiUrl}DeleteEmployee?id=${id}`);
  }

  //service for createNewTicket
  createNewTicket(obj:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CreateNewTicket`, obj);
  }

  getCreatedByLoggedEmp(empId:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetTicketsCreatedByEmpId?empId=${empId}`); //template literal
  }

  getTicketAssignendToEmp(empId:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetAssignedTicketsByEmpId?empId=${empId}`); //template literal
  }


}
