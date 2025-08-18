import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
  loading: boolean = false;
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;


  constructor(private firestore: Firestore) {}

  isFormValid(): boolean {
    return this.selectedAnswer !== null && this.fullName.trim().length > 0 && this.termsAccepted;
  }

  async submit() {
    this.loading = true; // show loading overlay
    try {
      const submissions = collection(this.firestore, 'quizSubmissions');
      await addDoc(submissions, {
        answer: this.selectedAnswer,
        fullName:  this.fullName,
        timestamp: new Date(),
      });

      this.resetForm();
      this.showSuccessModal = true;
    } catch (error) {
      this.showErrorModal = true;
    } finally {
      this.loading = false;
    }
  }


  resetForm() {
    this.selectedAnswer = null;
    this.fullName = '';
    this.termsAccepted = false;
  }

  openTerms() {
    this.showTermsModal = true;
  }

  closeTerms() {
    this.showTermsModal = false;
  }

  closeSuccess() {
    this.showSuccessModal = false;
  }
  closeError() {
    this.showErrorModal = false;
  }
}
