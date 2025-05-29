import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent (standalone)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        importProvidersFrom(
          RouterTestingModule,
          MatToolbarModule,
          MatButtonModule
        ),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 navigation buttons in toolbar', () => {
    const buttons = fixture.debugElement.queryAll(By.css('mat-toolbar button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent).toContain('Home');
    expect(buttons[1].nativeElement.textContent).toContain('Caught');
    expect(buttons[2].nativeElement.textContent).toContain('Wishlist');
  });

  it('should contain a router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
