import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerErrors } from '../../subAdmin/server-error';
import { ClientService } from '../client.service';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { ClientDataDetails } from '../client.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-modify',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './client-modify.component.html',
  styleUrl: './client-modify.component.scss'
})
export class ClientModifyComponent {
  clientUpdateForm: FormGroup;

  // code:any;
  submitted = false;
  isLoading =false;
  isBodyLoading=false;
  agent:any
 serverErrors:ServerErrors |null= null;
  getId:any;
  options: { label: string; value: string }[] = [];
  constructor(
              private clientService: ClientService,
              private fb:FormBuilder,
              private router:Router,
              private route:ActivatedRoute,
              private autoGenerate:AutoGeneratePasswordService,
              private toastrService:ToastrService
            ) { 
            }

  ngOnInit(): void {
    this.modifyFormValidator();
    this.loadClientData();
  }

  loadClientData(){
    this.getId = this.route.snapshot.paramMap.get('id');
    this.clientService.getSingleClientData(this.getId).subscribe({
      next: (res: any) => {  
        console.log(res)            
        this.populateClientForm(res.client);
        this.agent =res.agent;
        this.updateValidators(); // Update validators after form is populated
      }
    });
  }

  modifyFormValidator(){
    this.clientUpdateForm = this.fb.group({
      code: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      mc: ['', [Validators.required, Validators.min(0)]],
      sc: ['', [Validators.required, Validators.min(0)]],
      cc: ['', [Validators.required, Validators.min(0)]],
      casinoCheck: [true],
      status: [true],
      shareAgent: ['', [Validators.required, Validators.min(0)]],
      casinoShareAgent: ['', [Validators.required, Validators.min(0)]],
      mobAppCharge:[''],
      mcAgent: [''],
      scAgent: [''],
      ccAgent: ['']
      // shareStatus: [true],
      // shareMaster: [''],
      // casinoShareMaster: [''],
    });

  }

  populateClientForm(data:any){
    if (this.clientUpdateForm) {
      this.clientUpdateForm.patchValue({
        code: data.code,
        name: data.name,
        reference: data.reference,
        password: data.password,
        contactNo: data.contactNo,
        mc: data.mc,
        sc: data.sc,
        cc: data.cc,
        casinoCheck: data.casinoCheck,
        status:data.casinoCheck,
        shareAgent: data.shareAgent,
        casinoShareAgent: data.casinoShareAgent,
        mobAppCharge:data.shareMaster,
        mcAgent:data.mcAgent,
        scAgent:data.scAgent,
        ccAgent:data.ccAgent

      });
    }
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.clientUpdateForm.value)
    if (this.clientUpdateForm.valid) {
      const formData = this.clientUpdateForm.value;
      this.isLoading = true;
      this.clientService.updateClient(this.getId,formData).subscribe({
        next:(res:any)=>{
            this.router.navigate(['/client']);
            this.isLoading = false;
            this.toastrService.show('Success','Data update Successfully',{ progressBar: true });

        },
        error: (err:any) => {
          console.log("Error updating data:", err);
          this.isLoading=false
          try {
           const serverError = JSON.parse(err.message);
           this.serverErrors = serverError;
         } catch (err) {
           console.error('Error parsing server error:', err);
           this.toastrService.error('An unexpected error occurred.');
         }
      }
      });
  }
}
  generatePassword(){
   const randomPassword = this.autoGenerate.generateRandomPassword(8);
   this.clientUpdateForm?.get('password')?.setValue(randomPassword);
 }

 private updateValidators() {
  if (this.agent) {
    this.clientUpdateForm.get('share')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.share)]);
    this.clientUpdateForm.get('casinoShare')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.casinoShare)]);
    this.clientUpdateForm.get('mc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.mc)]);
    this.clientUpdateForm.get('sc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.sc)]);
    this.clientUpdateForm.get('cc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.cc)]);

    // Call this to ensure the form is updated correctly
    this.clientUpdateForm.updateValueAndValidity();
  }
}
}
