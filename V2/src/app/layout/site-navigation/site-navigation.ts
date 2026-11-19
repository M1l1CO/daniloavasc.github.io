import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
} from '@angular/core';

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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private observer: IntersectionObserver | undefined;
  private readonly sectionIds: readonly NavigationSection[] = [
    'about',
    'experience',
    'education',
    'skills',
    'awards',
    'recommendations',
    'interests',
  ];
  private readonly activityEvents = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
  private inactivityTimer: ReturnType<typeof setTimeout> | undefined;
  private lastActivityAt = 0;
  private readonly handleActivity = (): void => {
    const now = Date.now();
    if (now - this.lastActivityAt < 250) {
      return;
    }

    this.lastActivityAt = now;
    if (this.navbarHidden) {
      this.zone.run(() => {
        this.navbarHidden = false;
        this.changeDetectorRef.markForCheck();
      });
    }
    this.scheduleAutoHide();
  };

  protected menuOpen = false;
  protected activeSection: NavigationSection = 'about';
  protected navbarHidden = false;
  protected isLightTheme = false;

  ngAfterViewInit(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme');
    this.isLightTheme = savedTheme === 'light';
    this.applyTheme();

    this.zone.runOutsideAngular(() => {
      this.activityEvents.forEach((eventName) =>
        document.addEventListener(eventName, this.handleActivity, { passive: true }),
      );
      document.addEventListener('focusin', this.handleActivity);
      this.scheduleAutoHide();
    });

    if (typeof IntersectionObserver === 'undefined') {
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
            this.changeDetectorRef.markForCheck();
          });
        },
        { rootMargin: '-80px 0px -70% 0px' },
      );

      sections.forEach((section) => this.observer?.observe(section));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (typeof document !== 'undefined') {
      this.activityEvents.forEach((eventName) =>
        document.removeEventListener(eventName, this.handleActivity),
      );
      document.removeEventListener('focusin', this.handleActivity);
    }

    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.navbarHidden = false;

    if (this.menuOpen) {
      this.clearInactivityTimer();
      return;
    }

    this.scheduleAutoHide();
  }

  closeMenu(section?: NavigationSection): void {
    this.menuOpen = false;
    this.scheduleAutoHide();

    if (section) {
      this.activeSection = section;
    }
  }

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle('light-theme', this.isLightTheme);
    document.documentElement.style.colorScheme = this.isLightTheme ? 'light' : 'dark';
    window.localStorage.setItem('portfolio-theme', this.isLightTheme ? 'light' : 'dark');

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColor?.setAttribute('content', this.isLightTheme ? '#f4f6f8' : '#14181c');
  }

  private scheduleAutoHide(): void {
    this.clearInactivityTimer();
    if (this.menuOpen || this.navbarHidden || typeof document === 'undefined') {
      return;
    }

    this.inactivityTimer = setTimeout(() => {
      const navigation = document.getElementById('sideNav');
      const activeElement = document.activeElement;
      const keyboardFocusIsInNavigation =
        activeElement instanceof HTMLElement &&
        navigation?.contains(activeElement) &&
        activeElement.matches(':focus-visible');
      if (this.menuOpen || keyboardFocusIsInNavigation) {
        this.scheduleAutoHide();
        return;
      }

      this.zone.run(() => {
        this.navbarHidden = true;
        this.changeDetectorRef.markForCheck();
      });
    }, 5000);
  }

  private clearInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = undefined;
    }
  }
}
