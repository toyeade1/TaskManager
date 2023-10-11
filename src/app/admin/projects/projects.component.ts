import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects!: Project[];
  newProject: Project = new Project();

  // creating an edit project of Porject type
  editProject: Project = new Project();
  //saving the index that is being edited
  editIndex: any = null;

  // creating new project object for deleting project
  deleteProject: Project = new Project();
  deleteIndex: any = null;

  //searching project
  searchBy: string = 'ProjectName';
  searchText: string = '';

  constructor(private projectService: ProjectsService) {}

  /** because we have the getallprojects function as an obeservable, we are subscribing to it upon the initialization of the component. Under the subscribe we have to say what we will
   * have to say what we are doing to once the data is available. Here we are adding the response which will be an array of projects to the this projects variable we created. Allowing
   * Us to be able to use the information that would be stored in the database.
   */
  ngOnInit() {
    this.projectService.getAllProjects().subscribe((response: Project[]) => {
      this.projects = response;
    });
  }

  // because we want to make sure that the values are not overwritten when we set them back to null we are going to copy the reponse contents in another variable and then push them
  onSaveClick() {
    this.projectService.insertProject(this.newProject).subscribe(
      (response) => {
        // creating a new project object
        let p = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        this.projects.push(p);

        // added this sort function to allow the projects in the array to have sequential values
        this.sortprojectArray();

        // here we are resetting the values
        this.newProject.projectID = 0;
        this.newProject.projectName = null;
        this.newProject.dateOfStart = null;
        this.newProject.teamSize = 0;
      },

      (error) => {
        console.log(error);
      }
    );
  }

  // we will be using the javascript event object which stores information about the event and what it is assiciated with. if the first row is clicked then the index would be 0
  onEditClick(event: any, index: number) {
    // we are then going to display the content for the index of the project array
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;

    this.editIndex = index;
  }

  onUpdateClick() {
    this.projectService.updateProject(this.editProject).subscribe(
      // because we have to handle both the response and the error events we will transform the observable. Firstly we would want the response to be of project type,
      // meaning having all 4 variable.
      (response: Project) => {
        // we will create a new project object and insert it into the project at the index of the previous project object
        let p: Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        this.projects[this.editIndex] = p;

        // here we are resetting the values for the edit project object
        this.editProject.teamSize = 0;
        this.editProject.projectID = 0;
        this.editProject.dateOfStart = null;
        this.editProject.projectName = null;
      },

      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteClick(event: any, index: number) {
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;

    this.deleteIndex = index;
  }

  onDeleteConfirmClick() {
    this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) => {
        // i previously used slice but it would not update in the browser until refreshed.
        this.projects.splice(this.deleteIndex, 1);

        this.deleteProject.projectID = 0;
        this.deleteProject.projectName = null;
        this.deleteProject.dateOfStart = null;
        this.deleteProject.teamSize = 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortprojectArray() {
    this.projects.sort((a, b) => a.projectID - b.projectID);
  }

  onSearchClick() {
    this.projectService.searchProject(this.searchBy, this.searchText).subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearch() {
    this.projectService
      .searchProject(this.searchBy, this.searchText)
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.log(error);
        },
      });
  }
}
