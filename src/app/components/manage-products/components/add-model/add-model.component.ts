import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {componentDTO} from "../../dto/componentDTO";
import {ItemsService} from "../../services/items.service";
import {ModelDTO} from "../../dto/ModelDTO";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  UpdateModelsFrom!: FormGroup;
  apiResponse!: false;

  constructor(public dialogRef: MatDialogRef<AddModelComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private itemsservice: ItemsService
              ) { }

  ngOnInit(): void {
    this.UpdateModelsFrom = new FormGroup({
      model_name: new FormControl('', [
        Validators.required
      ]),
      capacity: new FormControl('', [
        Validators.required
      ]),
      readability: new FormControl('', [
        Validators.required
      ]),
      calibration_weight: new FormControl('', [
        Validators.required
      ]),
      product_name: new FormControl('', [
        Validators.required,
      ])
    });

    this.UpdateModelsFrom.setValue({
      model_name: '',
      capacity: '',
      readability: '',
      calibration_weight: '',
      product_name: this.data.product_name.value,
    });
  }

  saveModel() {
    this.itemsservice.addModel(new ModelDTO(
      this.UpdateModelsFrom.get('model_name')?.value,
      this.UpdateModelsFrom.get('capacity')?.value,
      this.UpdateModelsFrom.get('readability')?.value,
      this.UpdateModelsFrom.get('calibration_weight')?.value,
      this.UpdateModelsFrom.get('product_name')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Model Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Model Added Successfully');
            this.UpdateModelsFrom.setValue({
              model_name: '',
              capacity: '',
              readability: '',
              calibration_weight: '',
              product_name: this.data.product_name.value,
            });
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Model Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Model Add Unsuccessful');
          }
        });
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
    const approval4 = this.dialog.open(DialogsComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Model Is Not Added')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Model Is Not Added');
      }
    });
  }
}
