import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {LeagueService} from "../../league/league.service";
import {League} from "../../../models/league";
import {MatchService} from "../../schedule/match.service";
import {UserService} from "../user-list/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-match-administration',
  templateUrl: './match-administration.component.html',
  styleUrls: ['./match-administration.component.scss']
})
export class MatchAdministrationComponent implements OnInit {

  isLoading = false;

  leagueList: League[];

  userList: User[];

  constructor(
    private leagueService: LeagueService,
    private matchService: MatchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadLeagues();
    this.loadUsers();
  }

  loadLeagues() {
    this.isLoading = true;
    this.leagueService.getLeagueList().pipe(delay(400)).subscribe(data => {
      this.leagueList = data;
      this.isLoading = false;
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getActiveUserList().pipe(delay(400)).subscribe(data => {
      this.userList = data;
      this.isLoading = false;
    });
  }

}
