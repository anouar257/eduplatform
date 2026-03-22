import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TermVm = {
  id: string;
  term: string;
  definition: string;
  category: string;
  subject: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  isLoading = signal(false);
  submitted = signal(false);

  contactForm = signal({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  subjects = signal([
    'Question générale',
    'Support technique',
    'Inscription',
    'Cours',
    'Facturation',
    'Autre'
  ]);

  submitForm() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.submitted.set(true);
    }, 1500);
  }

  resetForm() {
    this.contactForm.set({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    this.submitted.set(false);
  }
}
