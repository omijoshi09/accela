import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home.component";
import { PersonalPostsComponent } from './personal-posts/personal-posts.component';
import { OtherPostsComponent } from './other-posts/other-posts.component';
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    HomeComponent,
    PersonalPostsComponent,
    OtherPostsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
