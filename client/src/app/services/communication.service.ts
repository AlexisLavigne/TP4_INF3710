import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlanRepas } from "../../../../common/tables/PlanRepas";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getAllPlansRepas(): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + "/planrepas")
      .pipe(catchError(this.handleError<any>("getAllPlansRepas")));
  }

  getPlanRepas(id: number): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + "/planrepas/" + id)
      .pipe(catchError(this.handleError<any>("getPlanRepas")));
  }

  deletePlanRepas(id: number): Observable<any> {
    console.log(id);
    return this.http
      .delete<any>(this.BASE_URL + "/planrepas/" + id)
      .pipe(catchError(this.handleError<any>("deletePlanRepas")));
  }

  addPlanRepas(newPlan: PlanRepas){
    return this.http
      .post<any>(this.BASE_URL + "/planrepas/", newPlan)
      .pipe(catchError(this.handleError<any>("deletePlanRepas")));
  }

  editPlanRepas(newPlan: PlanRepas, id: number): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/planrepas/" + id, newPlan)
      .pipe(catchError(this.handleError<number>("editPlanRepas")));
  }

  getAllFournisseurs(): Observable<any> {
    return this.http
      .get<any>(this.BASE_URL + "/fournisseurs")
      .pipe(catchError(this.handleError<any>("getAllFournisseurs")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
