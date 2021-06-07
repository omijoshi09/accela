import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Path} from "./@core/enums";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./@core/guards/auth.guard";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {NoAuthGuard} from "./@core/guards/no-auth.guard";

const routes: Routes = [
  {
    path: Path.Home,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: Path.SignIn,
    canActivate: [NoAuthGuard],
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
