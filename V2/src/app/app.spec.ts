import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
    expect(compiled.querySelector('.profile-action--linkedin')?.getAttribute('href')).toContain(
      'linkedin.com',
    );
    expect(compiled.querySelector('#about')).toBeTruthy();
    const profileCover = compiled.querySelector<HTMLElement>('#about .profile-cover');
    expect(profileCover?.getAttribute('role')).toBe('region');
    expect(profileCover?.getAttribute('aria-roledescription')).toBe('carrossel');
    expect(profileCover?.querySelector('.profile-cover__logo')).toBeNull();
    expect(profileCover?.querySelector('.profile-cover__company')).toBeNull();
    expect(profileCover?.querySelector('.profile-cover__current')).toBeNull();
    expect(profileCover?.textContent).not.toContain('XP Inc.');
    expect(profileCover?.textContent).not.toContain('BTG Pactual');
    expect(profileCover?.textContent).not.toContain('Banco ASA');
    expect(profileCover?.querySelector('.profile-cover__slide--active h2')?.textContent).toContain(
      'ENGENHARIA QUE MOVE SISTEMAS CRÍTICOS',
    );
    expect(compiled.querySelector('#about .profile-avatar')?.getAttribute('src')).toBe(
      'Img/Danilo1.jpg',
    );
    expect(compiled.querySelector('.profile-location')?.textContent).toContain(
      'São Paulo, Brasil · Híbrido',
    );
    const avatarControls = compiled.querySelector('#about .profile-avatar-controls');
    expect(avatarControls?.textContent?.trim()).toBe('');
    expect(avatarControls?.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Redefinir posição da foto',
    );
    expect(compiled.querySelector('#experience')).toBeTruthy();
    expect(compiled.querySelector('#education')).toBeTruthy();
    expect(compiled.querySelector('#recommendations')).toBeTruthy();
    expect(compiled.querySelector('#skills')).toBeTruthy();
    expect(compiled.querySelector('#interests')).toBeTruthy();
    expect(compiled.querySelector('#awards')).toBeTruthy();
    expect(compiled.querySelector('app-site-navigation')).toBeTruthy();
    expect(
      Array.from(compiled.querySelectorAll<HTMLAnchorElement>('#navbarResponsive a')).map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual([
      '#about',
      '#experience',
      '#education',
      '#skills',
      '#awards',
      '#recommendations',
      '#interests',
    ]);
  });

  it('should not show a shortcut to the experience section in About', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#about a[href="#experience"]')).toBeNull();
  });

  it('should show interactive finance impact phrases in the cover carousel', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cover = compiled.querySelector('#about .profile-cover');
    expect(
      Array.from(cover?.querySelectorAll('.profile-cover__slide h2') ?? []).map((headline) =>
        headline.textContent?.trim(),
      ),
    ).toEqual([
      'ENGENHARIA QUE MOVE SISTEMAS CRÍTICOS.',
      'TECNOLOGIA FINANCEIRA. FEITA PARA CONFIAR.',
      'SOFTWARE QUE PROTEGE E ESCALA.',
    ]);
    expect(
      Array.from(cover?.querySelectorAll('.profile-cover__highlight') ?? []).map((highlight) =>
        highlight.textContent?.trim(),
      ),
    ).toEqual(['MOVE', 'CONFIAR', 'PROTEGE']);
    expect(compiled.querySelector('#about .profile-impact')).toBeNull();

    cover?.querySelector<HTMLButtonElement>('[aria-label="Próximo destaque"]')?.click();
    fixture.detectChanges();
    expect(cover?.querySelector('.profile-cover__slide--active h2')?.textContent).toContain(
      'CONFIAR',
    );

    cover?.querySelector<HTMLButtonElement>('[aria-label="Destaque anterior"]')?.click();
    fixture.detectChanges();
    expect(cover?.querySelector('.profile-cover__slide--active h2')?.textContent).toContain(
      'MOVE',
    );
  });

  it(
    'should automatically advance the cover carousel',
    async () => {
      const hiddenDescriptor = Object.getOwnPropertyDescriptor(document, 'hidden');
      const matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: () => ({ matches: false }),
      });

      const fixture = TestBed.createComponent(App);
      try {
        fixture.detectChanges();
        await new Promise<void>((resolve) => window.setTimeout(resolve, 8100));
        fixture.detectChanges();

        expect(
          fixture.nativeElement.querySelector('.profile-cover__slide--active h2')?.textContent,
        ).toContain('CONFIAR');
      } finally {
        fixture.destroy();
        if (hiddenDescriptor) {
          Object.defineProperty(document, 'hidden', hiddenDescriptor);
        } else {
          Reflect.deleteProperty(document, 'hidden');
        }
        if (matchMediaDescriptor) {
          Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
        } else {
          Reflect.deleteProperty(window, 'matchMedia');
        }
      }
    },
    12000,
  );

  it('should move and reset the profile cover spotlight with the pointer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const cover = fixture.nativeElement.querySelector('#about .profile-cover') as HTMLElement | null;
    if (!cover) throw new Error('Profile cover was not rendered.');

    const bounds: DOMRect = {
      x: 100,
      y: 50,
      left: 100,
      top: 50,
      right: 300,
      bottom: 150,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    };
    vi.spyOn(cover, 'getBoundingClientRect').mockReturnValue(bounds);
    const pointerMove = new MouseEvent('pointermove', { clientX: 150, clientY: 75 });
    Object.defineProperty(pointerMove, 'pointerType', { value: 'mouse' });
    cover.dispatchEvent(pointerMove);
    fixture.detectChanges();

    expect(cover.style.getPropertyValue('--cover-pointer-x')).toBe('25%');
    expect(cover.style.getPropertyValue('--cover-pointer-y')).toBe('25%');

    cover.dispatchEvent(new Event('pointerleave'));
    fixture.detectChanges();

    expect(cover.style.getPropertyValue('--cover-pointer-x')).toBe('50%');
    expect(cover.style.getPropertyValue('--cover-pointer-y')).toBe('50%');
    fixture.destroy();
  });

  it('should show all five LinkedIn recommendations', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const recommendations = fixture.nativeElement.querySelectorAll(
      '#recommendations .recommendation-card',
    );
    expect(recommendations).toHaveLength(5);
    expect(
      fixture.nativeElement.querySelectorAll('#recommendations .recommendation-summary'),
    ).toHaveLength(3);
    const disclosures = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLDetailsElement>(
      '#recommendations .recommendation-disclosure',
    );
    expect(disclosures).toHaveLength(5);
    expect(
      fixture.nativeElement.querySelectorAll('#recommendations .recommendation-preview'),
    ).toHaveLength(5);
    expect(Array.from(disclosures).every((disclosure) => !disclosure.open)).toBe(true);
    disclosures[0].querySelector('summary')?.click();
    expect(disclosures[0].open).toBe(true);
  });

  it(
    'should hide the navigation after inactivity and reveal it on activity',
    async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await new Promise<void>((resolve) => setTimeout(resolve, 5100));
      fixture.detectChanges();

      const navigation = fixture.nativeElement.querySelector('#sideNav');
      expect(navigation.classList.contains('navbar--hidden')).toBe(true);

      document.dispatchEvent(new Event('pointerdown'));
      fixture.detectChanges();
      expect(navigation.classList.contains('navbar--hidden')).toBe(false);
      fixture.destroy();
    },
    10000,
  );

  it('should render each listed employer as an experience card with a logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('#experience .experience-card');

    expect(cards).toHaveLength(6);
    expect(compiled.querySelectorAll('.experience-timeline .experience-card')).toHaveLength(6);
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

  it('should switch between dark and light themes', () => {
    window.localStorage.removeItem('portfolio-theme');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.theme-toggle');

    toggle?.click();
    fixture.detectChanges();

    expect(document.body.classList.contains('light-theme')).toBe(true);
    expect(toggle?.getAttribute('aria-pressed')).toBe('true');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');

    toggle?.click();
    fixture.detectChanges();

    expect(document.body.classList.contains('light-theme')).toBe(false);
    expect(toggle?.getAttribute('aria-pressed')).toBe('false');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
    document.body.classList.remove('light-theme');
  });
});
