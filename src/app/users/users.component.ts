import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UsersService, User } from '../shared';
import { Subject }  from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$: Observable<User[]> = this.usersService.getUsers();
  shouldShowNewUser: boolean = false;
  newUser: User = this.usersService.initializeNewUser();
  curUpdateUser: User ;
  private subject: Subject<string> = new Subject();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  this.subject.debounceTime(500).subscribe(userNameValue => {
    //alert(userNameValue);
    this.usersService.changeUser(this.curUpdateUser,'UPDATE_USER');
  });
}

  toggleNewUser(): void {
    this.shouldShowNewUser = !this.shouldShowNewUser;

    if (!this.shouldShowNewUser)
      this.newUser = this.usersService.initializeNewUser();
  }

  addUser(): void {
    this.usersService.changeUser(this.newUser,'ADD_USER');
    this.newUser = this.usersService.initializeNewUser();
  }

  deleteUser($event: User): void {
    this.usersService.changeUser($event,'DELETE_USER');
  }
  
  updateUser(userNameValue, user:User){//todo: debounce
     user.name = userNameValue;
     this.curUpdateUser = user;
     this.subject.next(userNameValue);
    
  }
}
