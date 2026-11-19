import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  imports: [MatCardModule, TranslatePipe],
  selector: 'app-experience',
  styleUrl: './experience.css',
  templateUrl: './experience.html',
})
export class Experience {}
