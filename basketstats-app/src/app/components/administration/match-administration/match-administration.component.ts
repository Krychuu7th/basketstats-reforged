import { Component, OnInit } from '@angular/core';
import { delay } from "rxjs/operators";
import { League } from "../../../models/league.model";
import { User } from "../../../models/user";
import { LeagueService } from "../../league/league.service";
import { MatchService } from "../../schedule/match.service";
import { UserService } from "../user-list/user.service";

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
    this.leagueService.getAllLeagues().pipe(delay(400)).subscribe(data => {
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
