import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {ItemsService} from "../../services/items.service";
import {MatTableDataSource} from "@angular/material/table";
import {componentDTO} from "../../dto/componentDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SystemConfig} from "../../../../util/SystemConfig";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {UpdateProductsComponent} from "../update-products/update-products.component";
import {AddModelComponent} from "../add-model/add-model.component";
import {AddImgComponent} from "../add-img/add-img.component";

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  idLoading = true;
  city: any;
  apiResponse!: false;
  itemDetailsForm!: FormGroup;
  brand: any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;
  fileObj:any
  contactList!: string[] ;
  modelList!:any[];

  constructor(private http: HttpClient,
              private itemsservice: ItemsService,
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
    this.contactList = [];
  }

  ngOnInit(): void {

    this.itemDetailsForm = new FormGroup({
      product_name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      details: new FormControl('', [
        Validators.required
      ]),
      details2: new FormControl('', [
        Validators.required
      ]),
      image_path: new FormControl('', [
        Validators.required
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
      status:new FormControl('', [
        Validators.required
      ]),
      category_name:new FormControl('', [
        Validators.required
      ])
    });

    this.filterDetailsForm = new FormGroup({
      searchKeyWord: new FormControl('', [
        Validators.required
      ]),
      filter:new FormControl('ALL'),
      stateFilter:new FormControl('ACTIVATED')
    });
    this.search.pipe(
      debounceTime(SystemConfig.getDebounceTime()),
      distinctUntilChanged())
      .subscribe(() => {
        this.searchedWords = this.filterDetailsForm.get('searchKeyWord')?.value.trim().split(' ');
        this.refreshTable();
      });
  }
  Test($event: KeyboardEvent): void {
    console.log($event);
  }


  saveItem(form: HTMLFormElement) {
    this.itemsservice.addProduct(new componentDTO(
      this.itemDetailsForm.get('product_name')?.value,
      this.itemDetailsForm.get('description')?.value,
      this.contactList,
      this.itemDetailsForm.get('image_path')?.value,
      this.itemDetailsForm.get('pan_size')?.value,
      this.itemDetailsForm.get('dimension')?.value,
      this.itemDetailsForm.get('netweight')?.value,
      this.itemDetailsForm.get('power_supply')?.value,
      this.itemDetailsForm.get('status')?.value,
      this.itemDetailsForm.get('category_name')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Product Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Product Added Successfully');
            // this.itemDetailsForm.reset();
            // this.contactList.length = 0
            this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Product Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Product Add Unsuccessful');
          }
        });
      }
    });

  }

  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['product_id', 'product_name', 'description', 'pan_size', 'dimension', 'netweight', 'power_supply','status','category_name','action'];
  dataSource: MatTableDataSource<Array<componentDTO>>;
  private allComponentsSub!: Subscription;
  private searchComponentsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;


  addContact(addNumber: HTMLInputElement): void {
    console.log(this.itemDetailsForm.get('details')?.value);
    // if ((!addNumber.validity.patternMismatch) && !this.contactList.includes(addNumber.value) && addNumber.value){
      this.contactList.push(addNumber.value);
      console.log('this.contactList.push(addNumber.value)');
      console.log(this.contactList);
      addNumber.value = '';
      this.itemDetailsForm.get('details')?.reset();
    // }
  }

  removeContact(removeNumber: string): void {
    console.log(removeNumber);
    this.contactList.splice(this.contactList.indexOf(removeNumber), 1);
    console.log('remove' + this.contactList);
  }



  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshPageCount(): void {
    if (this.paginator){
      console.log('refresh page count');
      this.pageCount = Math.ceil(this.paginator.length / this.paginator.pageSize);
      console.log('refresh page count after');
    }
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  public refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable(searchKeyWord)
  }

  public loadTable(pageIndex: string, pageSize: string): void {
    this.allComponentsSub = this.itemsservice.getAllProducts(pageIndex, pageSize)
      .subscribe(result => {
        console.log(result.content)
        this.paginator.length = result.content.length;
        this.dataSource = result.content;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable(searchKeyWord: string): void {
    if (searchKeyWord!==''){
      this.searchComponentsSub = this.itemsservice.searchProduct(searchKeyWord)
        .pipe(timeout(4000))
        .subscribe(result => {
          console.log(result.content)
          this.paginator.length = result.content.length;
          this.dataSource = result.content;
          this.refreshPageCount();
        }, error => {
          console.log(error);
        });
    }else {
      console.log("not search")
    }
  }

  updateItem(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateProductsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  deleteItem(row: any): void {
    const approval = this.dialog.open(DialogsComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.itemsservice.deleteProduct(row.componetID).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.componetName+' Is Not Deleted')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            this.refreshTable();

          }
        })
      }
    });
  }

  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(event.pageIndex), String(event.pageSize));
    this.searchTable(searchKeyWord)
  }

  addModel() {
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose = true;
    dialogConfig2.autoFocus = true;
    dialogConfig2.data = this.itemDetailsForm.controls;
    dialogConfig2.width = '900px';
    dialogConfig2.height = 'auto';
    console.log(dialogConfig2.data);
    console.log('----------------------------');
    const dialogRef2 = this.dialog.open(AddModelComponent, dialogConfig2);
    dialogRef2.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  addImages() {
    const dialogConfig3 = new MatDialogConfig();
    dialogConfig3.disableClose = true;
    dialogConfig3.autoFocus = true;
    dialogConfig3.data = this.itemDetailsForm.controls;
    dialogConfig3.width = '900px';
    dialogConfig3.height = 'auto';
    console.log(dialogConfig3.data);
    console.log('----------------------------');
    const dialogRef3 = this.dialog.open(AddImgComponent, dialogConfig3);
    dialogRef3.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  resetForm() {
    this.itemDetailsForm.reset();
    this.contactList.length = 0
  }
}
