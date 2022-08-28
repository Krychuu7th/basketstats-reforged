import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from "@nebular/theme";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {NbAuthService} from "@nebular/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isXSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  constructor(private nbSidebarService: NbSidebarService,
              private breakpointObserver: BreakpointObserver,
              private nbAuthService: NbAuthService
  ) { }

  toogleSidebar() {
    this.nbSidebarService.toggle(false);
  }

  ngOnInit(): void {
    this.nbAuthService.isAuthenticatedOrRefresh().subscribe( res => {
    });
  }
}
