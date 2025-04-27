import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/Services/api.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, ConfirmDialog, ToastModule, ButtonModule, ReactiveFormsModule, TableModule, SelectModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})

export class FormsComponent implements OnInit {
  countryForm: FormGroup;
  regions: any[] = [];
  countries: any;
  userId: number | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private api: ApiService,
    private conf: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.countryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      president: ['', [Validators.required]],
      size: [null, [Validators.required, Validators.min(1)]],
      population: [null, [Validators.required, Validators.min(1)]],
      language: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      region_id: [null, [Validators.required]],
      flag: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtenemos el id de la URL
    this.userId = Number(localStorage.getItem('id'));
    if (id) {
      this.isEditing = true; // Si existe un ID, estás en modo edición
      this.cargarPais(id);
    } else {
      this.isEditing = false; // Sin ID, estás en modo creación
    }
    this.loadRegions(); // Cargar las regiones
  }

  loadRegions() {
    this.api.getItems('regiones').subscribe({
      next: (response: any) => {
        console.log("Regiones recibidas: ", response);
        if (response && response.data && Array.isArray(response.data)) {
          this.regions = response.data.map((region: any) => ({
            name: region.name,
            code: region.code,
            id: region.id,
            descripcion: region.description
          }));
          console.log("Regiones procesadas: ", this.regions);
        } else {
          console.error('Error: "data" no contiene un array válido.');
          this.message.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron regiones disponibles.' });
        }
      },
      error: (error) => {
        console.error('Error al cargar las regiones:', error);
        this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las regiones' });
      }
    });
  }

  cargarPais(id: string | null) {
    console.log("Pais con ID: " + id);
    if (id) {
      this.api.getItem('countries', Number(id)).subscribe({
        next: (response) => {
          this.countries = response.data;
          console.log("Pais: ", this.countries);
          this.countryForm.patchValue({
            name: this.countries.name,
            president: this.countries.president,
            size: this.countries.size,
            population: this.countries.population,
            language: this.countries.language,
            currency: this.countries.currency,
            region_id: this.countries.region_id,
            flag: this.countries.flag
          });
          console.log("Formulario: ", this.countryForm);
        },
        error: (error) => {
          console.error('Error al cargar el país:', error);
          this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el país' });
        }
      });
    }
  }

  crear() {
    console.log("Crear Pais");
    const formData = {
      ...this.countryForm.value,
      region_id: Number(this.countryForm.value.region_id),
      user_id: this.userId,
    };
    if (this.countryForm.valid) {
      console.log("Pais: ", formData);
      this.api.postItem('countries/create', formData).subscribe({
        next: (response) => {
          console.log('País creado:', response);
          this.message.add({ severity: 'success', summary: 'Éxito', detail: 'País creado exitosamente' });
          setTimeout(() => {
            this.router.navigateByUrl('/menu/paises');
          }, 2500);
        },
        error: (error) => {
          console.error('Error al crear el país:', error);
          this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el país' });
        }
      });
    } else {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Formulario inválido' });
    }
  }

  actualizar() {
    console.log("Actualizar Pais");
    const id = this.route.snapshot.paramMap.get('id');
    const formData = {
      ...this.countryForm.value,
      region_id: Number(this.countryForm.value.region_id),
      user_id: this.userId,
    };
    if (this.countryForm.valid) {
      console.log("ID: ", id);
      console.log("Pais: ", this.countries);
      this.api.updateItem('countries/update', Number(id), formData).subscribe(
        {
          next: (response) => {
            console.log('País actualizado:', response);
            this.message.add({ severity: 'success', summary: 'Éxito', detail: 'País actualizado exitosamente' });
            setTimeout(() => {
              this.router.navigateByUrl('/menu/paises');
            }, 2500);
          },
          error: (error) => {
            console.error('Error al actualizar el país:', error);
            this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el país' });
          }
        }
      );
    }
    else {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Formulario inválido' });
    }
  }

  eliminar(event: Event) {
    if (!this.countries || !this.countries.id) {
      this.message.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay espacio seleccionado para eliminar.' });
      return;
    }
    console.log('ID del país a eliminar:', this.countries.id);
    this.conf.confirm(
      {
        message: '¿Estás seguro de eliminar este pais?',
        header: 'Eliminar Espacio',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
        },
        accept: () => {
          const formData = { user_id: this.userId };
          console.log('Datos del país a eliminar:', formData);
          this.api.delete('countries/delete', this.countries.id, formData) .subscribe(
            {
              next: (response) => {
                console.log('País eliminado:', response);
                if (response.success != false) {
                  this.message.add({ severity: 'success', summary: 'Éxito', detail: 'País eliminado exitosamente' });
                  setTimeout(() => {
                    this.router.navigateByUrl('/menu/paises');
                  }, 2500);
                } else {
                  this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el país' });
                }
              },
              error: (error) => {
                console.error('Error al eliminar el país:', error);
                this.message.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el país' });
              }
            }
          );
        },
        reject: () => {
          this.message.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada' });
        }
      }
    );
  }

  volverALista() {
    this.router.navigateByUrl('/menu/paises');
  }
}
