import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formulario = this.formBuilder.group({
      modelo: [''],
      precio: [''],
      tienda: [''],
      url: [''],
      img: ['']
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      modelo: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      tienda: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      img: ['', Validators.required],
    });
  }

  async registrar() {
    if (this.formulario.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    try {
      const data = this.formulario.value;
      await axios.post('https://amazon-webscalper-crud.onrender.com/item', data);
      console.log('Datos registrados correctamente');
    } catch (error) {
      console.error('Error al registrar los datos:', error);
    }
  }

}
