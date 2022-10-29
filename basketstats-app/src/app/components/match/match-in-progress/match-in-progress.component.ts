import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subject, Subscription, timer } from "rxjs";
import { environment } from "../../../../environments/environment";
import { MatchStatus } from "../../../enums/match-status.enum";
import { ShootType } from "../../../enums/shoot-type.enum";
import { StatType } from "../../../enums/stat-type";
import { LastStat } from "../../../models/last-stat";
import { Match } from "../../../models/match";
import { MatchQuarterStatsOfPlayerForTeam } from "../../../models/match-quarter-player-stats-for-team";
import { MatchQuarterStatsSaveRequest } from "../../../models/match-quarter-stats-save-request";
import { Player } from "../../../models/player";
import { PlayerStats } from "../../../models/player-stats";
import { PlayersSummaryStatsOfMatch } from "../../../models/players-summary-stats-of-match";
import { PointStat } from "../../../models/point-stat";
import { User } from "../../../models/user";
import { UserService } from "../../administration/user-list/user.service";
import { MatchService } from "../../schedule/match.service";
import { PlayerService } from "../../team/team-players/player.service";

@Component({
  selector: 'app-match-in-progress',
  templateUrl: './match-in-progress.component.html',
  styleUrls: ['./match-in-progress.component.css']
})
export class MatchInProgressComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  username: string;
  user: User;
  match: Match;
  teamAPlayers: Player[] = [];
  teamBPlayers: Player[] = [];
  isLoading = false;
  matchStatus = MatchStatus;
  quarter: number = 1;

  startingQuarterStats: PlayersSummaryStatsOfMatch[];

  teamAData: MatchQuarterStatsOfPlayerForTeam;
  teamBData: MatchQuarterStatsOfPlayerForTeam

  teamAStats: PlayerStats[] = [];
  teamBStats: PlayerStats[] = [];

  teamAFouls: number = 0;
  teamBFouls: number = 0;

  teamAPlayersOnCourt: Player[] = [];
  teamBPlayersOnCourt: Player[] = [];

  teamAPlayersOnCourtHashSet = {};
  teamBPlayersOnCourtHashSet = {};

  teamAPlayersSubs: Player[] = [];
  teamBPlayersSubs: Player[] = [];

  teamAPointsToAdd: PointStat;
  teamBPointsToAdd: PointStat;

  lastAddedStats: LastStat[] = [];

  statType = StatType;

  shootType = ShootType;

  localStorageSaveInterval: any;
  showSaveLoader = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  isFinishConfirmNeeded = true;

  syncIntervalTime = environment.syncIntervalTime;
  apiUrl = environment.url;

  constructor(
    // private authService: NbAuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private playerService: PlayerService,
    private location: Location,
    private router: Router,
    // private nbToastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.loadLoggedUserInfo();

    this.loadMatchDataForSettings();

    this.localStorageSaveInterval = setInterval(() => {
      this.saveMatchStatsToLocally(false);
    }, this.syncIntervalTime);
  }

  ngOnDestroy() {
    if (this.localStorageSaveInterval) {
      clearInterval(this.localStorageSaveInterval);
    }
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadLoggedUserInfo() {
    // this.authService.getToken().pipe(first())
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if (token.isValid()) {
    //       this.username = token.getPayload().sub;

    //       this.userService.getUserByUsername(this.username)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe((user: User) => {
    //           this.user = user;
    //         });
    //     }
    //   });
  }

  loadMatchDataForSettings() {
    this.activatedRoute.params
      .subscribe((queryParams: Params) => {
        this.isLoading = true;
        this.matchService.getPlayersSummaryStatsOfMatch(queryParams['id']).subscribe(res =>{
          this.startingQuarterStats = res;
        });

        this.matchService.getMatchById(queryParams['id']).subscribe(res => {
          this.match = res;
          this.quarter = queryParams['q'];
          if (
            (this.quarter == 1 && this.match.matchStatus != MatchStatus.FIRST_QUARTER) ||
            (this.quarter == 2 && this.match.matchStatus != MatchStatus.SECOND_QUARTER) ||
            (this.quarter == 3 && this.match.matchStatus != MatchStatus.THIRD_QUARTER) ||
            (this.quarter == 4 && this.match.matchStatus != MatchStatus.FOURTH_QUARTER) ||
            (this.quarter > 4 && this.match.matchStatus != MatchStatus.OVERTIME)
          ) {
            if (this.match.matchStatus == MatchStatus.FIRST_QUARTER) {
              this.router.navigate(['/match', 'progress', this.match.id, 1]);
            } else if (this.match.matchStatus == MatchStatus.SECOND_QUARTER) {
              this.router.navigate(['/match', 'progress', this.match.id, 2]);
            } else if (this.match.matchStatus == MatchStatus.THIRD_QUARTER) {
              this.router.navigate(['/match', 'progress', this.match.id, 3]);
            } else if (this.match.matchStatus == MatchStatus.FOURTH_QUARTER) {
              this.router.navigate(['/match', 'progress', this.match.id, 4]);
            } else if (this.match.matchStatus == MatchStatus.OVERTIME) {
              this.router.navigate(['/match', 'progress', this.match.id, 5]);
            }
          }

          this.playerService.getPlayersOfTeam(this.match.teamA.id).subscribe(res => {
            this.teamAPlayers = res;
          });

          this.playerService.getPlayersOfTeam(this.match.teamB.id).subscribe(res => {
            this.teamBPlayers = res;
          });

          this.setTeamAPlayers();
          this.setTeamBPlayers();

          this.isLoading = false;
        });
      });
  }

  setTeamAPlayers() {
    this.teamAData = JSON.parse(localStorage.getItem('teamAStatsForMatchInProgress'));
    this.teamAPlayers = [];
    this.teamAPlayersOnCourt = [];
    this.teamAPlayersOnCourtHashSet = {};
    this.teamAPlayersSubs = [];
    this.teamAStats = [];
    if (this.teamAData) {
      this.teamAData.playerStats.forEach(ps => {
        this.teamAStats.push(ps);
        this.teamAPlayers.push(ps.player);
        this.match.teamAScore += ps.pts;
      });

      this.teamAFouls = this.teamAData.teamFouls;
      this.teamAPlayers.forEach((p, index) => {
        if (index < 5) {
          this.teamAPlayersOnCourt.push(p);
          this.teamAPlayersOnCourtHashSet[p.id] = true;
        } else {
          this.teamAPlayersSubs.push(p);
        }
      });

    }
    else {
      this.teamAData = new MatchQuarterStatsOfPlayerForTeam();
      this.teamAData.playerStats = [];
      this.teamAData.teamFouls = 0;
      this.teamAData.quarter = this.quarter;
      this.teamAData.team = this.match.teamA;
      this.startingQuarterStats.forEach(sqs => {
        if (sqs.player.team.id == this.match.teamA.id) {
          this.teamAData.playerStats.push(sqs);
          this.teamAStats.push(sqs);
          this.teamAPlayers.push(sqs.player);
          this.match.teamAScore += sqs.pts;
        }
      });

      this.teamAFouls = 0;
      this.startingQuarterStats.forEach((p, index) => {
        if(p.player.team.id == this.match.teamA.id) {
          if (index < 5) {
            this.teamAPlayersOnCourt.push(p.player);
            this.teamAPlayersOnCourtHashSet[p.player.id] = true;
          } else {
            this.teamAPlayersSubs.push(p.player);
          }
        }
      });
    }
  }

  setTeamBPlayers() {
    this.teamBData = JSON.parse(localStorage.getItem('teamBStatsForMatchInProgress'));
    this.teamBPlayers = [];
    this.teamBPlayersOnCourt = [];
    this.teamBPlayersOnCourtHashSet = {};
    this.teamBPlayersSubs = [];
    this.teamBStats = [];

    if (this.teamBData) {
      this.teamBData.playerStats.forEach(ps => {
        this.teamBStats.push(ps);
        this.teamBPlayers.push(ps.player);
        this.match.teamBScore += ps.pts;
      });

      this.teamBFouls = this.teamBData.teamFouls;

      this.teamBPlayers.forEach((p, index) => {
        if (index < 5) {
          this.teamBPlayersOnCourt.push(p);
          this.teamBPlayersOnCourtHashSet[p.id] = true;
        } else {
          this.teamBPlayersSubs.push(p);
        }
      });
    }
    else {
      this.teamBData = new MatchQuarterStatsOfPlayerForTeam();
      this.teamBData.playerStats = [];
      this.teamBData.teamFouls = 0;
      this.teamBData.quarter = this.quarter;
      this.teamBData.team = this.match.teamA;
      this.startingQuarterStats.forEach(sqs => {
        if (sqs.player.team.id == this.match.teamB.id) {

          this.teamBData.playerStats.push(sqs);
          this.teamBStats.push(sqs);
          this.teamBPlayers.push(sqs.player);
          this.match.teamBScore += sqs.pts;
        }
      });

      this.teamBFouls = 0;

      this.startingQuarterStats.forEach((p, index) => {
        if(p.player.team.id == this.match.teamB.id) {
          if (index < 5) {
            this.teamBPlayersOnCourt.push(p.player);
            this.teamBPlayersOnCourtHashSet[p.player.id] = true;
          } else {
            this.teamBPlayersSubs.push(p.player);
          }
        }
      });
    }
  }

  saveMatchStatsToLocally(isQuarterFinished: boolean) {

    let teamAStatTemplate = this.teamAData;

    teamAStatTemplate.playerStats = [];
    teamAStatTemplate.playerStats = this.teamAStats;

    if (!isQuarterFinished) {
      teamAStatTemplate.teamFouls = this.teamAFouls;
    } else {
      teamAStatTemplate.teamFouls = 0;
    }
    localStorage.setItem('teamAStatsForMatchInProgress', JSON.stringify(teamAStatTemplate));

    let teamBStatTemplate = this.teamBData;
    teamBStatTemplate.playerStats = this.teamBStats;
    if (!isQuarterFinished) {
      teamBStatTemplate.teamFouls = this.teamBFouls;
    } else {
      teamBStatTemplate.teamFouls = 0;
    }
    localStorage.setItem('teamBStatsForMatchInProgress', JSON.stringify(teamBStatTemplate));

    this.runSaveLoader();
  }

  runSaveLoader(){
    this.showSaveLoader = true;
    this.timer = timer(2000);
    this.subscription = this.timer.subscribe(() => {
      this.showSaveLoader = false;
    });
  }

  getFullName(firstName: string, lastName: string) {
    return lastName + ' ' + firstName;
  }

  getFoulsOfTeamAPlayer(playerId: number) {
    if (this.teamAStats) {
      const playerStats = this.teamAStats.find(ps => ps.player.id == playerId);
      if(playerStats) {
        return playerStats.pf;
      }
    }
    return 0;
  }

  getFoulsOfTeamBPlayer(playerId: number) {
    if (this.teamBStats) {
      const playerStats = this.teamBStats.find(ps => ps.player.id == playerId);
      if(playerStats) {
        return playerStats.pf;
      }
    }
    return 0;
  }

  canMatchBeFinished() {
    return ((this.match.matchStatus == MatchStatus.FOURTH_QUARTER || this.match.matchStatus == MatchStatus.OVERTIME)
      && this.match.teamAScore != this.match.teamBScore);
  }

  addLastStat(lastStat: LastStat) {
    this.isFinishConfirmNeeded = true;
    if (this.lastAddedStats.length < 10) {
      this.lastAddedStats.push(lastStat);
    } else if (this.lastAddedStats.length >= 10) {
      this.lastAddedStats.shift();
      this.lastAddedStats.push(lastStat);
    }
  }

  undoLastStat() {
    this.isFinishConfirmNeeded = true;
    const lastStat = this.lastAddedStats.pop();
    if (lastStat.statType == StatType.PA2) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pa2--;
            if(lastStat.quantity > 0) {
              ps.pm2--;
              ps.pts -= 2;
              this.match.teamAScore -= 2;
            }
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pa2--;
            if(lastStat.quantity > 0) {
              ps.pm2--;
              ps.pts -= 2;
              this.match.teamBScore -= 2;
            }
          }
        });
      }
    } else if (lastStat.statType == StatType.PA3) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pa3--;
            if(lastStat.quantity > 0) {
              ps.pm3--;
              ps.pts -= 3;
              this.match.teamAScore -= 3;
            }
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pa3--;
            if(lastStat.quantity > 0) {
              ps.pm3--;
              ps.pts -= 3;
              this.match.teamBScore -= 3;
            }
          }
        });
      }
    } else if (lastStat.statType == StatType.FTA) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.fta--;
            if(lastStat.quantity > 0) {
              ps.ftm--;
              ps.pts -= 1;
              this.match.teamAScore -= 1;
            }
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.fta--;
            if(lastStat.quantity > 0) {
              ps.ftm--;
              ps.pts -= 3;
              this.match.teamBScore -= 3;
            }
          }
        });
      }
    } else if (lastStat.statType == StatType.ASSIST) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.ast--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.ast--;
          }
        });
      }
    } else if (lastStat.statType == StatType.OFF_REB) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.offr--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.offr--;
          }
        });
      }
    } else if (lastStat.statType == StatType.DEF_REB) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.defr--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.defr--;
          }
        });
      }
    } else if (lastStat.statType == StatType.FOUL) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pf--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.pf--;
          }
        });
      }
    } else if (lastStat.statType == StatType.FOUL_DRAWN) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.fd--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.fd--;
          }
        });
      }
    } else if (lastStat.statType == StatType.TURNOVER) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.tov--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.tov--;
          }
        });
      }
    } else if (lastStat.statType == StatType.STEAL) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.stl--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.stl--;
          }
        });
      }
    } else if (lastStat.statType == StatType.BLOCK) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.blkm--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.blkm--;
          }
        });
      }
    } else if (lastStat.statType == StatType.BLOCK_GOT) {
      if (lastStat.teamId == this.match.teamA.id) {
        this.teamAStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.blkg--;
          }
        });
      } else if (lastStat.teamId == this.match.teamB.id) {
        this.teamBStats.forEach(ps => {
          if (ps.player.id == lastStat.playerId) {
            ps.blkg--;
          }
        });
      }
    }
  }

  openTeamASubSelect(event: MouseEvent, teamAPlayer: Player) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    const teamASubs = this.teamAPlayersSubs.filter(ps => this.getFoulsOfTeamAPlayer(ps.id) < 5);
    this.contextMenu.menuData = { 'item': { player: teamAPlayer, subs: teamASubs } };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  openTeamBSubSelect(event: MouseEvent, teamBPlayer: Player) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    const teamBSubs = this.teamBPlayersSubs.filter(ps => this.getFoulsOfTeamBPlayer(ps.id) < 5);
    this.contextMenu.menuData = { 'item': { player: teamBPlayer, subs: teamBSubs } };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  swapItemsOfArray(array: any[], aIndex: number, bIndex: number) {
    array[aIndex] = array.splice(bIndex, 1, array[aIndex])[0];
    return array;
  }

  makeSubstituteForTeamA(player: Player, sub: Player) {
    this.isFinishConfirmNeeded = true;
    const playerIndex = this.teamAPlayersOnCourt.indexOf(player);
    const subIndex = this.teamAPlayersSubs.indexOf(sub);

    const playerGoingOnCourt = this.teamAPlayersOnCourt.slice(playerIndex, playerIndex+1)[0];
    const playerGoingToSub = this.teamAPlayersSubs.slice(subIndex, subIndex+1)[0];
    this.teamAPlayersSubs.fill(playerGoingOnCourt, subIndex, subIndex+1);
    delete this.teamAPlayersOnCourtHashSet[player.id];
    this.teamAPlayersOnCourt.fill(playerGoingToSub, playerIndex, playerIndex+1);
    this.teamAPlayersOnCourtHashSet[sub.id] = true;

    this.swapItemsOfArray(this.teamAStats, playerIndex, subIndex+5);
  }

  makeSubstituteForTeamB(player: Player, sub: Player) {
    this.isFinishConfirmNeeded = true;
    const playerIndex = this.teamBPlayersOnCourt.indexOf(player);
    const subIndex = this.teamBPlayersSubs.indexOf(sub);

    const playerGoingOnCourt = this.teamBPlayersOnCourt.slice(playerIndex, playerIndex+1)[0];
    const playerGoingToSub = this.teamBPlayersSubs.slice(subIndex, subIndex+1)[0];
    this.teamBPlayersSubs.fill(playerGoingOnCourt, subIndex, subIndex+1);
    delete this.teamBPlayersOnCourtHashSet[player.id];
    this.teamBPlayersOnCourt.fill(playerGoingToSub, playerIndex, playerIndex+1);
    this.teamBPlayersOnCourtHashSet[sub.id] = true;

    this.swapItemsOfArray(this.teamBStats, playerIndex, subIndex+5);
  }

  choosePointsToAddToTeamA(shootType: ShootType, scored: boolean) {
    this.teamAPointsToAdd = new PointStat();
    this.teamAPointsToAdd.shootType = shootType;
    this.teamAPointsToAdd.scored = scored;
  }

  choosePointsToAddToTeamB(shootType: ShootType, scored: boolean) {
    this.teamBPointsToAdd = new PointStat();
    this.teamBPointsToAdd.shootType = shootType;
    this.teamBPointsToAdd.scored = scored;
  }

  addPointsToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        if (this.teamAPointsToAdd && this.teamAPointsToAdd.scored) {
          if (this.teamAPointsToAdd.shootType == ShootType.PA2) {
            ps.pa2++;
            ps.pm2++;
            ps.pts += 2;
            this.match.teamAScore += 2;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.PA2, 2, ps.player.number));
          } else if (this.teamAPointsToAdd.shootType == ShootType.PA3) {
            ps.pa3++;
            ps.pm3++;
            ps.pts += 3;
            this.match.teamAScore += 3;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.PA3, 3, ps.player.number));
          } else if (this.teamAPointsToAdd.shootType == ShootType.FTA) {
            ps.fta++;
            ps.ftm++;
            ps.pts += 1;
            this.match.teamAScore += 1;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.FTA, 1, ps.player.number));
          }
        } else if ((this.teamAPointsToAdd && !this.teamAPointsToAdd.scored)) {
          if (this.teamAPointsToAdd.shootType == ShootType.PA2) {
            ps.pa2++;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.PA2, 0, ps.player.number));
          } else if (this.teamAPointsToAdd.shootType == ShootType.PA3) {
            ps.pa3++;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.PA3, 0, ps.player.number));
          } else if (this.teamAPointsToAdd.shootType == ShootType.FTA) {
            ps.fta++;
            this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.FTA, 0, ps.player.number));
          }
        }
      }
    });
    this.teamAPointsToAdd = undefined;
  }

  addPointsToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        if (this.teamBPointsToAdd && this.teamBPointsToAdd.scored) {
          if (this.teamBPointsToAdd.shootType == ShootType.PA2) {
            ps.pa2++;
            ps.pm2++;
            ps.pts += 2;
            this.match.teamBScore += 2;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.PA2, 2, ps.player.number));
          } else if (this.teamBPointsToAdd.shootType == ShootType.PA3) {
            ps.pa3++;
            ps.pm3++;
            ps.pts += 3;
            this.match.teamBScore += 3;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.PA3, 3, ps.player.number));
          } else if (this.teamBPointsToAdd.shootType == ShootType.FTA) {
            ps.fta++;
            ps.ftm++;
            ps.pts += 1;
            this.match.teamBScore += 1;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.FTA, 1, ps.player.number));
          }
        } else if ((this.teamBPointsToAdd && !this.teamBPointsToAdd.scored)) {
          if (this.teamBPointsToAdd.shootType == ShootType.PA2) {
            ps.pa2++;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.PA2, 0, ps.player.number));
          } else if (this.teamBPointsToAdd.shootType == ShootType.PA3) {
            ps.pa3++;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.PA3, 0, ps.player.number));
          } else if (this.teamBPointsToAdd.shootType == ShootType.FTA) {
            ps.fta++;
            this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.FTA, 0, ps.player.number));
          }
        }
      }
    });
    this.teamBPointsToAdd = undefined;
  }

  addAssistToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.ast++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.ASSIST, 1, ps.player.number));
      }
    });
  }

  addAssistToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.ast++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.ASSIST, 1, ps.player.number));
      }
    });
  }

  addOffRebToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.offr++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.OFF_REB, 1, ps.player.number));
      }
    });
  }

  addOffRebToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.offr++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.OFF_REB, 1, ps.player.number));
      }
    });
  }

  addDefRebToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.defr++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.DEF_REB, 1, ps.player.number));
      }
    });
  }

  addDefRebToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.defr++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.DEF_REB, 1, ps.player.number));
      }
    });
  }

  addFoulToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.pf++;
        if(this.teamAFouls < 5) {
          this.teamAFouls++;
        }
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.FOUL, 1, ps.player.number));
      }
    });
  }

  addFoulToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.pf++;
        if(this.teamBFouls < 5) {
          this.teamBFouls++;
        }
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.FOUL, 1, ps.player.number));
      }
    });
  }

  addFoulDrawnToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.fd++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.FOUL_DRAWN, 1, ps.player.number));
      }
    });
  }

  addFoulDrawnToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.fd++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.FOUL_DRAWN, 1, ps.player.number));
      }
    });
  }

  addTurnoverToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.tov++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.TURNOVER, 1, ps.player.number));
      }
    });
  }

  addTurnoverToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.tov++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.TURNOVER, 1, ps.player.number));
      }
    });
  }

  addStealToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.stl++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.STEAL, 1, ps.player.number));
      }
    });
  }

  addStealToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.stl++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.STEAL, 1, ps.player.number));
      }
    });
  }

  addBlockToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.blkm++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.BLOCK, 1, ps.player.number));
      }
    });
  }

  addBlockToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.blkm++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.BLOCK, 1, ps.player.number));
      }
    });
  }

  addBlockGotToTeamAPlayer(playerId: number) {
    this.teamAStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.blkg++;
        this.addLastStat(new LastStat(this.match.teamA.id, ps.player.id, StatType.BLOCK_GOT, 1, ps.player.number));
      }
    });
  }

  addBlockGotToTeamBPlayer(playerId: number) {
    this.teamBStats.forEach(ps => {
      if (ps.player.id == playerId) {
        ps.blkg++;
        this.addLastStat(new LastStat(this.match.teamB.id, ps.player.id, StatType.BLOCK_GOT, 1, ps.player.number));
      }
    });
  }

  initDataForNextQuarter() {
    this.saveMatchStatsToLocally(true);

    this.teamAFouls = 0;
    this.teamBFouls = 0;
  }

  finishQuarter() {
    if(this.isFinishConfirmNeeded) {
      this.showToast('Wciśnij przycisk ponownie by potwierdzić',
        this.canMatchBeFinished() ? 'Czy na pewno chcesz zakończyć mecz?' :'Czy na pewno chcesz zakończyć kwartę?',
        'info',
        false,
        'bottom-end',
        4000);
      this.isFinishConfirmNeeded = false;
    } else {
      let quarterTeamAPlayerStats: PlayerStats[] = [];
      let quarterTeamBPlayerStats: PlayerStats[] = [];
      if (this.startingQuarterStats.length > 0) {
        for (let teamAPlayerStat of this.teamAStats) {
          let tempQuarterTeamAPlayerStats = new PlayerStats(teamAPlayerStat.player);
          let tempStartingQuarterTeamAPlayerStats =
            this.startingQuarterStats.find(sqs => sqs.player.id == teamAPlayerStat.player.id);
          tempQuarterTeamAPlayerStats.blkm = teamAPlayerStat.blkm - tempStartingQuarterTeamAPlayerStats.blkm;
          tempQuarterTeamAPlayerStats.stl = teamAPlayerStat.stl - tempStartingQuarterTeamAPlayerStats.stl;
          tempQuarterTeamAPlayerStats.tov = teamAPlayerStat.tov - tempStartingQuarterTeamAPlayerStats.tov;
          tempQuarterTeamAPlayerStats.defr = teamAPlayerStat.defr - tempStartingQuarterTeamAPlayerStats.defr;
          tempQuarterTeamAPlayerStats.offr = teamAPlayerStat.offr - tempStartingQuarterTeamAPlayerStats.offr;
          tempQuarterTeamAPlayerStats.pf = teamAPlayerStat.pf - tempStartingQuarterTeamAPlayerStats.pf;
          tempQuarterTeamAPlayerStats.ast = teamAPlayerStat.ast - tempStartingQuarterTeamAPlayerStats.ast;
          tempQuarterTeamAPlayerStats.pm2 = teamAPlayerStat.pm2 - tempStartingQuarterTeamAPlayerStats.pm2;
          tempQuarterTeamAPlayerStats.blkg = teamAPlayerStat.blkg - tempStartingQuarterTeamAPlayerStats.blkg;
          tempQuarterTeamAPlayerStats.eff = teamAPlayerStat.eff - tempStartingQuarterTeamAPlayerStats.eff;
          tempQuarterTeamAPlayerStats.fd = teamAPlayerStat.fd - tempStartingQuarterTeamAPlayerStats.fd;
          tempQuarterTeamAPlayerStats.fta = teamAPlayerStat.fta - tempStartingQuarterTeamAPlayerStats.fta;
          tempQuarterTeamAPlayerStats.ftm = teamAPlayerStat.ftm - tempStartingQuarterTeamAPlayerStats.ftm;
          tempQuarterTeamAPlayerStats.pa2 = teamAPlayerStat.pa2 - tempStartingQuarterTeamAPlayerStats.pa2;
          tempQuarterTeamAPlayerStats.pa3 = teamAPlayerStat.pa3 - tempStartingQuarterTeamAPlayerStats.pa3;
          tempQuarterTeamAPlayerStats.pm3 = teamAPlayerStat.pm3 - tempStartingQuarterTeamAPlayerStats.pm3;
          tempQuarterTeamAPlayerStats.pts = teamAPlayerStat.pts - tempStartingQuarterTeamAPlayerStats.pts;

          quarterTeamAPlayerStats.push(tempQuarterTeamAPlayerStats);
        }

        for (let teamBPlayerStat of this.teamBStats) {
          this.showSaveLoader = true;
          let tempQuarterTeamBPlayerStats = new PlayerStats(teamBPlayerStat.player);
          let tempStartingQuarterTeamBPlayerStats =
            this.startingQuarterStats.find(sqs => sqs.player.id == teamBPlayerStat.player.id);
          tempQuarterTeamBPlayerStats.blkm = teamBPlayerStat.blkm - tempStartingQuarterTeamBPlayerStats.blkm;
          tempQuarterTeamBPlayerStats.stl = teamBPlayerStat.stl - tempStartingQuarterTeamBPlayerStats.stl;
          tempQuarterTeamBPlayerStats.tov = teamBPlayerStat.tov - tempStartingQuarterTeamBPlayerStats.tov;
          tempQuarterTeamBPlayerStats.defr = teamBPlayerStat.defr - tempStartingQuarterTeamBPlayerStats.defr;
          tempQuarterTeamBPlayerStats.offr = teamBPlayerStat.offr - tempStartingQuarterTeamBPlayerStats.offr;
          tempQuarterTeamBPlayerStats.pf = teamBPlayerStat.pf - tempStartingQuarterTeamBPlayerStats.pf;
          tempQuarterTeamBPlayerStats.ast = teamBPlayerStat.ast - tempStartingQuarterTeamBPlayerStats.ast;
          tempQuarterTeamBPlayerStats.pm2 = teamBPlayerStat.pm2 - tempStartingQuarterTeamBPlayerStats.pm2;
          tempQuarterTeamBPlayerStats.blkg = teamBPlayerStat.blkg - tempStartingQuarterTeamBPlayerStats.blkg;
          tempQuarterTeamBPlayerStats.eff = teamBPlayerStat.eff - tempStartingQuarterTeamBPlayerStats.eff;
          tempQuarterTeamBPlayerStats.fd = teamBPlayerStat.fd - tempStartingQuarterTeamBPlayerStats.fd;
          tempQuarterTeamBPlayerStats.fta = teamBPlayerStat.fta - tempStartingQuarterTeamBPlayerStats.fta;
          tempQuarterTeamBPlayerStats.ftm = teamBPlayerStat.ftm - tempStartingQuarterTeamBPlayerStats.ftm;
          tempQuarterTeamBPlayerStats.pa2 = teamBPlayerStat.pa2 - tempStartingQuarterTeamBPlayerStats.pa2;
          tempQuarterTeamBPlayerStats.pa3 = teamBPlayerStat.pa3 - tempStartingQuarterTeamBPlayerStats.pa3;
          tempQuarterTeamBPlayerStats.pm3 = teamBPlayerStat.pm3 - tempStartingQuarterTeamBPlayerStats.pm3;
          tempQuarterTeamBPlayerStats.pts = teamBPlayerStat.pts - tempStartingQuarterTeamBPlayerStats.pts;

          quarterTeamBPlayerStats.push(tempQuarterTeamBPlayerStats);
        }
      }

      const matchQuarterStatsToSaveRequest =
        new MatchQuarterStatsSaveRequest(this.match.id, this.quarter,
          this.startingQuarterStats.length > 0 ? quarterTeamAPlayerStats : this.teamAStats,
          this.startingQuarterStats.length > 0 ? quarterTeamBPlayerStats : this.teamBStats,);
      this.matchService.saveMatchQuarterStats(matchQuarterStatsToSaveRequest).subscribe(res => {
        if (this.quarter == 1) {
          this.match.matchStatus = MatchStatus.SECOND_QUARTER;
          this.matchService.updateMatch(this.match).subscribe(res => {
            this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
              'Rozpoczęto drugą kwartę spotkania!',
              'success',
              false,
              'bottom-end',
              6000);
            this.initDataForNextQuarter();
            this.router.navigate(['/match', 'progress', this.match.id, 2]);
          });
        } else if (this.quarter == 2) {
          this.match.matchStatus = MatchStatus.THIRD_QUARTER;
          this.matchService.updateMatch(this.match).subscribe(res => {
            this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
              'Rozpoczęto trzecią kwartę spotkania!',
              'success',
              false,
              'bottom-end',
              6000);
            this.initDataForNextQuarter();
            this.router.navigate(['/match', 'progress', this.match.id, 3]);
          });
        } else if (this.quarter == 3) {
          this.match.matchStatus = MatchStatus.FOURTH_QUARTER;
          this.matchService.updateMatch(this.match).subscribe(res => {
            this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
              'Rozpoczęto czwarta kwartę spotkania!',
              'success',
              false,
              'bottom-end',
              6000);
            this.initDataForNextQuarter();
            this.router.navigate(['/match', 'progress', this.match.id, 4]);
          });
        } else if (this.quarter == 4) {
          if (this.canMatchBeFinished()) {
            this.match.matchStatus = MatchStatus.DONE;
            this.matchService.updateMatch(this.match).subscribe(res => {
              this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
                'Mecz został zakończony!',
                'success',
                false,
                'bottom-end',
                6000);
              localStorage.removeItem('teamAStatsForMatchInProgress');
              localStorage.removeItem('teamBStatsForMatchInProgress');
              this.router.navigate(['/schedule', 'match', this.match.id]);
            });
          } else {
            this.match.matchStatus = MatchStatus.OVERTIME;
            this.matchService.updateMatch(this.match).subscribe(res => {
              this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
                'Rozpoczęto dogrywkę!',
                'success',
                false,
                'bottom-end',
                6000);
              this.initDataForNextQuarter();
              this.router.navigate(['/match', 'progress', this.match.id, 5]);
            });
          }
        } else if (this.quarter > 4) {
          if (this.canMatchBeFinished()) {
            this.match.matchStatus = MatchStatus.DONE;
            this.matchService.updateMatch(this.match).subscribe(res => {
              this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
                'Mecz został zakończony!',
                'success',
                false,
                'bottom-end',
                6000);
              localStorage.removeItem('teamAStatsForMatchInProgress');
              localStorage.removeItem('teamBStatsForMatchInProgress');
              this.router.navigate(['/schedule', 'match', this.match.id]);
            });
          } else {
            this.showToast('Nastąpiła pomyślna synchronizacja z bazą danych',
              'Rozpoczęto kolejną dogrywkę!',
              'success',
              false,
              'bottom-end',
              6000);
            this.initDataForNextQuarter();
            this.router.navigate(['/match', 'progress', this.match.id, 5]);
          }
        }
        this.showSaveLoader = false;
      }, error => {
        this.showToast('Spróbuj ponownie',
          'Statystki kwarty nie zostały zapisane!',
          'danger',
          false,
          'bottom-end',
          6000);
        this.showSaveLoader = false;
      });
    }
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }
}
