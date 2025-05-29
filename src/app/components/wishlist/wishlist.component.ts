import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pokemon } from '../../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule,
    MatTooltipModule,
    MatIconModule]
})
export class WishlistComponent implements OnInit {
  wishlist: Pokemon[] = [];

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }


  details(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }

  remove(pokemon: Pokemon) {
    const confirmed = confirm(`Are you sure you want to remove ${pokemon.name}?`);
    if (confirmed) {
      this.wishlist = this.wishlist.filter(p => p.id !== pokemon.id);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }
}
