import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  imports: [TranslatePipe],
  selector: 'app-interests',
  styleUrl: './interests.css',
  templateUrl: './interests.html',
})
export class Interests {}
