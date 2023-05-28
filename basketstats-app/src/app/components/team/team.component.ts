import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromLeagueActions from 'src/app/components/league/state/league.actions';
import { League } from 'src/app/models/league.model';
import { BasketStatsAppState } from 'src/app/store';
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
  // leagues$: Observable<any[]>;
  leagues$: Observable<League[]>;
  // teamViewModel$: Observable<TeamViewModel>;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private store: Store<BasketStatsAppState>
  ) { }

  ngOnInit(): void {
    // this.isLoading$ = this.store.pipe(select(selectIsLoading));
    // this.page$ = this.store.pipe(select(selectPage));
    // this.leagueViewModel$ = this.store.pipe(select(selectLeagueViewModel));
    
    this.loadData();
  }

  loadData() {
    this.store.dispatch(fromLeagueActions.loadAllLeagues());
    // this.store.dispatch(loadTeams())
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
    // return this.teamList ? this.teamList.filter(obj => obj.league.id == leagueId) : null;
    // return this.store.pipe(select(selectTeamsByLeagueIdViewModel(leagueId)));
  }
}
