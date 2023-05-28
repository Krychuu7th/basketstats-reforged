import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { ChartDataSets, ChartType } from "chart.js";
import { delay } from "rxjs/operators";
import { LOSE_WIN_BAR_CHART_COLORS, MATCH_SUMMARY_STATS_CHART_LABEL, MATCH_SUMMARY_STATS_RADAR_CHART_OPTIONS, WIN_LOSE_BAR_CHART_COLORS, WIN_LOSE_RADAR_CHART_COLORS } from "src/app/constants/chart-properties";
import { Match } from "../../../models/match";
import { MatchQuarter } from "../../../models/match-quarter";
import { PlayersSummaryStatsOfMatch } from "../../../models/players-summary-stats-of-match";
import { MatchService } from "../match.service";

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss']
})
export class MatchStatsComponent implements OnInit {

  public isLoading = false;

  public matchQuartersStats: MatchQuarter[];
  public matchSummaryStatsOfTeamA: any;
  public matchSummaryStatsOfTeamB: any;
  public match: Match;
  public matchPlayersSummaryStats: PlayersSummaryStatsOfMatch;

  public matchSummaryChartDataSets: ChartDataSets[];
  public matchSummaryChartType: ChartType = 'bar';
  public matchSummaryChartColor: any[];
  public MATCH_SUMMARY_STATS_CHART_LABEL = MATCH_SUMMARY_STATS_CHART_LABEL;
  public MATCH_SUMMARY_STATS_RADAR_CHART_OPTIONS = MATCH_SUMMARY_STATS_RADAR_CHART_OPTIONS;

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
            this.matchSummaryChartColor = WIN_LOSE_BAR_CHART_COLORS;
          } else {
            this.matchSummaryChartColor = LOSE_WIN_BAR_CHART_COLORS;
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
      WIN_LOSE_BAR_CHART_COLORS : WIN_LOSE_RADAR_CHART_COLORS;
    this.matchSummaryChartType = this.matchSummaryChartType === 'radar' ? 'bar' : 'radar';
  }
}
