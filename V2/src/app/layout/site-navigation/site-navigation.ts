import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-site-navigation',
  styleUrl: './site-navigation.css',
  templateUrl: './site-navigation.html',
})
export class SiteNavigation {
  protected menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
