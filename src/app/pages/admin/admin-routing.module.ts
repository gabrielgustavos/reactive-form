// admin-routing.module.ts

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ShopComponent } from './shop/shop.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

  },
  {
    path: 'shop',
    component: ShopComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
