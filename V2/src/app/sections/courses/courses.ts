import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  imports: [MatCardModule, TranslatePipe],
  selector: 'app-courses',
  styleUrl: './courses.css',
  templateUrl: './courses.html',
})
export class Courses {}
