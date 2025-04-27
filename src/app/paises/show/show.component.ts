import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/Services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show',
  imports: [CardModule, ImageModule, ButtonModule, CommonModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {
  country: any = {};
  userId: number | null = null;
  edit: boolean = false;

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = Number(localStorage.getItem('id'));
    this.loadCountry(Number(id));
  }

  loadCountry(id: number) {
    this.api.getItem('countries', id).subscribe(
      {
        next: (response: any) => {
          if (response && response.success) {
            this.country = response.data;
            console.log('País cargado:', this.country);
            this.edit = this.country.user_id === this.userId;
          } else {
            console.error('Error: El país no fue encontrado.');
          }
        },
        error: (error: any) => {
          console.error('Error al cargar el país:', error);
        }
      }
    );
  }

  editar() {
    this.router.navigate(['/menu/paises/editar', this.country.id]);
  }
  lista() {
    this.router.navigate(['/menu/paises']);
  }
}
