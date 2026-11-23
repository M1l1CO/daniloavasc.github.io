import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SiteNavigation } from './layout/site-navigation/site-navigation';
import { Footer } from './shared/footer/footer';
import { About } from './sections/about/about';
import { Courses } from './sections/courses/courses';
import { Education } from './sections/education/education';
import { Experience } from './sections/experience/experience';
import { Interests } from './sections/interests/interests';
import { Recommendations } from './sections/recommendations/recommendations';
import { Skills } from './sections/skills/skills';

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  imports: [
    SiteNavigation,
    Footer,
    About,
    Experience,
    Education,
    Skills,
    Interests,
    Courses,
    Recommendations,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('ambientBackground') private ambientBackground?: ElementRef<HTMLCanvasElement>;

  private animationFrame: number | null = null;
  private backgroundContext: CanvasRenderingContext2D | null = null;
  private height = 0;
  private particles: BackgroundParticle[] = [];
  private pointer = { x: -1, y: -1 };
  private reducedMotion = false;
  private width = 0;

  ngAfterViewInit(): void {
    const canvas = this.ambientBackground?.nativeElement;
    if (!canvas) return;

    this.backgroundContext = canvas.getContext('2d');
    if (!this.backgroundContext) return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('resize', this.resizeBackground);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', this.handlePointerLeave);
    this.resizeBackground();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeBackground);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerleave', this.handlePointerLeave);

    if (this.animationFrame !== null) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  private readonly resizeBackground = (): void => {
    const canvas = this.ambientBackground?.nativeElement;
    if (!canvas || !this.backgroundContext) return;

    if (this.animationFrame !== null) {
      window.cancelAnimationFrame(this.animationFrame);
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = Math.round(this.width * pixelRatio);
    canvas.height = Math.round(this.height * pixelRatio);
    this.backgroundContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const particleCount = Math.min(110, Math.max(28, Math.round(this.width * this.height / 18000)));
    this.particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));

    this.drawBackground();
  };

  private readonly drawBackground = (): void => {
    const context = this.backgroundContext;
    if (!context) return;

    context.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((particle, index) => {
      if (!this.reducedMotion) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;
      }

      const pointerDistance = Math.hypot(particle.x - this.pointer.x, particle.y - this.pointer.y);
      const nearPointer = pointerDistance < 150;
      context.beginPath();
      context.arc(particle.x, particle.y, nearPointer ? 2 : 1.4, 0, Math.PI * 2);
      context.fillStyle = nearPointer ? 'rgba(255, 91, 109, 0.8)' : 'rgba(255, 91, 109, 0.42)';
      context.fill();

      for (let nextIndex = index + 1; nextIndex < this.particles.length; nextIndex++) {
        const nextParticle = this.particles[nextIndex];
        const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);
        if (distance < 125) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(nextParticle.x, nextParticle.y);
          context.strokeStyle = `rgba(255, 91, 109, ${(1 - distance / 125) * 0.2})`;
          context.stroke();
        }
      }

      if (nearPointer) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(this.pointer.x, this.pointer.y);
        context.strokeStyle = `rgba(255, 91, 109, ${(1 - pointerDistance / 150) * 0.32})`;
        context.stroke();
      }
    });

    this.animationFrame = this.reducedMotion
      ? null
      : window.requestAnimationFrame(this.drawBackground);
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.pointer = { x: event.clientX, y: event.clientY };
    if (this.reducedMotion) this.drawBackground();
  };

  private readonly handlePointerLeave = (): void => {
    this.pointer = { x: -1, y: -1 };
    if (this.reducedMotion) this.drawBackground();
  };
}
