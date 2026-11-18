import { Component } from '@angular/core';
import { SiteNavigation } from './layout/site-navigation/site-navigation';
import { About } from './sections/about/about';
import { Courses } from './sections/courses/courses';
import { Education } from './sections/education/education';
import { Experience } from './sections/experience/experience';
import { Interests } from './sections/interests/interests';
import { Recommendations } from './sections/recommendations/recommendations';
import { Skills } from './sections/skills/skills';

@Component({
  imports: [
    SiteNavigation,
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
export class App {}
