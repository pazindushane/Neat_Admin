import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { ManageProductsComponent } from './manage-products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HighlightDirective} from "../../services/highlight.directive";
import {AutoFocusDirective} from "../../services/auto-focus.directive";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AppModule} from "../../app.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AddModelComponent } from './components/add-model/add-model.component';
import { AddImgComponent } from './components/add-img/add-img.component';


@NgModule({
  declarations: [
    ManageProductsComponent,
    AddProductsComponent,
    UpdateProductsComponent,
    AddModelComponent,
    AddImgComponent,
    ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatMenuModule,
    AppModule,
    MatProgressSpinnerModule
  ]
})
export class ManageProductsModule { }
