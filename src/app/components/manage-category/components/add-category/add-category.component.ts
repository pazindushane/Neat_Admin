import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {SystemConfig} from "../../../../util/SystemConfig";
import {DialogsComponent} from "../../../../core/dialogs/dialogs.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/model/ApprovalDialogConfig";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {categoryDTO} from "../../dto/categoryDTO";
import {CategoryService} from "../../services/category.service";
import {UpdateCategoryComponent} from "../update-category/update-category.component";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  idLoading = true;
  city: any;
  apiResponse!: false;
  categoryForm!: FormGroup;
  brand: any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;
  fileObj:any

  constructor(private http: HttpClient,
              private categoryservice: CategoryService,
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category_name: new FormControl('', [
        Validators.required
      ]),
      status: new FormControl('', [
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

  saveItem() {
    this.categoryservice.addProduct(new categoryDTO(
      this.categoryForm.get('category_name')?.value,
      this.categoryForm.get('status')?.value,
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
        const approval5 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Category Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Category Added Successfully');
            this.categoryForm.reset();
            this.refreshTable();
          }
        });
      }else{
        const approval4 = this.dialog.open(DialogsComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Category Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Category Add Unsuccessful');
          }
        });
      }
    });

  }

  components!: Array<categoryDTO>[];
  displayedColumns: string[] = ['category_name', 'status'];
  dataSource: MatTableDataSource<Array<categoryDTO>>;
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
    this.allComponentsSub = this.categoryservice.getAllProducts(pageIndex, pageSize)
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
      this.searchComponentsSub = this.categoryservice.searchProduct(searchKeyWord)
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
    dialogConfig.width = '55%';
    dialogConfig.height = '80%';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateCategoryComponent, dialogConfig);
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
        this.categoryservice.deleteProduct(row.componetID).subscribe(res => {
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

}
