import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasketStatsAppState } from 'src/app/store';
import { loadLeagues } from 'src/app/store/actions/league.actions';
import { selectIsLoading, selectLeagues } from 'src/app/store/selectors/league.selectors';
import { Team } from "../../models/team";
import { LeagueService } from "../league/league.service";
import { TeamService } from "./team.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  // leagueList: League[];
  teamList: Team[];

  isLoading$: Observable<boolean>;

  // page$: Observable<number>;
  leagues$: Observable<any[]>;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private store: Store<BasketStatsAppState>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    // this.page$ = this.store.pipe(select(selectPage));
    this.leagues$ = this.store.pipe(select(selectLeagues));
    this.loadData();
  }

  loadData() {
    this.store.dispatch(loadLeagues());
    // this.isLoading = true;
    // this.leagueService.getLeagueList().pipe(first()).subscribe(data => {
    //   this.leagueList = data;
    // });

    // this.teamService.getTeamList().pipe(delay(500)).subscribe(data => {
    //   this.teamList = data;
    //   this.isLoading = false;
    // });
  }

  getTeamsOfLeague(leagueId: number) {
    return this.teamList? this.teamList.filter(obj => obj.league.id == leagueId): null;
  }

}
