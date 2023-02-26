import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  modalData: any;
  employeeData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewEmployeeComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ){
    this.modalData = data;
  }

  async ngOnInit() {
    await this.getDetails();
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
      this.employeeData = res.data;
    }).catch((e: any) => {
      this.closeDialog();
      this.toastr.error(e.error.message);
    });
  }

  closeDialog(action?: any){
    this.dialogRef.close(action);
  }

}
