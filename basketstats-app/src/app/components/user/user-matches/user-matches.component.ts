import {Component, OnInit} from '@angular/core';
import {League} from "../../../models/league";
import {LeagueService} from "../../league/league.service";
import {delay, first, takeUntil} from "rxjs/operators";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {User} from "../../../models/user";
import {Subject} from "rxjs";
import {UserService} from "../../administration/user-list/user.service";

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matches.component.html',
  styleUrls: ['./user-matches.component.css']
})
export class UserMatchesComponent implements OnInit {

  isLoading = false;

  leagueList: League[];

  private destroy$: Subject<void> = new Subject<void>();
  username: string;
  user: User;

  constructor(
    private leagueService: LeagueService,
    private authService: NbAuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadLoggedUserInfo();
    this.loadLeagues();
  }

  loadLoggedUserInfo() {
    this.authService.getToken().pipe(first())
      .subscribe((token: NbAuthJWTToken) => {
        if(token.isValid()){
          this.username = token.getPayload().sub;

          this.userService.getUserByUsername(this.username)
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: User) => {
              this.user = user;
            });
        }
      });
  }

  loadLeagues() {
    this.isLoading = true;
    this.leagueService.getLeagueList().pipe(delay(400)).subscribe(data => {
      this.leagueList = data;
      this.isLoading = false;
    });
  }

}
