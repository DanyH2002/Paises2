import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/Services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, InputTextModule, ToastModule, FormsModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Login: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private message: MessageService,
    private api: ApiService,
  ) {
    this.Login = this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.Login.valid) {
      this.api.postItem('login', this.Login.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);
          localStorage.setItem('name', response.name);
          this.message.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso' });
          setTimeout(() => {
            this.router.navigateByUrl('/menu');
          }, 2500);
        },
        error: (error) => {
          console.error("Error al iniciar sesión", error);
          this.message.add({ severity: 'error', summary: 'Error', detail: 'Error al iniciar sesión, por favor revise sus credenciales' });
        }
      });
    } else {
      console.error("El formulario no es válido");
      this.message.add({ severity: 'error', summary: 'Error', detail: 'El formulario no es válido, por favor revise los campos' });
    }
  }

  onSignUp() {
    this.router.navigateByUrl('/registro');
  }
}
