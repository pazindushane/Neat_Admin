import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {categoryDTO} from "../../dto/categoryDTO";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  UpdateCategoryFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any

  constructor(private http: HttpClient,
              private categroyservice : CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<UpdateCategoryComponent>,) { }

  ngOnInit(): void {
    this.UpdateCategoryFrom = new FormGroup({
      category_name: new FormControl('', [
        Validators.required
      ]),
      status: new FormControl('', [
        Validators.required
      ])
    });

    console.log(this.data);

    this.UpdateCategoryFrom.setValue({
      category_name: this.data.category_name,
      status: this.data.status
    });
  }

  saveItem() {
    this.categroyservice.addProduct(new categoryDTO(
      this.UpdateCategoryFrom.get('category_name')?.value,
      this.UpdateCategoryFrom.get('status')?.value,
    )).subscribe(res=>{console.log(res)
      if (res.responseCode==='200'){
        this.dialogRef.close();
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.category_name+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.category_name+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.category_name+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.category_name+' Is Not Updated');
          }
        });
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(DialogsComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.category_name+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.category_name+' Is Not Updated');
      }
    });
  }

}
