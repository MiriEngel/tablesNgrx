import { Injectable } from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { AppStore } from '../app-store.model';
import { User } from './user.model';

export const ADD_USER = 'ADD_USER';
export const UPDATR_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

@Injectable()
export class UsersService {


  constructor(private store: Store<AppStore>) { }

  getUsers(): Observable<User[]> {
    return this.store.select('users');
  }

  initializeNewUser(): User {
    return {id: UUID.UUID(), name: ''};
  }

  // addUser(user): void {
  //   this.store.dispatch({type: ADD_USER, payload: user});
  // }

  changeUser(user,actionType): void {
    this.store.dispatch({type: actionType, payload: user});
  }

}

export const initialUsers: User[] = [
  {id: '1', name: 'Victor Wooten'},
  {id: '2', name: 'Marcus Miller'},
  {id: '3', name: 'Jaco Pastorious'}
];

export const users: ActionReducer<User[]> = (state: User[] = initialUsers, action: Action) => {

  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case UPDATR_USER:
      return state.map(user => {
                return user.id === action.payload.id ? Object.assign({}, user, action.payload): user;
            });
    case DELETE_USER:
      return state.filter(user => {
                return user.id !== action.payload.id;
            });
    default:
      return state;
  }
};
