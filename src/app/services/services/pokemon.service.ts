import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit = 20, offset = 0) {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(response => response.results)
    );
  }

  getPokemonDetails(url: string) {
    return this.http.get<Pokemon>(url);
  }

  getPokemonDetailsByName(name: string) {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`);
  }
  
}
