import {Component, OnInit, TemplateRef} from '@angular/core';
import {PostsService} from "../services/posts.service";
import {AuthService} from "../../@core/shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-personal-posts',
  templateUrl: './personal-posts.component.html',
  styleUrls: ['./personal-posts.component.scss']
})
export class PersonalPostsComponent implements OnInit {
  private userId: number | undefined;
  personalPostsInformation: any = [];

  // TO Add New Post
  // Post form validation
  addPostForm = new FormGroup({
    titleFormControl: new FormControl('', [
      Validators.required,
    ]),
    bodyFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog,

  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService._getUserId();
    this.getUserPosts()
  }

  getUserPosts() {
    if (this.userId != undefined) {
      this.postsService.getPersonalPosts(this.userId).subscribe((response) => {
        if (response.status === 200) {
          if (response.body.length >= 1) {
            this.personalPostsInformation = response.body;
          } else {
            this.toastrService.error('No personal post found')
          }
        } else {
          this.toastrService.error('Error while fetching data')
        }
      })
    } else {
      this.toastrService.error('Invalid data')
    }
  }

  openNewPostDialog(templateRef: TemplateRef<any>){
    const dialogRef = this.dialog.open(templateRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addNewPost(){
    const titleValue = this.addPostForm.value.titleFormControl;
    const bodyValue = this.addPostForm.value.bodyFormControl;
    const uniqueId = new Date().getUTCMilliseconds();
    this.personalPostsInformation.push({
      id: uniqueId,
      userId: this.userId,
      body: bodyValue,
      title: titleValue
    })
    this.toastrService.success("New post added successfully");
    this.dialog.closeAll();
  }
}
