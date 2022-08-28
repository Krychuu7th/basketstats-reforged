import { Component, OnInit } from '@angular/core';
import {LeagueService} from "../league/league.service";
import {delay, first} from "rxjs/operators";
import {League} from "../../models/league";
import {MatchService} from "./match.service";
import {Match} from "../../models/match";

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
    this.leagueService.getLeagueList().pipe(first()).subscribe(data => {
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
