import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  mode: string;
  allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  imageToUpload: any;
  modalData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ){
    this.modalData = data;
  }

  async ngOnInit() {
    this.initializeEmployeeForm();
    this.mode = 'add';
    if(this.modalData._id){
      this.mode = 'edit';
      await this.getDetails();
    }
  }

  initializeEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\?)|0)?[0-9]{10}$')]]
    });
  }

  getEmployeeDetails() {
    return new Promise((resolve, reject) => {
      this.employeeService.getEmployeeDetails(this.modalData._id).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e);
        },
      });
    });
  }

  async getDetails(){
    await this.getEmployeeDetails().then((res: any) => {
      this.employeeForm.patchValue({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber
      });
    }).catch((e: any) => {
      this.closeDialog();
      this.toastr.error(e.error.message);
    });
  }

  get formControls(): any {
    return this.employeeForm.controls;
  }

  fileChange(event: any) {
    if(event.target.value.length === 0){
      return;
    }
    const file = event.target.files[0];
    if (this.allowedImageTypes.indexOf(file.type) !== -1) {
      this.imageToUpload = file;
      this.employeeForm.patchValue({
        profilePicture: file
      });
    } else {
      this.employeeForm.patchValue({
        profilePicture: ''
      });
      this.toastr.error('Selected image is not allowed.');
    }
  }

  submitEmployeeForm(){
    if (this.employeeForm.invalid) {
      this.toastr.error('Form Is Invalid  ');
      return;
    }

    const formValues = this.employeeForm.value;
    const formData = new FormData();
    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    formData.append('email', formValues.email);
    formData.append('profilePicture', this.imageToUpload);
    formData.append('phoneNumber', formValues.phoneNumber);
    

    if(this.mode === 'add'){
      this.employeeService.saveEmployee(formData).subscribe({
        next: (res: any) => {
          this.closeDialog(true);
          this.toastr.success(res.message);
        },
        error: (e: any) => {
          this.toastr.error(e.error.message);
        }
      });
    }
    if(this.mode === 'edit'){
      formData.append('_id', this.modalData._id);
      this.employeeService.updateEmployee(formData).subscribe({
        next: (res: any) => {
          this.closeDialog(true);
          this.toastr.success(res.message);
        },
        error: (e: any) => {
          this.toastr.error(e.error.message);
        }
      });
    }
  }

  closeDialog(action?: any){
    this.dialogRef.close(action);
  }

}
