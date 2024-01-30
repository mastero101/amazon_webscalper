import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockMarketPageRoutingModule } from './stock-market-routing.module';

import { StockMarketPage } from './stock-market.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockMarketPageRoutingModule
  ],
  declarations: [StockMarketPage]
})
export class StockMarketPageModule {}
