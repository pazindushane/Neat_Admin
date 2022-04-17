import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApprovalDialogConfig} from "./model/ApprovalDialogConfig";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  style = 'confirm';
  dialogType: string;
  title = '';
  message: string;
  btnAccept = '';
  btnUnaccepted = '';
  image: any;
  constructor(public dialogRef: MatDialogRef<DialogsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ApprovalDialogConfig) {
    this.dialogType = data.dialogType;
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
    if (this.dialogType === 'Alert') {
      this.image = '../../../assets/img/checked.png';
      this.btnAccept = 'OK';
      this.style = 'alerts';
    }else if (this.dialogType === 'Delete'){
      this.image = '../../../assets/img/exclamation-mark.png';
      this.btnAccept = 'Yes';
      this.btnUnaccepted = 'No';
      this.style = 'delete';
    }else if ('Confirm' === this.dialogType){
      this.image = '../../../assets/img/1636047.png';
      this.btnAccept = 'Yes';
      this.btnUnaccepted = 'No';
      this.style = 'confirm';
    }else if (this.dialogType === 'Error'){
      this.image = '../../../assets/img/exclamation-mark.png';
      this.btnAccept = 'OK';
      this.style = 'error';
    }else {
      console.log('e');
    }    }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
