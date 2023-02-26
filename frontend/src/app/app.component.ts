import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { EmployeeComponent } from './dialogs/employee/employee.component';
import { ViewEmployeeComponent } from './dialogs/view-employee/view-employee.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<[]>();

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    try {
      this.employeeService.getEmployees().subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource<[]>(res.data);
        },
        error: (e) => {
          this.toastr.error(e.error.message);
        }
      })
    } catch (e) {
      console.log('Still loading...');
    }
  }

  openEmployeeDiakog(employeeId?: string) {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      data: {
        _id: employeeId
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  openEmployeeViewer(employeeId: string) {
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: {
        _id: employeeId
      },
      disableClose: true,
    });
  }

  deleteEmployee(employeeId: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        message: 'Employee'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        const data = { _id: employeeId };
        this.employeeService.deleteEmployee(data).subscribe({
          next: (res: any) => {
            this.toastr.success(res.message);
            this.getEmployees();
          },
          error: (e) => {
            this.toastr.error(e.error.message);
          }
        });
      }
    });
  }
}
