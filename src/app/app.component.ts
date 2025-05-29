import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
  ]
})
export class AppComponent {
  title = 'Pokemon';
}
