import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { AgentService } from '../agent.service';
import { ServerErrors } from '../../subAdmin/server-error';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agent-modify',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agent-modify.component.html',
  styleUrl: './agent-modify.component.scss'
})
export class AgentModifyComponent implements OnInit {
  agentUpdateForm: FormGroup;
  agent: any = {};
  code:any;
  submitted = false;
  isLoading = false;
  isBodyLoading = false;
  serverErrors: ServerErrors | null = null;

  getId: any;
  superId: any;
  constructor(
    private agentService: AgentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private autoGenerate: AutoGeneratePasswordService,
    private toastService:ToastrService,

  ) {}

  ngOnInit(): void {
    this.loadAgentData(); // Then load the data
    this.modifyFormValidator(); // Initialize form first
  }

  private loadAgentData(): void {
    this.getId = this.route.snapshot.paramMap.get('id');
    // this.superId = this.route.snapshot.queryParamMap.get('superId');

    if (this.getId ) {
      this.agentService.getSingleAgentData(this.getId).subscribe({
        next: (res: any) => {
          this.code = res.agent.code;
          this.populateAgentForm(res.agent);
          this.agent =res.agent;
          this.updateValidators(); // Update validators after form is populated
        },
        error: (err) => {
          console.error('Error loading agent data:', err);
        }
      });
      // this.agentService.getSingleSuper(this.superId).subscribe({
      //   next: (superData: any) => {
      //     this.agent = superData;
      //   },
      //   error: (err) => {
      //     console.error('Error loading super data:', err);
      //   }
      // });
    }
  }

  modifyFormValidator() {
    this.agentUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      share: ['', [Validators.required, Validators.min(0)]], // Validators will be updated later
      casinoShare: ['', [Validators.required, Validators.min(0)]],
      mc: ['', [Validators.required, Validators.min(0)]],
      sc: ['', [Validators.required, Validators.min(0)]],
      cc: ['', [Validators.required, Validators.min(0)]],
      mcSuper:[''],
      scSuper:[''],
      ccSuper:[''],
      casinoCheck: [''],
      status:[''],
      shareStatus:[''],
      shareSuper: [''],
      casinoShareSuper:[this.agent.casinoShare],
      mobileShareSuper: [100],
    });
  }

  populateAgentForm(data: any) {
    if (this.agentUpdateForm) {
      this.agentUpdateForm.patchValue({
        name: data.name,
        reference: data.reference,
        password: data.password,
        contactNo: data.contactNo,
        share: data.share,
        casinoShare: data.casinoShare,
        mc: data.mc,
        sc: data.sc,
        cc: data.cc,
        mcSuper:data.mcSuper,
        scSuper:data.scSuper,
        ccSuper:data.ccSuper,
        casinoCheck: data.casinoCheck,
        status:data.status,
        shareStatus: data.shareStatus,
        shareSuper:data.shareSuper,
        casinoShareSuper:data.casinoShareSuper,
      });
    }
  }

  private updateValidators() {
    if (this.agent) {
      this.agentUpdateForm.get('share')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.share)]);
      this.agentUpdateForm.get('casinoShare')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.casinoShare)]);
      this.agentUpdateForm.get('mc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.mc)]);
      this.agentUpdateForm.get('sc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.sc)]);
      this.agentUpdateForm.get('cc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.agent.cc)]);
      this.agentUpdateForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.agentUpdateForm.valid) {
      const formData = this.agentUpdateForm.value;
      console.log(this.agentUpdateForm.value)
      this.agentService.updateAgent(this.getId, formData).subscribe({
        next: () => {
          this.router.navigate(['/agent']);
          this.toastService.success('Agent updated successfully');

        },
        error: (err) => {
          console.log("Error updating data:", err);
          this.toastService.error('An unexpected error occurred.');
        }
      });
    }
  }

  generatePassword() {
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.agentUpdateForm?.get('password')?.setValue(randomPassword);
  }
}
