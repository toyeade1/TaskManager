import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  // we are adding the http client as a dependency for the constructor
  constructor(private httpClient: HttpClient) {}

  // Observables are required return information and within this function, we define a function that is an observable and it uses the http client to get
  // data of the projects
  getAllProjects(): Observable<Project[]> {
    // we are going to be moving all of this code into a seperate service called jwtinterceptor which will do this for all of our request functions so we dont have to put it manually.
    // we have to create 2 new variables for the current user and the headers. This will help create the autorization token
    // let currentUser = {token: ""};
    // let headers = new HttpHeaders();
    // // we are setting the header as a default authrization token with a bearer token.
    // headers.set('Authorization', 'Bearer ');
    // // checking to see if the sessionStorage contains the currentUser variable and if it does we will add the currentUser.token.
    // if (sessionStorage['currentUser'] != null) {
    //   currentUser = JSON.parse(sessionStorage['currentUser']);
    //   headers = headers.set('Authorization', 'Bearer ' + currentUser.token);
    // }

    return this.httpClient
    // we will add the headers to the request as it contains the authorization tokens and would allow the connection to be established.
      .get<Project[]>('http://localhost:9090/api/projects', {
        responseType: 'json',
      })
      // here we are using the map capabilities of Angular to transform the data response before it is accessed by the component.
      .pipe(
        map((response: Project[]) => {
          for (let i = 0; i < response.length; i++) {
            response[i].teamSize = response[i].teamSize * 10;
          };
          return response;
        })
      );
  }

  // I will now create a post request to enter new projects into the site
  // note that when this is being done for the API and for the frontend
  insertProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(
      'http://localhost:9090/api/projects',
      project,
      { responseType: 'json' }
    );
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.put<Project>(
      'http://localhost:9090/api/projects',
      project,
      { responseType: 'json' }
    );
  }

  deleteProject(ProjectID: number): Observable<string> {
    // we are concatonating the project id into the url request
    return this.httpClient.delete<string>(
      'http://localhost:9090/api/projects?ProjectID=' + ProjectID
    );
  }

  // we are adding a search projects
  searchProject(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      'http://localhost:9090/api/projects/search/' +
        searchBy +
        '/' +
        searchText,
      { responseType: 'json' }
    );
  }
}
