import { Component, Renderer2, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

// note that for variables not defined initially inside of a component you would have to add the ! so that typescript doesn't show error messages.
// Everything in the onInit is what we want to happen as soon as the component is initialized. In this case as soon as the website is opened.
export class DashboardComponent implements OnInit {

  Designation!: string;
  Username!: string;
  NoOfTeamMembers!: number;
  TotalCostOfAllProjects!: number;
  PendingTasks!: number;
  UpComingProjects!: number;
  ProjectCost!: number;

  CurrentExpenditure!: number;
  AvailableFunds!: number;

  Clients!:string[];
  Projects!:string[];
  Years:number[] = [];
  TeamMembersSummary!: any[];
  TeamMembers!: any[];
  toDay!: Date;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.Designation = "Team Leader";
    this.Username = "John Smith";
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52436;

    // Inputing the values for the variables we will be referencing with the ngFor command
    this.Clients =[
      'ABC Infotech',
      'DFG Infotech',
      'HIJ Infotech'
    ]

    this.Projects = [
      'Project A',
      'Project B',
      'Project C',
      'Project D'
    ]
    // we are accessing the service here and using the information in the team members summary
    this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary()

    for (let i = 2019; i >= 2010; i--) {
      this.Years.push(i);
    }

    this.TeamMembers = [
      {Region: "North", Members: [
        {ID:1, Name: "Ford", Status:"Available"},
        {ID:2, Name: "Miller", Status:"Available"},
        {ID:3, Name: "Jones", Status:"Busy"},
        {ID:4, Name: "James", Status:"Busy"},
      ]},
      {Region: "West", Members: [
        {ID:5, Name: "Ryan", Status:"Available"},
        {ID:6, Name: "John", Status:"Available"},
        {ID:7, Name: "Joel", Status:"Busy"},
        {ID:8, Name: "Pat", Status:"Busy"},
      ]},
      {Region: "East", Members: [
        {ID:9, Name: "Solo", Status:"Available"},
        {ID:10, Name: "Bukky", Status:"Available"},
        {ID:11, Name: "Anjola", Status:"Busy"},
        {ID:12, Name: "Charles", Status:"Busy"},
      ]},
      {Region: "South", Members: [
        {ID:13, Name: "Toye", Status:"Available"},
        {ID:14, Name: "Sammy", Status:"Available"},
        {ID:15, Name: "Des", Status:"Busy"},
        {ID:16, Name: "Nifemi", Status:"Busy"},
      ]}
    ]

    this.toDay = new Date()

  }

  onProjectChange($event:any) {
    if ($event.target.innerHTML == "Project A"){
      this.ProjectCost = 2113507
      this.CurrentExpenditure = 97855
      this.AvailableFunds = 32904
    }
    else if ($event.target.innerHTML == "Project B") {
      this.ProjectCost = 534953
      this.CurrentExpenditure = 94538
      this.AvailableFunds = 38495
    }
    else if ($event.target.innerHTML == "Project C") {
      this.ProjectCost = 3459785
      this.CurrentExpenditure = 398487
      this.AvailableFunds = 23984
    }
    else if ($event.target.innerHTML == "Project D") {
      this.ProjectCost = 3489345
      this.CurrentExpenditure = 84394
      this.AvailableFunds = 239430
    }

  }

}
