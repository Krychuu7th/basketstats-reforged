import { Component, OnInit } from '@angular/core';
import { delay, first } from "rxjs/operators";
import { League } from "../../models/league.model";
import { Match } from "../../models/match";
import { LeagueService } from "../league/league.service";
import { MatchService } from "./match.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  leagueList: League[];
  matchList: Match[];

  isLoading = false;

  constructor(
    private leagueService: LeagueService,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.leagueService.getAllLeagues().pipe(first()).subscribe(data => {
      this.leagueList = data;
    });

    this.matchService.getMatchList().pipe(delay(500)).subscribe(data => {
      this.matchList = data;
      this.isLoading = false;
    });
  }

  getMatchesOfLeague(leagueId: number) {
    return this.matchList ? this.matchList.filter(obj => obj.teamA.league.id == leagueId): null;
  }

}
