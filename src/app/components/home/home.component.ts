import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonService } from '../../services/services/pokemon.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  loading = false;
  offset = 0;
  pokemonService = inject(PokemonService);
  caughtList: any[] = [];
  wishlist: any[] = [];


  constructor() {}

  ngOnInit(): void {
    this.loadStoredLists();
    this.loadPokemon();
  }
  

  loadPokemon() {
    this.loading = true;
    this.pokemonService.getPokemonList(20, this.offset).subscribe((list) => {
      const detailRequests = list.map((pokemon: any) =>
        this.pokemonService.getPokemonDetails(pokemon.url)
      );
  
      Promise.all(detailRequests.map((req: any) => req.toPromise())).then((details: any[]) => {
        const newData = details.map(d => ({
          id: d.id,
          name: d.name,
          image: d.sprites.front_default
        }));
        this.pokemonList = [...this.pokemonList, ...newData];
        this.filteredPokemon = [...this.pokemonList];
        this.offset += 20;
        this.loading = false;
      });
    });
  }

  isInCaught(pokemon: any): boolean {
    return this.caughtList.some(p => p.id === pokemon.id);
  }
  
  isInWishlist(pokemon: any): boolean {
    return this.wishlist.some(p => p.id === pokemon.id);
  }

  loadStoredLists() {
    this.caughtList = JSON.parse(localStorage.getItem('caughtList') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  
  

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemon = this.pokemonList.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  details(pokemn: any) {

  }

  catch(pokemon: any) {
    const caught = JSON.parse(localStorage.getItem('caughtList') || '[]');
    const index = caught.findIndex((p: any) => p.id === pokemon.id);
  
    if (index > -1) {
      caught.splice(index, 1);
    } else {
      caught.push(pokemon);
    }
  
    this.caughtList = caught;
    localStorage.setItem('caughtList', JSON.stringify(caught));
  }
  
  
  addToWishlist(pokemon: any) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.findIndex((p: any) => p.id === pokemon.id);
  
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(pokemon);
    }
  
    this.wishlist = wishlist;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  

 
}
