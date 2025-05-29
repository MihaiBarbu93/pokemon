import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from '../../services/services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    types: [{ type: { name: 'electric' } }],
    stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
    sprites: {
      front_default: 'pikachu.png',
      back_default: 'pikachu_back.png',
      front_shiny: 'pikachu_shiny.png',
      back_shiny: 'pikachu_back_shiny.png'
    },
    abilities: [{ ability: { name: 'static' } }],
    base_experience: 112,
    height: 4,
    weight: 60,
    moves: [
      { move: { name: 'thunderbolt' } },
      { move: { name: 'quick-attack' } },
      { move: { name: 'iron-tail' } },
      { move: { name: 'electro-ball' } },
      { move: { name: 'volt-tackle' } }
    ],
    game_indices: [
      { version: { name: 'red' } },
      { version: { name: 'blue' } },
      { version: { name: 'yellow' } },
      { version: { name: 'gold' } },
      { version: { name: 'silver' } }
    ]
  };
  

  beforeEach(waitForAsync(() => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonDetailsByName']);

    TestBed.configureTestingModule({
      imports: [DetailComponent, HttpClientTestingModule],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['name', 'pikachu']]) }
          }
        },
        provideAnimations()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockPokemonService.getPokemonDetailsByName.and.returnValue(of(mockPokemon));
    
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  
    component.pokemon = mockPokemon;
  
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pokémon details on init', () => {
    expect(mockPokemonService.getPokemonDetailsByName).toHaveBeenCalledWith('pikachu');
    expect(component.pokemon?.name).toBe('pikachu');
  });

  it('should add and remove from caughtList', () => {
    const pkmn = { id: 1, name: 'bulbasaur' };
    component.catch(pkmn);
    expect(component.caughtList.some(p => p.id === 1)).toBeTrue();

    component.catch(pkmn);
    expect(component.caughtList.some(p => p.id === 1)).toBeFalse();
  });

  it('should add and remove from wishlist', () => {
    const pkmn = { id: 2, name: 'ivysaur' };
    component.addToWishlist(pkmn);
    expect(component.wishlist.some(p => p.id === 2)).toBeTrue();

    component.addToWishlist(pkmn);
    expect(component.wishlist.some(p => p.id === 2)).toBeFalse();
  });
});
