import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Aduce o listă paginată de Pokémoni
  getPokemonList(limit = 20, offset = 0) {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(response => response.results)
    );
  }

  // Aduce detalii pentru fiecare Pokémon (pentru imagine, stats etc.)
  getPokemonDetails(url: string) {
    return this.http.get<any>(url);
  }
}
