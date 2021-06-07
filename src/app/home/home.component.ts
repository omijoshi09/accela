import { Component, OnInit } from '@angular/core';
import {AuthService} from "../@core/shared/services/auth.service";
import {Path} from "../@core/enums";
import {Router} from "@angular/router";
import {PostsService} from "./services/posts.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
  }



  logout(){
    this.authService.logoutLocal();
    this.toastrService.info('Logout Successful')
    this.router.navigate([`/${Path.SignIn}`]);
  }

}
