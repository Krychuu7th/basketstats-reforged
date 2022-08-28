import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Match} from "../../../models/match";
import {registerLocaleData} from "@angular/common";
import {Team} from "../../../models/team";

@Component({
  selector: 'app-match-schedule-list',
  templateUrl: './match-schedule-list.component.html',
  styleUrls: ['./match-schedule-list.component.scss']
})
export class MatchScheduleListComponent implements OnChanges {

  @Input()
  matchList: Match[];

  @Input()
  team: Team;

  lowIndex = 0;
  highIndex = 10;

  constructor() { }

  ngOnChanges(): void {
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowIndex = (event.pageIndex * event.pageSize);
    this.highIndex = this.lowIndex + event.pageSize;
    return event;
  }

  getPageByCurrentDate() {
    return 1;
  }
}
