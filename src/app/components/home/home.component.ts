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
import { Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { forkJoin } from 'rxjs';


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
  pokemonList: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  loading = false;
  offset = 0;
  pokemonService = inject(PokemonService);
  caughtList: Pokemon[] = [];
  wishlist: Pokemon[] = [];
  showCatchAnimation = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadStoredLists();
    this.loadPokemon();
  }
  

  loadPokemon() {
    this.loading = true;
    this.pokemonService.getPokemonList(20, this.offset).subscribe((list) => {
      const detailRequests = list.map((pokemon: Pokemon) =>
        this.pokemonService.getPokemonDetails(pokemon.url!)
      );
  
      forkJoin(detailRequests).subscribe((details: Pokemon[]) => {
        const newData = details.map(d => ({
          ...d,
          id: d.id,
          name: d.name,
          image: d.sprites?.front_default ?? 'assets/images/pokeball.png',
        }));
        this.pokemonList = [...this.pokemonList, ...newData];
        this.filteredPokemon = [...this.pokemonList];
        this.offset += 20;
        this.loading = false;
      });
      
    });
  }

  isInCaught(pokemon: Pokemon): boolean {
    return this.caughtList.some(p => p.id === pokemon.id);
  }
  
  isInWishlist(pokemon: Pokemon): boolean {
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

  details(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }

  catch(pokemon: Pokemon) {
    const caught = JSON.parse(localStorage.getItem('caughtList') || '[]');
    const index = caught.findIndex((p: Pokemon) => p.id === pokemon.id);
  
    if (index > -1) {
      caught.splice(index, 1);
    } else {
      this.showCatchAnimation = true;

      setTimeout(() => {
        this.showCatchAnimation = false;
      }, 4000);
      caught.push(pokemon);
    }
  
    this.caughtList = caught;
    localStorage.setItem('caughtList', JSON.stringify(caught));
  }
  
  
  addToWishlist(pokemon: Pokemon) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.findIndex((p: Pokemon) => p.id === pokemon.id);
  
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(pokemon);
    }
  
    this.wishlist = wishlist;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  
  

 
}
