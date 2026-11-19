import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  imports: [MatCardModule, TranslatePipe],
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
})
export class Education {}
