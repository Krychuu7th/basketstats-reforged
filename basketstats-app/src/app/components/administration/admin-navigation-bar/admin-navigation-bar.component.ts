import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminViewType} from "../../../enums/admin-view-type.enum";

@Component({
  selector: 'app-admin-navigation-bar',
  templateUrl: './admin-navigation-bar.component.html',
  styleUrls: ['./admin-navigation-bar.component.scss']
})
export class AdminNavigationBarComponent implements OnInit {

  activeViewType: AdminViewType;

  AdminViewTypeEnum = AdminViewType;

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
    route.url.subscribe(() => {
      this.activeViewType = route.snapshot.firstChild.data.adminViewType;
    });
  }

  ngOnInit() {
  }
}
