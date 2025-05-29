import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WishlistComponent } from './wishlist.component';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  const mockWishlist = [
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Eevee' }
  ];

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'wishlist') return JSON.stringify(mockWishlist);
      return null;
    });

    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      imports: [WishlistComponent]
    });

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should fallback to default image if the original image fails to load', () => {
    component.wishlist = [
      { id: 1, name: 'pikachu', image: 'invalid-url.png' }
    ];

    fixture.detectChanges();

    // Găsește elementul <img>
    const imgDebugEl = fixture.debugElement.query(By.css('img'));
    const imgEl = imgDebugEl.nativeElement as HTMLImageElement;

    // Simulează eroarea imaginii
    imgEl.dispatchEvent(new Event('error'));

    fixture.detectChanges();

    // Verifică dacă s-a schimbat imaginea în fallback
    expect(component.wishlist[0].image).toBe('assets/images/pokeball.png');
  });

  it('should load wishlist from localStorage on init', () => {
    expect(component.wishlist.length).toBe(2);
    expect(component.wishlist[0].name).toBe('Pikachu');
  });

  it('should remove Pokémon from wishlist on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.remove({ id: 1, name: 'Pikachu' });
    expect(component.wishlist.length).toBe(1);
    expect(component.wishlist[0].id).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify([{ id: 2, name: 'Eevee' }])
    );
  });

  it('should not remove Pokémon if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.remove({ id: 1, name: 'Pikachu' });
    expect(component.wishlist.length).toBe(2);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
