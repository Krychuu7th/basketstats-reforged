import { Component, OnInit } from '@angular/core';
import { delay, first } from "rxjs/operators";
import { League } from "../../models/league";
import { Team } from "../../models/team";
import { LeagueService } from "../league/league.service";
import { TeamService } from "./team.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  leagueList: League[];
  teamList: Team[];

  isLoading = false;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.leagueService.getLeagueList().pipe(first()).subscribe(data => {
      this.leagueList = data;
    });

    this.teamService.getTeamList().pipe(delay(500)).subscribe(data => {
      this.teamList = data;
      this.isLoading = false;
    });
  }

  getTeamsOfLeague(leagueId: number) {
    return this.teamList? this.teamList.filter(obj => obj.league.id == leagueId): null;
  }

}
