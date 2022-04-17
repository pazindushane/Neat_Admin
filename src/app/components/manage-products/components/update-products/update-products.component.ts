import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ItemsService} from "../../services/items.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {componentDTO} from "../../dto/componentDTO";
import {updateDTO} from "../../dto/updateDTO";

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  UpdateItemsFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any

  constructor(private http: HttpClient,
              private itemsservice : ItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<UpdateProductsComponent>,) { }

  ngOnInit(): void {
    this.UpdateItemsFrom = new FormGroup({
      product_name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      image_path: new FormControl('', [
        Validators.required,
      ]),
      pan_size: new FormControl('', [
        Validators.required,
      ]),
      dimension: new FormControl('', [
        Validators.required
      ]),
      netweight: new FormControl('', [
        Validators.required
      ]),
      power_supply: new FormControl('', [
        Validators.required
      ]),
      status: new FormControl('', [
        Validators.required
      ]),
      category_name: new FormControl('', [
        Validators.required
      ]),
    });

    console.log(this.data);

    this.UpdateItemsFrom.setValue({
      product_name: this.data.product_name.value,
      description: this.data.description.value,
      image_path: this.data.image_path.value,
      pan_size: this.data.pan_size.value,
      dimension: this.data.dimension.value,
      netweight: this.data.netweight.value,
      power_supply: this.data.power_supply.value,
      status: this.data.status.value,
      category_name: this.data.category_name.value,
    });
  }

  saveItem(form: HTMLFormElement) {
    this.itemsservice.updateComponents(new updateDTO(
      this.UpdateItemsFrom.get('product_name')?.value,
      this.UpdateItemsFrom.get('description')?.value,
      this.UpdateItemsFrom.get('image_path')?.value,
      this.UpdateItemsFrom.get('pan_size')?.value,
      this.UpdateItemsFrom.get('dimension')?.value,
      this.UpdateItemsFrom.get('netweight')?.value,
      this.UpdateItemsFrom.get('power_supply')?.value,
      this.UpdateItemsFrom.get('status')?.value,
      this.UpdateItemsFrom.get('category_name')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        this.dialogRef.close();
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Product '+this.data.product_name.value+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Product '+this.data.product_name.value+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Product '+this.data.product_name.value+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Product '+this.data.product_name.value+' Is Not Updated');
          }
        });
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
    const approval5 = this.dialog.open(DialogsComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Product '+this.data.product_name.value+' Is Not Updated')
    });
    approval5.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Product '+this.data.product_name.value+' Is Not Updated');
      }
    });
  }

  resetForm() {

  }
}
