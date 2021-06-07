import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../@core/shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Path} from "../../@core/enums";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  // Login form validation
  loginForm = new FormGroup({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  //Check mobile screen
  mobileScreen: boolean = false;

  // Default column siz
  columnValue: number = 2


  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private breakpointObserver: BreakpointObserver

  ) {
    // Check user phone size
    breakpointObserver.observe([
      '(max-width: 500px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.mobileScreen = true;
        this.columnValue = 1;
      } else {
        // if necessary:
        this.mobileScreen = false;
        this.columnValue = 2;
      }
    });
  }


  ngOnInit(): void {

  }

  onSignIn(){
    const emailValue = this.loginForm.value.emailFormControl
    this.authService.signIn(emailValue).subscribe((response)=>{
      if(response.status === 200){
        if(response.body.length >=1) {
          this.toastrService.success(`Hi, ${response.body[0].name}. Welcome back to accela :)`);
          this.authService._saveUser(response.body[0].id);
          this.router.navigate([`${Path.Home}`]);
        }else{
          this.toastrService.error("Sorry, this email is not registered with us, please sign up with us :)");
        }
      }else{
        this.toastrService.error("Sorry trouble while connecting, please try again :)");
      }
    })
  }

}
