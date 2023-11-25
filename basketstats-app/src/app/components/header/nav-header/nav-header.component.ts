import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../../models/user";
import { UserService } from "../../administration/user-list/user.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnDestroy {

  @Output() sidebarEvent = new EventEmitter<void>();

  private destroy$: Subject<void> = new Subject<void>();
  username: string;
  user: User;
  userFullname: string;
  isLoggedIn = false;

  isXSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public router: Router) {
  }

  isAuthenticated() {
    // this.authService.isAuthenticated().subscribe((result => {
    //   this.isLoggedIn = result;
    // }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
