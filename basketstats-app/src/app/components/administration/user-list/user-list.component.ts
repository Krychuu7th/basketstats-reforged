import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { delay } from "rxjs/operators";
import { User } from "../../../models/user";
import { UserAddEditComponent } from "../user-add-edit/user-add-edit.component";
import { UserDeleteConfirmComponent } from "../user-delete-confirm/user-delete-confirm.component";
import { UserService } from "./user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[];
  loggedUsername: string;

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'createDate', 'enabled'];
  dataSource: MatTableDataSource<User>;

  isLoading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.userService.getUserList().pipe(delay(300)).subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    // this.authService.onTokenChange().pipe(first())
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if (token.isValid()) {
    //       this.loggedUsername = token.getPayload().sub;
    //     }
    //   });
  }

  refreshData() {
    this.isLoading = true;
    this.userService.getUserList().pipe(delay(300)).subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    const modalRef = this.modalService.open(UserAddEditComponent);
    modalRef.componentInstance.isEdit = false;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.refreshData();
      }
    }, error => {

    });
  }

  editUser(user: User) {
    const modalRef = this.modalService.open(UserAddEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.user = user;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.refreshData();
      }
    }, error => {

    });
  }

  deleteUser(username: string, userId: number) {
    const modalRef = this.modalService.open(UserDeleteConfirmComponent);
    modalRef.componentInstance.username = username;
    modalRef.componentInstance.userId = userId;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.refreshData();
        this.refreshData();
      }
    }, error => {

    });
  }

  changeUserActive(userId: number, isActive: boolean) {
    this.userService.changeUserActive(userId).subscribe(res => {
      if (!isActive) {
        this.showToast('Konto użytkownika zostało aktywowane',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      }
      else {
        this.showToast('Konto użytkownika zostało zablokowane',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      }
    }, error => {
      if (isActive) {
        this.showToast('Nie udało się zablokować konta użytkownika',
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
        this.refreshData();
      }
      else {
        this.showToast('Nie udało się aktywować konta użytkownika',
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
        this.refreshData();
      }
    });
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

  onContextMenu(event: MouseEvent, row: User) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'row': row };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  getValue(row: any, columnName: string): any {
    return row[columnName];
  }

}
