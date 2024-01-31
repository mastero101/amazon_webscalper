import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  modelo: string = '';
  precio: number = 0;
  tienda: string = '';
  url: string = '';
  img: string = '';

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  async registrar() {
    try {
      const data = {
        modelo: this.modelo,
        precio: this.precio,
        tienda: this.tienda,
        url: this.url,
        img: this.img
      };
      await axios.post('https://amazon-webscalper-crud.onrender.com/item', data);
      console.log('Datos registrados correctamente');
    } catch (error) {
      console.error('Error al registrar los datos:', error);
    }
  }

}
