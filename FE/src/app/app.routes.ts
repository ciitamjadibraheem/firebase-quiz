import {provideRouter, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";

export const routes: Routes = [
  { path: '', component: QuizComponent },
];

export const appRouter = provideRouter(routes);
