import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  const mockCaughtList = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' }
  ];

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'caughtList') return JSON.stringify(mockCaughtList);
      return null;
    });

    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      imports: [PokedexComponent]
    });

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load caughtList from localStorage on init', () => {
    expect(component.caughtList.length).toBe(2);
    expect(component.caughtList[0].name).toBe('Bulbasaur');
  });

  it('should remove Pokémon from caughtList on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.remove({ id: 1, name: 'Bulbasaur' });
    expect(component.caughtList.length).toBe(1);
    expect(component.caughtList[0].id).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'caughtList',
      JSON.stringify([{ id: 2, name: 'Charmander' }])
    );
  });

  it('should not remove Pokémon if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.remove({ id: 1, name: 'Bulbasaur' });
    expect(component.caughtList.length).toBe(2);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
