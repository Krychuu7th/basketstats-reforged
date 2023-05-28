import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoaderService } from "./shared/service/loader/loader.service";

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

  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading$;
  }

  toogleSidebar() {
    // this.nbSidebarService.toggle(false);
  }
}
