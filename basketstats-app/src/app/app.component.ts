import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isXSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  toogleSidebar() {
    // this.nbSidebarService.toggle(false);
  }

  ngOnInit(): void {
    // this.nbAuthService.isAuthenticatedOrRefresh().subscribe(res => {
    // });
  }
}
