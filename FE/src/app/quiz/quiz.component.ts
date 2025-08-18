import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  selectedAnswer: string | null = null;
  fullName: string = '';
  termsAccepted: boolean = false;
  showTermsModal: boolean = false;

  isFormValid(): boolean {
    return this.selectedAnswer !== null && this.fullName.trim().length > 0 && this.termsAccepted;
  }

  submit() {
    console.log('Answer:', this.selectedAnswer);
    if (this.selectedAnswer === 'Other') {
      console.log('Full Name:', this.fullName);
    }
    alert('Submitted successfully!');
  }


  openTerms() {
    this.showTermsModal = true;
  }

  closeTerms() {
    this.showTermsModal = false;
  }
}
