// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'caught', component: PokedexComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'details/:name', component: DetailComponent },
];
