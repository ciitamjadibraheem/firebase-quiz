import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Firestore, collection, addDoc, doc, getDoc, setDoc} from '@angular/fire/firestore';
import {AuthService} from "../auth/auth.service";

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
export class QuizComponent implements OnInit {
  selectedAnswer: string | null = null;
  fullName: string = '';
  termsAccepted: boolean = false;
  showTermsModal: boolean = false;
  loading: boolean = false;
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;
  alreadySubmitted = false;


  constructor(  private firestore: Firestore,
                private authService: AuthService) {}

  async ngOnInit() {
    this.loading = true;
    const user = await this.authService.getOrCreateUser();

    const docRef = doc(this.firestore, 'quizSubmissions', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      this.alreadySubmitted = true;
      this.selectedAnswer = data['answer'];
      this.fullName = data['fullName'];
    } else {
      this.alreadySubmitted = false;
    }
    this.loading = false;
  }
  isFormValid(): boolean {
    return this.selectedAnswer !== null && this.fullName.trim().length > 0 && this.termsAccepted;
  }

  async submit() {
    this.loading = true; // show loading overlay
    try {

      const user = await this.authService.getOrCreateUser();
      await setDoc(doc(this.firestore, 'quizSubmissions', user.uid), {
        answer: this.selectedAnswer,
        fullName: this.fullName,
        timestamp: new Date()
      });

      this.showSuccessModal = true;
    } catch (error) {
      this.showErrorModal = true;
    } finally {
      this.loading = false;
    }
  }


  openTerms() {
    this.showTermsModal = true;
  }

  closeTerms() {
    this.showTermsModal = false;
  }

  closeSuccess() {
    this.showSuccessModal = false;
    this.alreadySubmitted = true;
  }
  closeError() {
    this.showErrorModal = false;
  }
}
