import { Component, OnInit } from '@angular/core';
import {PostsService} from "../services/posts.service";
import {AuthService} from "../../@core/shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-other-posts',
  templateUrl: './other-posts.component.html',
  styleUrls: ['./other-posts.component.scss', '../personal-posts/personal-posts.component.scss']
})
export class OtherPostsComponent implements OnInit {
  // All other post details info
  allOtherPostsDetails: any = [];
  // User identifier
  userId: number | undefined;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService._getUserId();
    this.getOtherPosts()
  }

  //  Business logic
  getOtherPosts(){
    if(this.userId != undefined) {
      this.postsService.getAllPosts().subscribe((response) => {
        if(response.status === 200) {
          if(response.body.length >= 1){
            this.allOtherPostsDetails = response.body.filter((posts:any)=> posts.userId != this.userId);
            let uniqueUserIds = [...new Set(this.allOtherPostsDetails.map((posts: any) => posts.userId ))];
            // @ts-ignore
            uniqueUserIds.forEach((userIdNumber: number)=>{
              this.getUserInformation(userIdNumber)
            })
          }else{
            this.toastrService.error('No data found');
          }
        }else{
          this.toastrService.error('Sorry trouble while getting data');
        }
      });
    }else{
      this.toastrService.error('Sorry please try again');
    }
  }


  // get auther full name
  getUserInformation(userId: number) {
    this.postsService.getUserInformation(userId).subscribe((response:any) => {
      if(response.status === 200){
        if(response.body.length >= 1) {
          this.allOtherPostsDetails.forEach((postDetails:any)=>{
            if(postDetails.userId === response.body[0].id){
              postDetails.fullName = response.body[0].name;
            }
          })
        }else {
          this.toastrService.error('No user data found');
        }
      }else{
        this.toastrService.error('Sorry please try again');
      }
    })
  }

}
