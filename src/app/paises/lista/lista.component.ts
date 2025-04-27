import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/Services/api.service';

@Component({
  selector: 'app-lista',
  imports: [TableModule, CommonModule, ButtonModule, ImageModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  countries: any[] = [];
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.api.getItems('countries', 'list').subscribe({
      next: (response: any) => {
        console.log('Countries loaded:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.countries = response.data.map((country: any) => ({
            id: country.id,
            name: country.name,
            president: country.president,
            image: country.flag,
            region_id: country.region_id,
            region_name: country.region_name,
            user_id: country.user_id,
            user_name: country.user_name,
          }));
          console.log('Processed countries:', this.countries);
        } else {
          console.error('Error: Unexpected response structure.');
        }
      },

      error: (error) => {
        console.error('Error loading countries:', error);
      }
    });
  }

  viewCountry(id: number) {
    this.router.navigate(['/menu/paises/ver', id]);
  }
}
