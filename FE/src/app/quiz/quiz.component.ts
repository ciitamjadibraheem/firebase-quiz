import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Firestore, collection, addDoc, doc, getDoc, setDoc} from '@angular/fire/firestore';
import {AuthService} from "../auth/auth.service";

/**
 * QuizComponent - Handles the Firebase quiz functionality
 *
 * This component manages a simple quiz about Firebase, allowing users to:
 * - Select an answer from multiple choices
 * - Submit their name along with their answer
 * - Accept terms and conditions
 * - Submit their response to Firestore
 * - View their previous submission if they've already completed the quiz
 */
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
  /** The user's selected answer to the quiz question */
  selectedAnswer: string | null = null;

  /** The user's full name */
  fullName: string = '';

  /** Whether the user has accepted the terms and conditions */
  termsAccepted: boolean = false;

  /** Controls the visibility of the terms and conditions modal */
  showTermsModal: boolean = false;

  /** Indicates whether data is being loaded or saved */
  loading: boolean = false;

  /** Controls the visibility of the success modal */
  showSuccessModal: boolean = false;

  /** Controls the visibility of the error modal */
  showErrorModal: boolean = false;

  /** Indicates whether the user has already submitted a response */
  alreadySubmitted = false;

  /**
   * Constructor for QuizComponent
   *
   * @param firestore - Firestore instance for database operations
   * @param authService - Service for handling user authentication
   */
  constructor(  private firestore: Firestore,
                private authService: AuthService) {}

  /**
   * Lifecycle hook that runs when the component initializes
   *
   * Checks if the user has already submitted a quiz response by:
   * 1. Getting the current user (or creating one if not exists)
   * 2. Checking Firestore for an existing submission
   * 3. Loading the previous submission data if it exists
   */
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

  /**
   * Validates the quiz form
   *
   * @returns true if all required fields are filled and terms are accepted, false otherwise
   */
  isFormValid(): boolean {
    return this.selectedAnswer !== null && this.fullName.trim().length > 0 && this.termsAccepted;
  }

  /**
   * Submits the quiz response to Firestore
   *
   * Saves the user's answer, name, and timestamp to the database.
   * Shows a success modal on successful submission or an error modal if submission fails.
   */
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

  /**
   * Opens the terms and conditions modal
   */
  openTerms() {
    this.showTermsModal = true;
  }

  /**
   * Closes the terms and conditions modal
   */
  closeTerms() {
    this.showTermsModal = false;
  }

  /**
   * Closes the success modal and marks the quiz as submitted
   */
  closeSuccess() {
    this.showSuccessModal = false;
    this.alreadySubmitted = true;
  }

  /**
   * Closes the error modal
   */
  closeError() {
    this.showErrorModal = false;
  }
}
