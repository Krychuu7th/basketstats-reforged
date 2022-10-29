import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  NavigationEnd, Router, RouterEvent
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { User } from "../../../models/user";
import { UserService } from "../../administration/user-list/user.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnDestroy{

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

  ngOnInit() {
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe(() => {
      this.isAuthenticated();
      });
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
