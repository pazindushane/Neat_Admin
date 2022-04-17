import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {ImgDTO} from "../../dto/ImgDTO";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.scss']
})
export class AddImgComponent implements OnInit {
  UpdateImgesForm!: FormGroup;
  apiResponse!: false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddImgComponent>,
              private itemsservice: ItemsService) { }

  ngOnInit(): void {
    this.UpdateImgesForm = new FormGroup({
      product_name: new FormControl('', [
        Validators.required
      ]),
      image_path: new FormControl('', [
        Validators.required
      ])
    });

    this.UpdateImgesForm.setValue({
      image_path: '',
      product_name: this.data.product_name.value,
    });
  }

  onNoClick() {
    this.dialogRef.close();
    const approval4 = this.dialog.open(DialogsComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Image Is Not Added')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Image Is Not Added');
      }
    });
  }

  saveModel() {
    this.itemsservice.addImg(new ImgDTO(
      this.UpdateImgesForm.get('image_path')?.value,
      this.UpdateImgesForm.get('product_name')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Image Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Image Added Successfully');
            this.UpdateImgesForm.setValue({
              image_path: '',
              product_name: this.data.product_name.value,
            });
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Image Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Image Add Unsuccessful');
          }
        });
      }
    });
  }
}
