import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../shared/services/auth.service";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule,RouterModule, NgbAlertModule,FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  serverErrors:any={};
  validationError =false;
  isLoading =false;
  isDisable = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(private fb: FormBuilder, public router: Router,private authService:AuthService,private toastrService:ToastrService) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    
  }

  onLoggedin(e: Event) {
    this.isLoading = true;
    this.isDisable = true;
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isDisable = false;
        this.router.navigate(['/']);
      },
      error: (errorResponse) => {
        this.isLoading = false;
        this.isDisable = false;
        this.toastrService.error(errorResponse.message)
        if (errorResponse.error?.msg === 'Invalid Username or Password') {
          this.toastrService.error('Login Error', errorResponse.error.msg);
        } else if (errorResponse.status === 0) {
          // Handle network errors, timeouts, or server down issues
          this.toastrService.error('Network Error', 'Connection failed. Please check your network or try again later.');
        } else if (errorResponse.status === 500) {
          // Handle server errors
          this.toastrService.error('Server Error', 'There is an issue on the server. Please try again later.');
        } else {
          // Catch-all error for unexpected issues
          this.toastrService.error('Unexpected Error', 'Something went wrong. Please try again.');
        }
  
        // Log the error to the console
        console.error('Login Error:', errorResponse);
        this.serverErrors = errorResponse.error;
      },
    });
  }

  loginFacebook(){

  }
  loginTwitter(){

  }
  loginGoogle(){

  }
}
