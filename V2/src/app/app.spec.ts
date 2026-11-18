import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the resume sections', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Danilo');
    expect(compiled.querySelector('.profile-role')?.textContent).toContain('C#/.NET');
    expect(compiled.querySelector('.profile-action--primary')?.getAttribute('href')).toContain(
      'linkedin.com',
    );
    expect(compiled.querySelector('#about')).toBeTruthy();
    expect(compiled.querySelector('#experience')).toBeTruthy();
    expect(compiled.querySelector('#education')).toBeTruthy();
    expect(compiled.querySelector('#recommendations')).toBeTruthy();
    expect(compiled.querySelector('#skills')).toBeTruthy();
    expect(compiled.querySelector('#interests')).toBeTruthy();
    expect(compiled.querySelector('#awards')).toBeTruthy();
    expect(compiled.querySelector('app-site-navigation')).toBeTruthy();
  });

  it('should render each listed employer as an experience card with a logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('#experience .experience-card');

    expect(cards).toHaveLength(3);
    const disclosures = Array.from(
      compiled.querySelectorAll<HTMLDetailsElement>('#experience .experience-card details'),
    );
    expect(disclosures.every((disclosure) => !disclosure.open)).toBe(true);
    disclosures[0].querySelector('summary')?.click();
    expect(disclosures[0].open).toBe(true);
    expect(
      Array.from(cards).map((card) =>
        card.querySelector('[mat-card-subtitle]')?.textContent?.trim(),
      ),
    ).toEqual(['Vidalink do Brasil', 'DXC Technology', 'Bemis Company, Inc.']);
    expect(
      Array.from(cards).every(
        (card) =>
          card.querySelector('.company-logo')?.getAttribute('src') &&
          card.querySelector('summary.experience-card__toggle') &&
          card.querySelector('.experience-card__details mat-card-content') &&
          card.querySelector('mat-card-footer'),
      ),
    ).toBe(true);
  });

  it('should render courses in LinkedIn-style cards with school logos', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('#awards .course-card');

    expect(cards).toHaveLength(19);
    expect(
      Array.from(cards).every(
        (card) =>
          card.querySelector('.school-logo')?.getAttribute('src') &&
          card.querySelector('[mat-card-title]') &&
          card.querySelector('[mat-card-subtitle]'),
      ),
    ).toBe(true);
  });

  it('should render skill logos in a consistent icon frame with a text label', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('#skills .skill-card');

    expect(cards).toHaveLength(9);
    expect(
      Array.from(cards).every(
        (card) =>
          card.querySelector('.skill-icon img')?.getAttribute('src') &&
          card.querySelector('.skill-name')?.textContent?.trim(),
      ),
    ).toBe(true);
  });

  it('should open the mobile menu and close it after selecting a section', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.navbar-toggler');
    const menu = compiled.querySelector<HTMLElement>('#navbarResponsive');

    toggle?.click();
    fixture.detectChanges();

    expect(menu?.classList.contains('show')).toBe(true);
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');

    compiled.querySelector<HTMLAnchorElement>('#navbarResponsive a')?.click();
    fixture.detectChanges();

    expect(menu?.classList.contains('show')).toBe(false);
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });
});
