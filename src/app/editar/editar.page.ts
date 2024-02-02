import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  registroForm: FormGroup;
  items: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      id: ['', Validators.required],
      modelo: ['', Validators.required],
      precio: ['', Validators.required],
      tienda: ['', Validators.required],
      url: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.getItems();
  }

  onItemChange(event: any) {
    const selectedItem = event.detail.value;
    if (selectedItem) {
      this.registroForm.patchValue({
        id: selectedItem.id,
        modelo: selectedItem.modelo,
        precio: selectedItem.precio,
        tienda: selectedItem.tienda,
        url: selectedItem.url,
        img: selectedItem.img
      });
    }
  }

  guardar() { 
    const data = this.registroForm.value;
    const id = data.id; // Obtener el ID del formulario o de donde sea que lo tengas
  
    // Realiza la solicitud PUT utilizando Axios con el ID incluido en la URL
    axios.put(`https://amazon-webscalper-crud.onrender.com/${id}`, data)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
        alert('Articulo Actualizado')
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });
  }

  async getItems() {
    try {
      const response = await axios.get('https://amazon-webscalper-crud.onrender.com/items'); // 
      this.items = response.data;
      console.log(this.items); 
    } catch (error) {
      console.error('Error al obtener los datos:', error); 
    } 
  }

}