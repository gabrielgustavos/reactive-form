// admin.module.ts

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ShopComponent } from './shop/shop.component'
import { AdminRoutingModule } from './admin-routing.module'

@NgModule({
  declarations: [DashboardComponent, ShopComponent],
  imports: [CommonModule, AdminRoutingModule],
  
})
export class AdminModule {}
