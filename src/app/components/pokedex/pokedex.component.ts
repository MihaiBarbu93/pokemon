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
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    MatTooltipModule,
    MatIconModule]
})
export class PokedexComponent implements OnInit {
  caughtList: Pokemon[] = [];


  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.caughtList = JSON.parse(localStorage.getItem('caughtList') || '[]');
  }


  details(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }

  remove(pokemon: Pokemon) {
    const confirmed = confirm(`Are you sure you want to remove ${pokemon.name}?`);
    if (confirmed) {
      this.caughtList = this.caughtList.filter(p => p.id !== pokemon.id);
      localStorage.setItem('caughtList', JSON.stringify(this.caughtList));
    }
  }
}
