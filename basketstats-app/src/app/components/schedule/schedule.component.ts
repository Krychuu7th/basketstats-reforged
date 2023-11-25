import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from "rxjs/operators";
import * as LeagueActions from 'src/app/components/league/state/league.actions';
import * as LeagueSelector from 'src/app/components/league/state/league.selectors';
import { BasketStatsAppState } from 'src/app/store';
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

  public leagues$: Observable<League[]>;

  constructor(
    private store: Store<BasketStatsAppState>,
    private leagueService: LeagueService,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadLeagues();
    this.leagues$ = this.store.pipe(select(LeagueSelector.selectAllLeagues));
    // this.isLoading = true;
    // this.leagueService.getAll().pipe(first()).subscribe(data => {
    //   this.leagueList = data;
    // });

    this.matchService.getMatchList().pipe(delay(500)).subscribe(data => {
      this.matchList = data;
      this.isLoading = false;
    });
  }

  private loadLeagues(): void {
    this.store.dispatch(LeagueActions.loadAllLeagues());
  }

  getMatchesOfLeague(leagueId: number) {
    return this.matchList ? this.matchList.filter(obj => obj.teamA.league.id == leagueId) : null;
  }

}
