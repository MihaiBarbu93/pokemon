import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


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
  caughtList: any[] = [];

  ngOnInit(): void {
    this.caughtList = JSON.parse(localStorage.getItem('caughtList') || '[]');
  }

  remove(pokemon: any) {
    const confirmed = confirm(`Are you sure you want to remove ${pokemon.name}?`);
    if (confirmed) {
      this.caughtList = this.caughtList.filter(p => p.id !== pokemon.id);
      localStorage.setItem('caughtList', JSON.stringify(this.caughtList));
    }
  }
}
