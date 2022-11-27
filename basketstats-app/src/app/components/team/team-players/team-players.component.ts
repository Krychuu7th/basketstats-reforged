import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";
import { delay } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { ChartProperty } from "../../../core/chart-property";
import { MatchStatus } from "../../../enums/match-status.enum";
import { Match } from "../../../models/match";
import { Player } from "../../../models/player";
import { Team } from "../../../models/team";
import { MatchService } from "../../schedule/match.service";
import { TeamService } from "../team.service";
import { PlayerService } from "./player.service";

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit {

  isLoading = false;

  team: Team;
  teamPlayers: Player[];
  teamMatches: Match[];
  teamPlayersAvgStats: any[];
  teamWins: number;
  teamLoses: number;
  teamNumberOfMatches: number;
  chartProperty = ChartProperty;

  apiUrl = environment.api.url;

  MatchStatus = MatchStatus;

  public winLoseChartLabels: Label[];
  public winLoseChartData: SingleDataSet;
  public winLoseChartType: ChartType = 'doughnut';
  public winLoseChartColors: any[];
  public winLoseChartOptions: any;

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.activatedRoute.params.pipe(delay(300))
      .subscribe((queryParams: Params) => {
        this.teamService.getTeamById(queryParams['id']).subscribe(res => {
          this.team = res;
        });

        this.playerService.getPlayersOfTeam(queryParams['id']).subscribe(res => {
          this.teamPlayers = res;
        });

        this.matchService.getMatchListByTeamId(queryParams['id']).subscribe(res => {
          this.teamMatches = res;
          this.teamWins = 0;
          this.teamLoses = 0;
          this.teamNumberOfMatches = 0;
          for(let match of this.teamMatches) {
            match.matchStatus == MatchStatus.DONE ? this.teamNumberOfMatches++ : this.teamNumberOfMatches;
            if(match.teamAScore > match.teamBScore) {
              this.team.id == match.teamA.id ? this.teamWins++ : this.teamLoses++;
            }
            else if (match.teamAScore < match.teamBScore) {
              this.team.id == match.teamB.id ? this.teamWins++ : this.teamLoses++;
            }
          }
          if(this.teamLoses == 0 && this.teamWins == 0) {
            this.winLoseChartOptions = this.chartProperty.noTooltipDoughnutChartOptions;
            this.winLoseChartLabels = this.chartProperty.noMatchesDoughnutChartLabels;
            this.winLoseChartColors = this.chartProperty.noMatchesDoughnutChartColors;
            this.winLoseChartData = this.chartProperty.noMatchesDoughnutChartData;;
          } else {
            this.winLoseChartOptions  = this.chartProperty.basicDoughnutChartOptions;
            this.winLoseChartLabels = this.chartProperty.winLoseChartLabels;
            this.winLoseChartColors = this.chartProperty.winLoseDoughnutChartColors;
            this.winLoseChartData = [this.teamLoses, this.teamWins];
          }
        });
        this.teamService.getAllPlayerAvgStatsByTeamId(queryParams['id']).subscribe(res => {
          this.teamPlayersAvgStats = res;
        });
        this.isLoading = false;
      });
  }

  navigateBack() {
    this.location.back();
  }
}
