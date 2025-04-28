import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { DatePicker } from 'primeng/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown'
import { ApiService } from '../../shared/Services/api.service';

interface gender {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  imports: [ButtonModule, InputTextModule, ToastModule, RippleModule, FormsModule, ReactiveFormsModule, DatePicker, DatePickerModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  Registro: FormGroup;
  gender: gender[] | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private message: MessageService,
    private api: ApiService,) {
    this.Registro = this.formBuilder.group({
      name: [undefined, [Validators.required, Validators.minLength(3)]],
      last_name: [undefined, [Validators.required, Validators.minLength(3)]],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      phone: [undefined, [Validators.required, Validators.minLength(10)]],
      gender: [undefined, [Validators.required]],
      birthday: [undefined, [Validators.required]],
    });
  }

  ngOnInit() {
    this.gender = [
      { name: 'Hombre', code: 'H' },
      { name: 'Mujer', code: 'M' },
      { name: 'Otro', code: 'O' }]
  }

  onSubmit() {
    console.log(this.Registro.value);
    if (this.Registro.valid) {
      const formData = {
        ...this.Registro.value,
        gender: this.Registro.value.gender.name,
        birthdate: this.Registro.value.birthday.toISOString().split('T')[0],
      };
      this.api.postItem('register', formData).subscribe(
        {
          next: (response) => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('id', response.id);
              localStorage.setItem('name', response.name);
              this.message.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Usuario registrado correctamente' });
              setTimeout(() => {
                this.router.navigateByUrl('/menu');
              }, 2000);
            } else {
              console.error("Error al registrar el usuario", response.message);
              this.message.add({ severity: 'error', summary: 'Error', detail: response.message });
            }

          },
          error: (error) => {
            console.error(error);
            this.message.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario.' });
          }
        }
      );

    } else {
      console.error("El formulario no es válido");
      this.message.add({ severity: 'error', summary: 'Error', detail: 'El formulario no es válido, por favor revise los campos' });
    }
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

}
