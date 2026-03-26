import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

type PricingPlan = {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  currentStep = signal(1);
  isProcessing = signal(false);

  // Role awareness
  userRole = computed(() => this.authService.userRole);
  isParent = computed(() => this.userRole() === 'parent');

  // Parent's children (mock - will be fetched from API)
  children = signal([
    { id: 'ch1', name: 'Youssef', level: '2ème année' },
    { id: 'ch2', name: 'Sofia', level: '4ème année' }
  ]);
  selectedChildId = signal('');
  selectedPlan = signal<PricingPlan | null>(null);

  // Form fields
  cardName = signal('');
  cardNumber = signal('');
  cardExpiry = signal('');
  cardCvc = signal('');
  acceptTerms = signal(false);

  // Mock course data
  course = signal({
    id: 'c1',
    title: 'Algèbre — Bases et exercices',
    teacher: 'M. Amine',
    level: '2ème année BAC',
    lessonCount: 12,
    duration: '8h 30min',
    rating: 4.8,
    coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=60'
  });

  pricingPlans = signal<PricingPlan[]>([
    {
      id: 'single',
      name: 'Cours Unique',
      price: 49.99,
      period: 'une fois',
      features: ['Accès complet au cours', '12 leçons HD', 'Exercices corrigés', 'Certificat de réussite'],
      popular: false
    },
    {
      id: 'monthly',
      name: 'Premium Mensuel',
      price: 19.99,
      period: 'par mois',
      features: ['Accès à TOUS les cours', 'Sessions live illimitées', 'Support professeur prioritaire', 'Examens et corrections', 'Annulable à tout moment'],
      popular: true
    },
    {
      id: 'annual',
      name: 'Excellence Annuel',
      price: 9.99,
      period: 'par mois',
      features: ['Tout le plan Premium', 'Économisez 50%', 'Certificats officiels', 'Mentorat 1-à-1', 'Accès anticipé aux nouveaux cours'],
      popular: false
    }
  ]);

  // Computed: detect card type
  cardType = computed(() => {
    const num = this.cardNumber().replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return 'unknown';
  });

  // Computed: format card number with spaces
  formattedCardDisplay = computed(() => {
    const num = this.cardNumber().replace(/\s/g, '');
    if (!num) return '•••• •••• •••• ••••';
    return num.replace(/(.{4})/g, '$1 ').trim();
  });

  // Computed: validation
  isStep1Valid = computed(() => this.selectedPlan() !== null);
  isStep2Valid = computed(() => {
    return this.cardName().trim().length > 2 &&
           this.cardNumber().replace(/\s/g, '').length >= 16 &&
           this.cardExpiry().length === 5 &&
           this.cardCvc().length >= 3 &&
           this.acceptTerms();
  });

  selectPlan(plan: PricingPlan) {
    this.selectedPlan.set(plan);
  }

  nextStep() {
    if (this.currentStep() === 1 && this.isStep1Valid()) {
      this.currentStep.set(2);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  // Format card number input
  onCardNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.cardNumber.set(value);
  }

  // Format expiry input
  onExpiryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    this.cardExpiry.set(value);
  }

  // Format CVC input
  onCvcInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').substring(0, 4);
    this.cardCvc.set(value);
  }

  processPayment() {
    if (!this.isStep2Valid()) return;
    this.isProcessing.set(true);
    
    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing.set(false);
      this.router.navigate(['/checkout', this.course().id, 'success']);
    }, 2500);
  }
}
