import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('imagePreview', { static: false }) imagePreview!: ElementRef<HTMLImageElement> 
  @ViewChild('imageUpload', { static: false }) imageUpload!: ElementRef<HTMLInputElement> | null;

  imageUrl: string = '../../../assets/default-avatar.png';
  form!: FormGroup;
  user: any;
  profileImage: File | undefined;

  constructor(private formBuilder: FormBuilder, private userService: UserService , private router : Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z\s]+$")]],
      email: [null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]],
      newpassword: [null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      confpassword: [null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
    });

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email,
        });
      }
    });

    // Set custom validation for the 'confpassword' control only
    this.form.get('confpassword')?.setValidators([
      Validators.required,
      (control) => {
        const newPassword = this.form.get('newpassword')?.value;
        const confirmPassword = control.value;
        return newPassword === confirmPassword ? null : { mustMatch: true };
      }
    ]);
    this.form.get('confpassword')?.updateValueAndValidity();
  }

  onImageSelected(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  onFileSelected(event: any) {
    console.log('onFileSelected');
    
    this.profileImage = event.target.files[0];
    console.log( this.profileImage);
    const somthing = URL.createObjectURL(event.target.files[0])
    console.log(somthing);
    
    // if(this.imagePreview){
      this.imagePreview.nativeElement.src = URL.createObjectURL(event.target.files[0])
    // }else{
    //   console.log('elseeeee');
      
    // }
    
    console.log(this.profileImage);
  }


  onImgClicked(){
    this.imageUpload!.nativeElement.click()
  }



  onFormSubmit() {
    console.log(this.form.value);

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('image', this.imageUrl!);
      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      formData.append('password', this.form.value.newpassword);

      this.userService.update(formData).subscribe((response)=>{
        this.userService.setToken(response as string)
        this.router.navigateByUrl('/')
      })
    }
  }
}

