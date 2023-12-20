import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {
  form: FormGroup;

  constructor(private fb:FormBuilder, 
              private _tajetaService: TarjetaService,
              private toastr: ToastrService) {
    
  
    this.form = this.fb.group({
      titular: ['',Validators.required],
      nroTarjeta: ['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]],
    })

  }

  crearTarjeta(){

    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.nroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),

    }

    //console.log(TARJETA)

    this._tajetaService.guardarTarjeta(TARJETA).then(()=>{
      console.log('Tarjeta registrada');
      this.toastr.success('Tarjeta registrada con exito','Tarjeta registrada');
      this.form.reset();
    }, error=>{
      this.toastr.error('Ocurrio un error','Error');

      console.log(error);
    })
  }
}
