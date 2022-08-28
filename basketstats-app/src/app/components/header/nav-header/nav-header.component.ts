import {Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {filter, first, map, takeUntil} from "rxjs/operators";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterEvent, RoutesRecognized
} from "@angular/router";
import {NbAccessChecker} from "@nebular/security";
import {User} from "../../../models/user";
import {UserService} from "../../administration/user-list/user.service";
import {ViewType} from "../../../enums/view-type.enum";

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
  activeViewType: ViewType;
  ViewTypeEnum = ViewType;
  menuOpened = false;
  isLoggedIn = false;

  isXSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: NbAuthService,
              public accessChecker: NbAccessChecker,
              public userService: UserService,
              public router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe(() => {
      this.isAuthenticated();

      this.authService.onTokenChange().pipe(first())
        .subscribe((token: NbAuthJWTToken) => {
          if(token.isValid()){
            this.username = token.getPayload().sub;

            this.userService.getUserByUsername(this.username)
              .pipe(takeUntil(this.destroy$))
              .subscribe((user: User) => {
                this.user = user;
                this.userFullname = this.user.firstName;
              });
          }
        });
      });
    this.getViewType();
  }

  isAuthenticated() {
    this.authService.isAuthenticated().subscribe((result => {
      this.isLoggedIn = result;
    }));
  }

  getViewType() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.activeViewType = data.state.root.firstChild.data.viewType;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
