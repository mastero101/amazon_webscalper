import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.page.html',
  styleUrls: ['./stock-market.page.scss'],
})
export class StockMarketPage implements OnInit {
  showPriceChange = false;
  items: any[] = [];
  prices: any[] = [];

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.getItems();
    this.getPrices();
    setInterval(() => {
      this.getPrices();
    }, 2000);
  }
  
  async getItems() {
    try {
      const response = await axios.get('http://localhost:3000/items'); // 
      this.items = response.data;
      console.log(this.items); 
    } catch (error) {
      console.error('Error al obtener los datos:', error); 
    } 
  }

  async getPrices() {
    try {
      const response = await axios.get('http://localhost:3000/items/prices');
      const newPrices = response.data;
      this.updateItemPrices(newPrices);
      console.log(newPrices);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  updateItemPrices(newPrices: any[]) {
    this.items.forEach((item, index) => {
      if (newPrices[index] && item) {
        const newPrice = newPrices[index].precio;
        const previousPrice = this.prices[index]?.precio || item.precio;
        if (newPrice !== previousPrice) {
          this.showPriceChange = true;
          setTimeout(() => {
            this.showPriceChange = false;
          }, 2000);
        }
        item.precio = newPrice;
      }
    });
    this.prices = newPrices;
  }
}
