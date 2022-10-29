import { Component, Input, OnChanges } from '@angular/core';
import { Match } from "../../../../models/match";
import { MatchQuarter } from "../../../../models/match-quarter";
import { PlayersSummaryStatsOfMatch } from "../../../../models/players-summary-stats-of-match";

@Component({
  selector: 'app-match-stats-for-players',
  templateUrl: './match-stats-for-players.component.html',
  styleUrls: ['./match-stats-for-players.component.scss']
})
export class MatchStatsForPlayersComponent implements OnChanges {

  @Input()
  public matchQuartersStats: MatchQuarter[];

  @Input()
  public match: Match;

  @Input()
  matchPlayersSummaryStats: PlayersSummaryStatsOfMatch[];

  tableHeaders = [
    {title: "Zawodnik", dataKey: "player"},
    {title: "PTS", dataKey: "pts"},
    {title: "2PM", dataKey: "pm2"},
    {title: "3PM", dataKey: "pm3"},
    {title: "FTM", dataKey: "ftm"},
    {title: "OREB", dataKey: "offr"},
    {title: "DREB", dataKey: "defr"},
    {title: "AST", dataKey: "ast"},
    {title: "BLK", dataKey: "blkm"},
    {title: "PF", dataKey: "pf"},
    {title: "EFF", dataKey: "eff"}
  ];

  constructor() {
  }

  ngOnChanges(): void {
  }

  // generatePDF() {
  //   let summaryStatsForExport = this.matchPlayersSummaryStats;
  //   let teamAsummaryStatsForExport = summaryStatsForExport.filter(st => st.player.team.id == this.match.teamA.id);
  //   let teamBsummaryStatsForExport = summaryStatsForExport.filter(st => st.player.team.id == this.match.teamB.id);

  //   const doc = new jspdf();
  //   doc.setFontSize(18);
  //   doc.text((this.match.teamA.name + '   VS    ' + this.match.teamB.name), 10, 10, { align: 'left' });
  //   doc.text((this.match.teamAScore + ' : ' + this.match.teamBScore), 10, 20, { align: 'left' });
  //   doc.addImage('/assets/images/basketstats.png', 'PNG', doc.internal.pageSize.getWidth()-25, 5, 20, 20);

  //   doc.setFontSize(11);

  //   const wonColor = [0, 214, 143];
  //   const lostColor = [252, 75, 75];

  //   let teamAName = this.match.teamA.name;

  //   let teamAStats = [];

  //   teamAsummaryStatsForExport.forEach(ts => {
  //     teamAStats.push(
  //       {
  //         "player": accents.remove(ts.player.firstName + ' ' + ts.player.lastName),
  //         "pts": ts.pts,
  //         "pm2": ts.pm2,
  //         "pm3": ts.pm3,
  //         "ftm": ts.ftm,
  //         "offr": ts.offr,
  //         "defr": ts.defr,
  //         "ast": ts.ast,
  //         "blkm": ts.blkm,
  //         "pf": ts.pf,
  //         "eff": ts.eff
  //       }
  //     );
  //   });

  //   doc.setFontSize(13);
  //   doc.text(teamAName, 15, 30);
  //   doc.setFontSize(11);

  //   (doc as any).autoTable(this.tableHeaders, teamAStats,
  //     {
  //       styles: {
  //         fillColor: (this.match.teamAScore > this.match.teamBScore ? wonColor : lostColor)
  //       },
  //       headerStyles: {
  //         fontSize: 12,
  //       },
  //       bodyStyles: {
  //         eff: {fontSize: 12}
  //       },
  //       margin: {top: 34}
  //     }
  //   );

  //   let teamBName = this.match.teamB.name;

  //   let teamBStats = [];

  //   teamBsummaryStatsForExport.forEach(ts => {
  //     teamBStats.push(
  //       {
  //         "player": accents.remove(ts.player.firstName + ' ' + ts.player.lastName),
  //         "pts": ts.pts,
  //         "pm2": ts.pm2,
  //         "pm3": ts.pm3,
  //         "ftm": ts.ftm,
  //         "offr": ts.offr,
  //         "defr": ts.defr,
  //         "ast": ts.ast,
  //         "blkm": ts.blkm,
  //         "pf": ts.pf,
  //         "eff": ts.eff
  //       }
  //     );
  //   });


  //   doc.setFontSize(13);
  //   doc.text(teamBName, 15, doc.internal.pageSize.getHeight()/2);
  //   doc.setFontSize(11);

  //   (doc as any).autoTable(this.tableHeaders, teamBStats,
  //     {
  //       styles: {
  //         fillColor: (this.match.teamAScore < this.match.teamBScore ? wonColor : lostColor)
  //       },
  //       headerStyles: {
  //         fontSize: 12,
  //       },
  //       bodyStyles: {
  //         eff: {fontSize: 12}
  //       },
  //       margin: {top: 34},
  //       startY: doc.internal.pageSize.getHeight()/2+5
  //     }
  //   );

  //   doc.output('dataurlnewwindow');
  //   doc.save((
  //     (this.match.teamA.name).replace(' ', '').toLowerCase()
  //     + '_' +
  //     (this.match.teamB.name).replace(' ', '').toLowerCase()
  //     + '.pdf'
  //   ));

  // }

}

