import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.page.html',
  styleUrls: ['./stock-market.page.scss'],
})
export class StockMarketPage implements OnInit {
  showPriceChange = false;
  selectedImage: string | null = null;
  items: any[] = [];
  prices: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  searchModel: string = ''; // Modelo de búsqueda
  itemsToShow: any[] = []; // Elementos a mostrar después de filtrar

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
      const response = await axios.get('https://amazon-webscalper-crud.onrender.com/items'); // 
      this.items = response.data;
      this.filterItems();
      console.log(this.items); 
    } catch (error) {
      console.error('Error al obtener los datos:', error); 
    } 
  }

  async getPrices() {
    try {
      const response = await axios.get('https://amazon-webscalper-crud.onrender.com/items/prices');
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

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
  
  closeImage() {
    this.selectedImage = null;
  }

  filterItems() {
    // Filtrar elementos por modelo
    this.itemsToShow = this.items.filter(item => {
      return item.modelo.toLowerCase().includes(this.searchModel.toLowerCase());
    });
    // Restablecer la paginación al filtrar
    this.currentPage = 1;
  }
}
