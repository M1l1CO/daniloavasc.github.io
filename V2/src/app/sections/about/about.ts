import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnDestroy {
  @ViewChild('profileAvatar') private profileAvatar?: ElementRef<HTMLImageElement>;
  @ViewChild('profileCopy') private profileCopy?: ElementRef<HTMLElement>;

  readonly coverSlides = [
    {
      before: 'ENGENHARIA QUE ',
      highlight: 'MOVE',
      after: ' SISTEMAS CRÍTICOS.',
      description: 'Engenharia de software para plataformas financeiras e operações críticas.',
    },
    {
      before: 'TECNOLOGIA FINANCEIRA. FEITA PARA ',
      highlight: 'CONFIAR',
      after: '.',
      description: 'C#/.NET, Angular e microsserviços com foco em qualidade e segurança.',
    },
    {
      before: 'SOFTWARE QUE ',
      highlight: 'PROTEGE',
      after: ' E ESCALA.',
      description: 'Prevenção a fraudes, sistemas distribuídos e entrega contínua.',
    },
  ];

  minProfilePosition = 0;
  maxProfilePosition = 100;
  profilePosition = 0;
  profileCopyOffset = 0;
  isDragging = false;
  activeCoverSlide = 0;
  coverRotationEnabled = true;
  coverRotationScheduled = false;
  prefersReducedMotion = true;
  coverPointerX = 50;
  coverPointerY = 50;

  private activePointerId: number | null = null;
  private dragStartX = 0;
  private dragStartPosition = 50;
  private dragPanelWidth = 0;
  private profilePanelWidth = 0;
  private initialProfilePosition = 0;
  private initialProfileCopyOffset = 0;
  private coverRotationTimer: number | null = null;
  private coverPointerInside = false;
  private coverHasFocus = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    afterNextRender(() => {
      this.prefersReducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      this.scheduleCoverRotation();

      const avatar = this.profileAvatar?.nativeElement;
      const copy = this.profileCopy?.nativeElement;
      if (!avatar || !copy || !this.updatePositionBounds(avatar)) {
        return;
      }

      const panel = avatar.closest('.profile-panel');
      if (!(panel instanceof HTMLElement)) {
        return;
      }

      const copyInset = Number.parseFloat(getComputedStyle(copy).paddingLeft);
      const copyContentLeft =
        copy.getBoundingClientRect().left - panel.getBoundingClientRect().left + copyInset;
      this.initialProfileCopyOffset = Math.min(
        40,
        Math.max(12, this.profilePanelWidth * 0.03),
      );
      const avatarCenter =
        copyContentLeft +
        this.initialProfileCopyOffset +
        avatar.getBoundingClientRect().width / 2;
      this.initialProfilePosition = Math.min(
        this.maxProfilePosition,
        Math.max(this.minProfilePosition, (avatarCenter / this.profilePanelWidth) * 100),
      );
      this.setProfilePosition(this.initialProfilePosition);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.clearCoverRotationTimer();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  get profilePositionText(): string {
    if (Math.abs(this.profilePosition - this.initialProfilePosition) < 0.1) {
      return 'Alinhado com o início do texto';
    }

    return `Foto a ${Math.round(this.profilePosition)}% da esquerda`;
  }

  trackCoverPointer(event: PointerEvent): void {
    if (event.pointerType === 'touch' || !(event.currentTarget instanceof HTMLElement)) {
      return;
    }

    const coverBounds = event.currentTarget.getBoundingClientRect();
    if (coverBounds.width === 0 || coverBounds.height === 0) {
      return;
    }

    this.coverPointerX = Math.min(
      100,
      Math.max(0, ((event.clientX - coverBounds.left) / coverBounds.width) * 100),
    );
    this.coverPointerY = Math.min(
      100,
      Math.max(0, ((event.clientY - coverBounds.top) / coverBounds.height) * 100),
    );
  }

  resetCoverPointer(): void {
    this.coverPointerX = 50;
    this.coverPointerY = 50;
  }

  pauseCoverRotation(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      return;
    }

    this.coverPointerInside = true;
    this.clearCoverRotationTimer();
  }

  resumeCoverRotation(): void {
    this.coverPointerInside = false;
    this.scheduleCoverRotation();
  }

  pauseCoverRotationForFocus(): void {
    this.coverHasFocus = true;
    this.clearCoverRotationTimer();
  }

  resumeCoverRotationAfterFocus(event: FocusEvent): void {
    const cover = event.currentTarget;
    if (cover instanceof HTMLElement && event.relatedTarget instanceof Node && cover.contains(event.relatedTarget)) {
      return;
    }

    this.coverHasFocus = false;
    this.scheduleCoverRotation();
  }

  toggleCoverRotation(): void {
    this.coverRotationEnabled = !this.coverRotationEnabled;
    this.clearCoverRotationTimer();
    this.scheduleCoverRotation();
  }

  selectCoverSlide(index: number): void {
    if (index < 0 || index >= this.coverSlides.length) {
      return;
    }

    this.activeCoverSlide = index;
    this.clearCoverRotationTimer();
    this.scheduleCoverRotation();
  }

  previousCoverSlide(): void {
    this.selectCoverSlide(
      (this.activeCoverSlide + this.coverSlides.length - 1) % this.coverSlides.length,
    );
  }

  nextCoverSlide(): void {
    this.selectCoverSlide((this.activeCoverSlide + 1) % this.coverSlides.length);
  }

  private scheduleCoverRotation(): void {
    if (
      this.coverRotationTimer !== null ||
      this.prefersReducedMotion ||
      !this.coverRotationEnabled ||
      this.coverPointerInside ||
      this.coverHasFocus ||
      document.hidden
    ) {
      return;
    }

    this.coverRotationTimer = window.setTimeout(() => {
      this.coverRotationTimer = null;
      this.coverRotationScheduled = false;
      this.activeCoverSlide = (this.activeCoverSlide + 1) % this.coverSlides.length;
      this.scheduleCoverRotation();
      this.changeDetectorRef.markForCheck();
    }, 8000);
    this.coverRotationScheduled = true;
  }

  private clearCoverRotationTimer(): void {
    if (this.coverRotationTimer !== null) {
      window.clearTimeout(this.coverRotationTimer);
      this.coverRotationTimer = null;
    }

    this.coverRotationScheduled = false;
  }

  private readonly handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.clearCoverRotationTimer();
      return;
    }

    this.scheduleCoverRotation();
  };

  startDrag(event: PointerEvent): void {
    if (
      event.button !== 0 ||
      !(event.currentTarget instanceof HTMLElement) ||
      !this.updatePositionBounds(event.currentTarget)
    ) {
      return;
    }

    event.preventDefault();
    this.activePointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartPosition = this.profilePosition;
    const panel = event.currentTarget.closest('.profile-panel');
    this.dragPanelWidth = panel instanceof HTMLElement ? panel.clientWidth : 0;
    this.isDragging = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  moveDrag(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) {
      return;
    }

    if (this.dragPanelWidth > 0) {
      const positionDelta = ((event.clientX - this.dragStartX) / this.dragPanelWidth) * 100;
      this.setProfilePosition(this.dragStartPosition + positionDelta);
    }
  }

  endDrag(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) {
      return;
    }

    this.activePointerId = null;
    this.isDragging = false;

    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  adjustPosition(event: KeyboardEvent): void {
    if (
      !(event.currentTarget instanceof HTMLElement) ||
      !this.updatePositionBounds(event.currentTarget)
    ) {
      return;
    }

    let position = this.profilePosition;

    switch (event.key) {
      case 'ArrowLeft':
        position -= 4;
        break;
      case 'ArrowRight':
        position += 4;
        break;
      case 'Home':
        position = this.minProfilePosition;
        break;
      case 'End':
        position = this.maxProfilePosition;
        break;
      case 'Escape':
        position = this.initialProfilePosition;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.setProfilePosition(position);
  }

  resetProfilePosition(): void {
    this.setProfilePosition(this.initialProfilePosition);
  }

  downloadResume(): void {
    const name = this.getText(document.querySelector('#about h1'));
    const role = this.getText(document.querySelector('#about .profile-role'));
    const location = this.getText(document.querySelector('#about .profile-location'));
    const summary = this.getText(document.querySelector('#about .professional-summary'));

    if (!name || !role || !summary) {
      window.alert(
        'Não foi possível montar o currículo: os dados do perfil não foram encontrados.',
      );
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.alert('Permita a abertura de pop-ups para gerar o currículo em PDF.');
      return;
    }

    const contacts = [
      { label: 'E-mail', selector: '#about .profile-action--email' },
      { label: 'LinkedIn', selector: '#about .profile-action--linkedin' },
      { label: 'GitHub', selector: '#about .profile-action--github' },
    ]
      .map(({ label, selector }) => {
        const link = document.querySelector<HTMLAnchorElement>(selector);
        return link ? `<a href="${this.escapeHtml(link.href)}">${label}</a>` : '';
      })
      .filter(Boolean)
      .join('<span aria-hidden="true">·</span>');

    const experiences = Array.from(
      document.querySelectorAll<HTMLElement>('#experience .experience-card'),
    )
      .map((card) => {
        const company = card.querySelector('.company-name');
        const companyName = company?.cloneNode(true);
        if (companyName instanceof HTMLElement) {
          companyName.querySelector('.experience-current-badge')?.remove();
        }
        const description = this.getText(card.querySelector('.experience-card__body p'));
        const date = this.getText(card.querySelector('.experience-date'));
        const details = [
          this.getText(card.querySelector('.experience-location')),
          this.getText(card.querySelector('.experience-domain')),
        ].filter(Boolean);

        return {
          company: companyName instanceof HTMLElement ? this.getText(companyName) : '',
          role: this.getText(card.querySelector('.company-role-label')),
          current: Boolean(card.querySelector('.experience-current-badge')),
          date: /início a informar|a confirmar/i.test(date) ? '' : date,
          details: details.join(' · '),
          description: /^Descrição da experiência será adicionada\.?$/i.test(description)
            ? ''
            : description,
        };
      })
      .filter(({ company, role }) => company && role)
      .map(
        ({ company, role: experienceRole, current, date, details, description }) => `
          <article class="experience">
            <header>
              <div>
                <h3>${this.escapeHtml(company)}</h3>
                <p class="experience-role">${this.escapeHtml(experienceRole)}${current ? ' · Atual' : ''}</p>
              </div>
              ${date ? `<p class="date">${this.escapeHtml(date)}</p>` : ''}
            </header>
            ${details ? `<p class="meta">${this.escapeHtml(details)}</p>` : ''}
            ${description ? `<p>${this.escapeHtml(description)}</p>` : ''}
          </article>
        `,
      )
      .join('');

    const education = Array.from(
      document.querySelectorAll<HTMLElement>('#education .education-card'),
    )
      .map((card) => ({
        institution: this.getText(card.querySelector('.education-card__school h3')),
        degree: this.getText(card.querySelector('.education-card__school p')),
        description: this.getText(card.querySelector('.education-card__body p')),
        date: this.getText(card.querySelector('.education-date')),
      }))
      .filter(({ institution, degree }) => institution && degree)
      .map(
        ({ institution, degree, description, date }) => `
          <article class="education">
            <header>
              <div>
                <h3>${this.escapeHtml(degree)}</h3>
                <p class="experience-role">${this.escapeHtml(institution)}</p>
              </div>
              ${date ? `<p class="date">${this.escapeHtml(date)}</p>` : ''}
            </header>
            ${description ? `<p>${this.escapeHtml(description)}</p>` : ''}
          </article>
        `,
      )
      .join('');

    const skillGroups = Array.from(document.querySelectorAll<HTMLElement>('#skills .skill-cluster'))
      .map((group) => {
        const title = this.getText(group.querySelector('.skill-cluster__title'));
        const skills = Array.from(group.querySelectorAll('.skill-name'))
          .map((skill) => this.getText(skill))
          .filter(Boolean);
        return title && skills.length
          ? `<p><strong>${this.escapeHtml(title)}:</strong> ${this.escapeHtml(skills.join(', '))}</p>`
          : '';
      })
      .filter(Boolean)
      .join('');

    const extraSkills = Array.from(
      document.querySelectorAll<HTMLElement>('#skills .skill-keywords p'),
    )
      .map((item) => this.getText(item))
      .filter(Boolean)
      .map((item) => `<p>${this.escapeHtml(item)}</p>`)
      .join('');

    const courses = Array.from(document.querySelectorAll<HTMLElement>('#awards .course-card'))
      .map((card) => ({
        title: this.getText(card.querySelector('h3')),
        provider: this.getText(card.querySelector('[mat-card-subtitle]')),
      }))
      .filter(({ title }) =>
        ['.NET 6: Criando uma Web API', 'Testes em .NET', 'SOLID com C#'].some((highlight) =>
          title.includes(highlight),
        ),
      )
      .map(
        ({ title, provider }) =>
          `<li>${this.escapeHtml(title)}${provider ? ` — ${this.escapeHtml(provider)}` : ''}</li>`,
      )
      .join('');

    printWindow.onload = () => printWindow.print();
    printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true });
    printWindow.document.open();
    printWindow.document.write(`<!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Currículo - ${this.escapeHtml(name)}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            * { box-sizing: border-box; }
            body { margin: 0; color: #263238; font: 10pt/1.45 Arial, sans-serif; }
            h1, h2, h3, p { margin: 0; }
            .header { padding: 0 0 14px; border-bottom: 3px solid #bd5d38; }
            h1 { color: #20272b; font-size: 25pt; line-height: 1.15; }
            .role { margin-top: 5px; color: #8d4127; font-size: 12pt; font-weight: 700; }
            .location { margin-top: 4px; color: #536168; }
            .contacts { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; font-size: 9pt; }
            a { color: #8d4127; text-decoration: none; }
            .summary { margin-top: 12px; }
            section { margin-top: 15px; }
            h2 { margin-bottom: 7px; padding-bottom: 4px; border-bottom: 1px solid #d6dce0; color: #8d4127; font-size: 12pt; text-transform: uppercase; letter-spacing: .04em; }
            article { margin: 0 0 10px; break-inside: avoid; }
            article header { display: flex; justify-content: space-between; gap: 14px; }
            h3 { color: #20272b; font-size: 10.5pt; }
            article p { margin-top: 3px; }
            .experience-role { color: #536168; font-weight: 700; }
            .date, .meta { color: #536168; font-size: 9pt; }
            .date { flex: 0 0 auto; text-align: right; }
            .skills p { margin: 4px 0; }
            ul { margin: 0; padding-left: 18px; }
            li { margin: 3px 0; }
            @media screen {
              body { max-width: 210mm; min-height: 297mm; margin: 20px auto; padding: 15mm; box-shadow: 0 2px 18px #0002; }
            }
          </style>
        </head>
        <body>
          <header class="header">
            <h1>${this.escapeHtml(name)}</h1>
            <p class="role">${this.escapeHtml(role)}</p>
            ${location ? `<p class="location">${this.escapeHtml(location)}</p>` : ''}
            <nav class="contacts" aria-label="Contatos">${contacts}</nav>
          </header>
          <p class="summary">${this.escapeHtml(summary)}</p>
          ${experiences ? `<section><h2>Experiência profissional</h2>${experiences}</section>` : ''}
          ${education ? `<section><h2>Formação</h2>${education}</section>` : ''}
          ${skillGroups || extraSkills ? `<section class="skills"><h2>Competências</h2>${skillGroups}${extraSkills}</section>` : ''}
          ${courses ? `<section><h2>Formação complementar</h2><ul>${courses}</ul></section>` : ''}
        </body>
      </html>`);
    printWindow.document.close();
  }

  private getText(element: Element | null): string {
    return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entities[character] ?? character;
    });
  }

  private updatePositionBounds(avatar: HTMLElement): boolean {
    const panel = avatar.closest('.profile-panel');
    if (!(panel instanceof HTMLElement) || panel.clientWidth === 0) {
      return false;
    }

    const halfAvatarPercent = (avatar.getBoundingClientRect().width / 2 / panel.clientWidth) * 100;
    this.profilePanelWidth = panel.clientWidth;
    this.minProfilePosition = halfAvatarPercent;
    this.maxProfilePosition = 100 - halfAvatarPercent;
    this.setProfilePosition(this.profilePosition);
    return true;
  }

  private setProfilePosition(position: number): void {
    this.profilePosition = Math.min(
      this.maxProfilePosition,
      Math.max(this.minProfilePosition, position),
    );

    const maxCopyOffset = Math.min(96, Math.max(12, (this.profilePanelWidth - 320) * 0.1));
    const positionRange = this.maxProfilePosition - this.minProfilePosition;
    this.profileCopyOffset =
      this.initialProfileCopyOffset +
      (positionRange > 0
        ? ((this.profilePosition - this.initialProfilePosition) / positionRange) * maxCopyOffset
        : 0);
  }
}
