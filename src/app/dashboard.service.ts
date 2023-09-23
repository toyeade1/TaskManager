import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  // Here inside of the dashboard service we are making the business logic separate from the ui logic by defining the variables that will be used by the dashboard here instead of in
  // the dashboard ts file. This function can be used across all compenents that are configured. We have configured the Admin so it will be available for all of the admin components.
  getTeamMembersSummary():any[] {

    const TeamMembersSummary = [
      {Region: "East", TeamMembersCount:20, TemporarilyUnavailableMembers: 4},
      {Region: "West", TeamMembersCount:15, TemporarilyUnavailableMembers:8},
      {Region: "North", TeamMembersCount:17, TemporarilyUnavailableMembers:1},
      {Region: "South", TeamMembersCount:15,TemporarilyUnavailableMembers:6}
    ];
    return TeamMembersSummary;
}

}
