import { AfterViewInit, Component, inject, NgZone, OnDestroy } from '@angular/core';

type NavigationSection =
  | 'about'
  | 'experience'
  | 'skills'
  | 'education'
  | 'awards'
  | 'recommendations'
  | 'interests';

@Component({
  imports: [],
  selector: 'app-site-navigation',
  styleUrl: './site-navigation.css',
  templateUrl: './site-navigation.html',
})
export class SiteNavigation implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private observer: IntersectionObserver | undefined;
  private readonly sectionIds: readonly NavigationSection[] = [
    'about',
    'experience',
    'skills',
    'education',
    'awards',
    'recommendations',
    'interests',
  ];

  protected menuOpen = false;
  protected activeSection: NavigationSection = 'about';

  ngAfterViewInit(): void {
    if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections = this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const current = entries
            .filter((entry) => entry.isIntersecting)
            .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];
          const nextSection = this.sectionIds.find((id) => id === current?.target.id);

          if (!nextSection || nextSection === this.activeSection) {
            return;
          }

          this.zone.run(() => {
            this.activeSection = nextSection;
          });
        },
        { rootMargin: '-80px 0px -70% 0px' },
      );

      sections.forEach((section) => this.observer?.observe(section));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(section?: NavigationSection): void {
    this.menuOpen = false;

    if (section) {
      this.activeSection = section;
    }
  }
}
