import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  wishlist: any[] = [];

  ngOnInit(): void {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  remove(pokemon: any) {
    const confirmed = confirm(`Are you sure you want to remove ${pokemon.name}?`);
    if (confirmed) {
      this.wishlist = this.wishlist.filter(p => p.id !== pokemon.id);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }
}
