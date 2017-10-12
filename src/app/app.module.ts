import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { UserComponent } from './users/user/user.component';
import { ItemComponent } from './items/item/item.component';
import { MyMap } from './maps/app.component';
import { UsersItemsComponent } from './users-items/users-items.component';
import { UserItemsComponent } from './users-items/user-items/user-items.component';

import {  ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import {
  UsersService,
  UsersItemsService,
  ItemsService,
  users,
  items
} from './shared';


const appRoutes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'UserList',      component: UsersComponent }];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ItemsComponent,
    UserComponent,
    ItemComponent,
    UsersItemsComponent,
    MyMap,
    UserItemsComponent,
  ],
  imports: [
     AgmCoreModule.forRoot({
      apiKey: "AIzaSyArLszxE_HT7m6fbE7qsubOShG42QxoM3Q",
      libraries: ["places"]
    }),
       RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    // MaterialModule,
    StoreModule.provideStore({users, items})
  ],
  providers: [
    UsersService,
    UsersItemsService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
