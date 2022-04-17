import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from "./core/not-found-page/not-found-page.component";
import {AuthGuard} from "./components/auth/guard/auth.guard";

const routes: Routes = [{ path: '',redirectTo:'auth', pathMatch:'full'},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]  },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'manageProducts', loadChildren: () => import('./components/manage-products/manage-products.module').then(m => m.ManageProductsModule),
    canActivate: [AuthGuard]  },
  { path: 'manageCategory', loadChildren: () => import('./components/manage-category/manage-category.module').then(m => m.ManageCategoryModule), canActivate: [AuthGuard]  },
  {path: '**', component: NotFoundPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
