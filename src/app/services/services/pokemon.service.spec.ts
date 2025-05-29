import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of Pokémon', () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    service.getPokemonList(2, 0).subscribe(results => {
      expect(results.length).toBe(2);
      expect(results[0].name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch details for a Pokémon by URL', () => {
    const mockDetails = { id: 1, name: 'bulbasaur', sprites: { front_default: 'img1.png' } };
    const url = 'https://pokeapi.co/api/v2/pokemon/1/';

    service.getPokemonDetails(url).subscribe(details => {
      expect(details.name).toBe('bulbasaur');
      expect(details.sprites?.front_default).toBe('img1.png');
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  it('should fetch details for a Pokémon by name', () => {
    const mockDetails = { id: 25, name: 'pikachu', sprites: { front_default: 'pikachu.png' } };

    service.getPokemonDetailsByName('pikachu').subscribe(details => {
      expect(details.name).toBe('pikachu');
      expect(details.sprites?.front_default).toBe('pikachu.png');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });
});
