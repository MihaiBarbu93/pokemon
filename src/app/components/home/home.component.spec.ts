import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../services/services/pokemon.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemonList = [
    { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
  ];

  const mockPokemonDetails = [
    { id: 1, name: 'bulbasaur', sprites: { front_default: 'img1.png' } },
    { id: 2, name: 'ivysaur', sprites: { front_default: 'img2.png' } }
  ];

  beforeEach(() => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonList', 'getPokemonDetails']);

    TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }]
    });

    mockPokemonService.getPokemonList.and.returnValue(of(mockPokemonList));
    mockPokemonService.getPokemonDetails.and.callFake((url: string) => {
      const id = url.endsWith('/1/') ? 0 : 1;
      return of(mockPokemonDetails[id]);
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load and map Pokémon data correctly', fakeAsync(() => {
    fixture.detectChanges(); // triggers ngOnInit
    tick(); // simulate async passage of time for forkJoin
    fixture.detectChanges();

    expect(component.pokemonList.length).toBe(2);
    expect(component.filteredPokemon[0].name).toBe('bulbasaur');
    expect(component.filteredPokemon[1].image).toBe('img2.png');
  }));

  it('should add and remove from caughtList', () => {
    const pokemon = { id: 1, name: 'bulbasaur' } as any;
    component.catch(pokemon);
    expect(component.caughtList.some(p => p.id === 1)).toBeTrue();

    component.catch(pokemon);
    expect(component.caughtList.some(p => p.id === 1)).toBeFalse();
  });

  it('should add and remove from wishlist', () => {
    const pokemon = { id: 2, name: 'ivysaur' } as any;
    component.addToWishlist(pokemon);
    expect(component.wishlist.some(p => p.id === 2)).toBeTrue();

    component.addToWishlist(pokemon);
    expect(component.wishlist.some(p => p.id === 2)).toBeFalse();
  });

  it('should filter Pokémon by search term', () => {
    component.pokemonList = mockPokemonDetails.map(d => ({
      id: d.id,
      name: d.name,
      image: d.sprites.front_default
    }));
    component.searchTerm = 'ivy';
    component.onSearch();

    expect(component.filteredPokemon.length).toBe(1);
    expect(component.filteredPokemon[0].name).toBe('ivysaur');
  });
});
