import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {ManageProductsComponent} from "../manage-products/manage-products.component";
import {ManageCategoryComponent} from "../manage-category/manage-category.component";


const routes: Routes = [{ path: '', component: DashboardComponent, children:[
    {path:'', redirectTo:'manageProducts', pathMatch:'full'},
    {path:'manageCategory', component:ManageCategoryComponent},
    {path:'manageProducts', component:ManageProductsComponent}
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
