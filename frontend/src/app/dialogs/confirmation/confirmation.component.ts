import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  modalData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    private cdRef: ChangeDetectorRef,
  ) {
    if(data){
      this.modalData = data;
    }
  }

  ngOnInit(): void {
  }

  closeDialog(action: boolean){
    this.dialogRef.close(action);
  }

}
