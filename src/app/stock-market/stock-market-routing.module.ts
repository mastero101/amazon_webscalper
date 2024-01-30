import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockMarketPage } from './stock-market.page';

const routes: Routes = [
  {
    path: '',
    component: StockMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockMarketPageRoutingModule {}
