import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category.component';
import {AddCategoryComponent} from "./components/add-category/add-category.component";

const routes: Routes = [{ path: '', component: ManageCategoryComponent,
children:[
  {path:'', component:AddCategoryComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCategoryRoutingModule { }
