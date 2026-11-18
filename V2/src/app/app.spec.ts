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
    expect(compiled.querySelector('.profile-role')?.textContent).toContain('Engenheiro de Software Sênior');
    expect(compiled.querySelector('.profile-action--primary')?.getAttribute('href')).toContain(
      'linkedin.com',
    );
    expect(compiled.querySelector('#about')).toBeTruthy();
    expect(compiled.querySelector('#about .profile-cover')).toBeTruthy();
    expect(compiled.querySelector('#about .profile-avatar')?.getAttribute('src')).toBe(
      'Img/Danilo1.jpg',
    );
    expect(compiled.querySelector('.profile-location')?.textContent).toContain(
      'São Paulo, Brasil · Híbrido',
    );
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

    expect(cards).toHaveLength(6);
    expect(compiled.querySelectorAll('.experience-timeline .experience-card')).toHaveLength(3);
    expect(compiled.querySelectorAll('.experience-grid--previous .experience-card')).toHaveLength(
      3,
    );
    expect(cards[0].classList.contains('experience-card--current')).toBe(true);
    expect(cards[0].querySelector('.experience-card__chevron')).toBeTruthy();
    expect(cards[0].querySelector('.company-name')?.firstChild?.textContent?.trim()).toBe(
      'Banco ASA',
    );
    expect(cards[0].querySelector('.company-role-label')?.textContent?.trim()).toBe(
      'Engenheiro de software sênior',
    );
    expect(cards[0].querySelector('.experience-current-badge')?.textContent?.trim()).toBe('Atual');
    expect(cards[1].querySelector('.experience-current-badge')).toBeNull();
    expect(cards[1].querySelector('.company-logo')?.getAttribute('src')).toBe(
      'assets/companies/xp-inc.jpg',
    );
    expect(cards[2].querySelector('.company-logo')?.getAttribute('src')).toBe(
      'assets/companies/btg-pactual.jpg',
    );
    const vidalinkLogoFrame = cards[3].querySelector('.company-logo-frame');
    const dxcLogoFrame = cards[4].querySelector('.company-logo-frame');
    expect(vidalinkLogoFrame?.classList.contains('company-logo-frame--full-bleed')).toBe(false);
    expect(dxcLogoFrame?.classList.contains('company-logo-frame--full-bleed')).toBe(false);
    expect(cards[1].querySelector('.company-role-label')?.textContent?.trim()).toBe(
      'Engenheiro de software',
    );
    expect(
      Array.from(cards).map((card) =>
        card.querySelector('.experience-location')?.textContent?.trim(),
      ),
    ).toEqual(['Presencial', 'Híbrido', 'Híbrido', 'Híbrido', 'Presencial', 'Presencial']);
    expect(compiled.querySelector('.experience-intro')).toBeNull();
    expect(cards[0].querySelector('.experience-domain')?.textContent?.trim()).toBe(
      'Crédito e empréstimo',
    );
    expect(cards[1].querySelector('.experience-domain')?.textContent?.trim()).toBe(
      'Digital Empresas',
    );
    expect(cards[2].querySelector('.experience-domain')?.textContent?.trim()).toBe(
      'Prevenção a fraudes e crimes financeiros',
    );
    expect(cards[1].querySelector('summary')?.textContent).not.toContain('2025');
    expect(cards[1].querySelector('.experience-date')?.textContent).toContain(
      'Setembro 2025 - Período a confirmar',
    );
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
    ).toEqual([
      'Banco ASA',
      'XP Inc.',
      'act digital · Banco BTG Pactual',
      'Vidalink do Brasil',
      'DXC Technology',
      'Bemis Company, Inc.',
    ]);
    expect(
      Array.from(cards).every(
        (card) =>
          (card.querySelector('.company-logo')?.getAttribute('src') ||
            card.querySelector('.company-wordmark')) &&
          card.querySelector('summary.experience-card__toggle') &&
          card.querySelector('.experience-card__details mat-card-content') &&
          card.querySelector('.experience-card__meta') &&
          card.querySelector('.experience-date'),
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

  it('should render and interact with the connected skill map', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nodes = Array.from(compiled.querySelectorAll<HTMLButtonElement>('#skills .skill-card'));
    const imageNodes = nodes.filter((node) => node.querySelector('.skill-icon img'));

    expect(nodes).toHaveLength(17);
    expect(imageNodes).toHaveLength(14);
    expect(
      nodes.every(
        (card) =>
          card.querySelector('.skill-name')?.textContent?.trim() &&
          (card.querySelector('.skill-icon img')?.getAttribute('src')?.startsWith('assets/skills/') ||
            card.querySelector('.skill-icon__symbol')?.textContent?.trim()),
      ),
    ).toBe(true);
    const splunkCard = nodes.find(
      (card) => card.querySelector('.skill-name')?.textContent?.trim() === 'Splunk',
    );
    const datadogCard = nodes.find(
      (card) => card.querySelector('.skill-name')?.textContent?.trim() === 'Datadog',
    );

    expect(splunkCard?.querySelector('.skill-icon img')?.getAttribute('src')).toBe(
      'assets/skills/splunk.svg',
    );
    expect(datadogCard?.querySelector('.skill-icon img')?.getAttribute('src')).toBe(
      'assets/skills/datadog.svg',
    );
    expect(compiled.querySelector('#skills .skill-map__core')?.textContent).toContain(
      'Serviços financeiros',
    );
    expect(compiled.querySelector('#skills .skill-insight__copy h3')?.textContent).toContain(
      'C# / .NET',
    );

    datadogCard?.click();
    fixture.detectChanges();

    expect(datadogCard?.getAttribute('aria-pressed')).toBe('true');
    expect(compiled.querySelector('#skills .skill-insight__copy h3')?.textContent).toBe('Datadog');
    expect(compiled.querySelector('#skills .skill-insight__group')?.textContent).toContain(
      'Mensageria e operações',
    );
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

    compiled.querySelector<HTMLAnchorElement>('#navbarResponsive a[href="#experience"]')?.click();
    fixture.detectChanges();

    expect(menu?.classList.contains('show')).toBe(false);
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(
      compiled.querySelector<HTMLAnchorElement>('#navbarResponsive a[href="#experience"]')?.getAttribute(
        'aria-current',
      ),
    ).toBe('location');
  });
});
