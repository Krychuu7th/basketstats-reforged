import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { MatchStatus } from "../../../enums/match-status.enum";
import { Match } from "../../../models/match";
import { MatchQuarterStatsOfPlayerForTeam } from "../../../models/match-quarter-player-stats-for-team";
import { Player } from "../../../models/player";
import { PlayerStats } from "../../../models/player-stats";
import { TeamWithoutLogo } from "../../../models/team-without-logo";
import { User } from "../../../models/user";
import { UserService } from "../../administration/user-list/user.service";
import { MatchService } from "../../schedule/match.service";
import { PlayerService } from "../../team/team-players/player.service";

@Component({
  selector: 'app-match-settings',
  templateUrl: './match-settings.component.html',
  styleUrls: ['./match-settings.component.css']
})
export class MatchSettingsComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  username: string;
  user: User;
  match: Match;
  teamAPlayers: Player[] = [];
  teamBPlayers: Player[] = [];
  isLoading = true;

  teamASelectedPlayersHashSet: any = {};
  teamBSelectedPlayersHashSet: any = {};
  teamASelectedPlayers: Player[] = [];
  teamBSelectedPlayers: Player[] = [];

  teamASelectedSubstitutePlayersHashSet: any = {};
  teamBSelectedSubstitutePlayersHashSet: any = {};
  teamASelectedSubstitutePlayers: Player[] = [];
  teamBSelectedSubstitutePlayers: Player[] = [];

  apiUrl = environment.api.url;

  constructor(
    // private authService: NbAuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private playerService: PlayerService,
    private location: Location,
    private router: Router,
    // private nbToastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadLoggedUserInfo();
    this.loadMatchDataForSettings();
  }

  loadLoggedUserInfo() {
    // this.authService.getToken().pipe(first())
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if(token.isValid()){
    //       this.username = token.getPayload().sub;

    //       this.userService.getUserByUsername(this.username)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe((user: User) => {
    //           this.user = user;
    //         });
    //     }
    //   });
  }

  navigateBack() {
    this.location.back();
  }

  loadMatchDataForSettings() {
    this.activatedRoute.params.pipe(delay(300))
      .subscribe((queryParams: Params) => {
        this.isLoading = true;
        this.matchService.getMatchById(queryParams['id']).subscribe(res => {
          this.match = res;

          this.playerService.getPlayersOfTeam(this.match.teamA.id).subscribe(res => {
            this.teamAPlayers = res;
          });

          this.playerService.getPlayersOfTeam(this.match.teamB.id).subscribe(res => {
            this.teamBPlayers = res;
          });
          this.isLoading = false;
        });
      });
  }

  choosePlayerForTeamA(player: Player) {
    if (!this.teamASelectedPlayersHashSet[player.id] && !this.teamASelectedSubstitutePlayersHashSet[player.id]) {
      if (this.teamASelectedPlayers.length < 5) {
        this.teamASelectedPlayers.push(player);
        this.teamASelectedPlayersHashSet[player.id] = true;
      } else {
        this.teamASelectedSubstitutePlayers.push(player);
        this.teamASelectedSubstitutePlayersHashSet[player.id] = true;
      }
    } else {
      if (this.teamASelectedPlayersHashSet[player.id]) {
        this.teamASelectedPlayers = this.teamASelectedPlayers.filter(p => p.id != player.id);
        delete this.teamASelectedPlayersHashSet[player.id];
      } else if (this.teamASelectedSubstitutePlayersHashSet[player.id]) {
        this.teamASelectedSubstitutePlayers = this.teamASelectedSubstitutePlayers.filter(p => p.id != player.id);
        delete this.teamASelectedSubstitutePlayersHashSet[player.id];
      }
    }
  }


  choosePlayerForTeamB(player: Player) {
    if (!this.teamBSelectedPlayersHashSet[player.id] && !this.teamBSelectedSubstitutePlayersHashSet[player.id]) {
      if (this.teamBSelectedPlayers.length < 5) {
        this.teamBSelectedPlayers.push(player);
        this.teamBSelectedPlayersHashSet[player.id] = true;
      } else {
        this.teamBSelectedSubstitutePlayers.push(player);
        this.teamBSelectedSubstitutePlayersHashSet[player.id] = true;
      }
    } else {
      if (this.teamBSelectedPlayersHashSet[player.id]) {
        this.teamBSelectedPlayers = this.teamBSelectedPlayers.filter(p => p.id != player.id);
        delete this.teamBSelectedPlayersHashSet[player.id];
      } else if (this.teamBSelectedSubstitutePlayersHashSet[player.id]) {
        this.teamBSelectedSubstitutePlayers = this.teamBSelectedSubstitutePlayers.filter(p => p.id != player.id);
        delete this.teamBSelectedSubstitutePlayersHashSet[player.id];
      }
    }
  }

  startMatch() {
    if (this.teamASelectedPlayers.length == 5 && this.teamBSelectedPlayers.length == 5) {
      this.createStatTemplateForTeamA();
      this.createStatTemplateForTeamB();
      if (this.match.matchStatus == MatchStatus.PLANNED) {
        this.match.matchStatus = MatchStatus.FIRST_QUARTER;
        this.matchService.updateMatch(this.match).subscribe(res => {
          this.showToast('Możesz już zbierać statystyki dla meczu',
            'Mecz rozpoczęty!',
            'success',
            false,
            'bottom-end',
            6000);
          this.router.navigate(['/match', 'progress', this.match.id, 1]);
        });
      } else if (this.match.matchStatus == MatchStatus.DONE) {
        this.showToast('Nie możesz rozpocząć zakończonego meczu',
          'Mecz zakończony!',
          'danger',
          false,
          'bottom-end',
          6000);
      } else {
        this.showToast('Rozpoczęto pierwszą kwartę meczu',
          'Mecz w trakcie!',
          'warning',
          false,
          'bottom-end',
          6000);
      }

    } else {
      this.showToast('Drużyna musi składać się z conajmniej 5 zawodników',
        'Nie wybrano pełnej drużyny!',
        'danger',
        false,
        'bottom-end',
        6000);
    }

  }

  createStatTemplateForTeamA() {
    const teamAStatTemplate = new MatchQuarterStatsOfPlayerForTeam;
    teamAStatTemplate.team = new TeamWithoutLogo(this.match.teamA.id, this.match.teamA.name, this.match.teamA.league);
    teamAStatTemplate.quarter = 1;
    teamAStatTemplate.playerStats = [];
    teamAStatTemplate.teamFouls = 0;
    for (let playerStarter of this.teamASelectedPlayers) {
      teamAStatTemplate.playerStats.push(new PlayerStats(playerStarter));
    }
    if (this.teamASelectedSubstitutePlayers.length > 0) {
      for (let playerSub of this.teamASelectedSubstitutePlayers) {
        teamAStatTemplate.playerStats.push(new PlayerStats(playerSub));
      }
    }
    console.log(teamAStatTemplate);
    localStorage.setItem('teamAStatsForMatchInProgress', JSON.stringify(teamAStatTemplate));
  }

  createStatTemplateForTeamB() {
    const teamBStatTemplate = new MatchQuarterStatsOfPlayerForTeam;
    teamBStatTemplate.team = new TeamWithoutLogo(this.match.teamB.id, this.match.teamB.name, this.match.teamB.league);
    teamBStatTemplate.quarter = 1;
    teamBStatTemplate.playerStats = [];
    teamBStatTemplate.teamFouls = 0;
    for (let playerStarter of this.teamBSelectedPlayers) {
      teamBStatTemplate.playerStats.push(new PlayerStats(playerStarter));
    }
    if (this.teamBSelectedSubstitutePlayers.length > 0) {
      for (let playerSub of this.teamBSelectedSubstitutePlayers) {
        teamBStatTemplate.playerStats.push(new PlayerStats(playerSub));
      }
    }
    console.log(teamBStatTemplate);
    localStorage.setItem('teamBStatsForMatchInProgress', JSON.stringify(teamBStatTemplate));
  }

  showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

}
