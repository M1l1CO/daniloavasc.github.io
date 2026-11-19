import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  imports: [MatCardModule, TranslatePipe],
  selector: 'app-recommendations',
  styleUrl: './recommendations.css',
  templateUrl: './recommendations.html',
})
export class Recommendations {}
