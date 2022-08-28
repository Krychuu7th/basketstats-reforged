import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {MatchService} from "../match.service";
import {MatchQuarter} from "../../../models/match-quarter";
import {Match} from "../../../models/match";
import {ChartDataSets, ChartType} from "chart.js";
import {ChartProperty} from "../../../core/chart-property";
import {delay} from "rxjs/operators";
import {PlayersSummaryStatsOfMatch} from "../../../models/players-summary-stats-of-match";

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss']
})
export class MatchStatsComponent implements OnInit {

  public isLoading = false;

  public matchQuartersStats: MatchQuarter[];
  public matchSummaryStatsOfTeamA;
  public matchSummaryStatsOfTeamB;
  public match: Match;
  public matchPlayersSummaryStats: PlayersSummaryStatsOfMatch;

  public matchSummaryChartDataSets: ChartDataSets[];
  public matchSummaryChartType: ChartType = 'bar';
  public matchSummaryChartColor: any[];
  chartProperty = ChartProperty;

  constructor(
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
    this.activatedRoute.params
      .subscribe((queryParams: Params) => {
        this.matchService.getStatsOfMatch(queryParams['id']).pipe(delay(100)).subscribe(res => {
          this.matchQuartersStats = res;
        });
        this.matchService.getMatchById(queryParams['id']).pipe(delay(100)).subscribe(res => {
          this.match = res;
          this.isLoading = false;
        });
        this.isLoading = true;
        this.matchService.getPlayersSummaryStatsOfMatch(queryParams['id']).pipe(delay(100)).subscribe(res => {
          this.matchPlayersSummaryStats = res;
        });
        this.isLoading = true;
        this.matchService.getSummaryStatsOfMatch(queryParams['id']).pipe(delay(100)).subscribe(res => {
          this.matchSummaryStatsOfTeamA = res[0];
          this.matchSummaryStatsOfTeamB = res[1];

          if (this.matchSummaryStatsOfTeamA.pts > this.matchSummaryStatsOfTeamB.pts) {
            this.matchSummaryChartColor = this.chartProperty.winLoseBarChartColors;
          } else {
            this.matchSummaryChartColor = this.chartProperty.loseWinBarChartColors;
          }
          this.matchSummaryChartDataSets = [
            {
              data: [
                res[0].offr,
                res[0].defr,
                res[0].ast,
                res[0].blkm,
                res[0].stl,
                res[0].pm2,
                res[0].pm3,
                res[0].ftm
              ], label: this.matchSummaryStatsOfTeamA.team.name
            },
            {
              data: [
                res[1].offr,
                res[1].defr,
                res[1].ast,
                res[1].blkm,
                res[1].stl,
                res[1].pm2,
                res[1].pm3,
                res[1].ftm
              ], label: this.matchSummaryStatsOfTeamB.team.name
            }
          ];
        });
      });
  }

  navigateBack() {
    this.location.back();
  }

  changeChartType(): void {
    this.matchSummaryChartColor = this.matchSummaryChartType === 'radar' ?
      this.chartProperty.winLoseBarChartColors: this.chartProperty.winLoseRadarChartColors;
    this.matchSummaryChartType = this.matchSummaryChartType === 'radar' ? 'bar' : 'radar';
  }
}
