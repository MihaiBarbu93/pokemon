import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,   MatIconModule,
    MatTooltipModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('pokemonAppear', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class DetailComponent implements OnInit {
  pokemon: Pokemon = {} as Pokemon;
  caughtList: Pokemon[] = [];
  wishlist: Pokemon[] = [];
  showCatchAnimation = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.loadStoredLists();
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetailsByName(name).subscribe((data) => {
        this.pokemon = data;
      });
    }
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
