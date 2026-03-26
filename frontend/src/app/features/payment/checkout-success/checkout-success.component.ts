import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 py-20 px-4 flex items-center justify-center relative overflow-hidden">
      
      <!-- Confetti Particles -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div *ngFor="let p of confettiPieces" 
             class="absolute w-3 h-3 rounded-sm animate-confetti"
             [style.left]="p.left"
             [style.background]="p.color"
             [style.animation-delay]="p.delay"
             [style.animation-duration]="p.duration">
        </div>
      </div>

      <!-- Success Card -->
      <div class="relative z-10 mx-auto max-w-lg w-full animate-fade-in-up">
        <div class="rounded-3xl border border-gray-200 bg-white p-10 shadow-xl text-center">
          
          <!-- Animated Checkmark Circle -->
          <div class="mx-auto mb-8 relative">
            <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30 animate-bounce-in">
              <svg class="w-12 h-12 text-white animate-draw-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <!-- Pulse Ring -->
            <div class="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-400/30 animate-ping-slow"></div>
          </div>

          <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Paiement Réussi ! 🎉</h1>
          <p class="text-gray-600 mb-8 text-lg">Bienvenue dans l'aventure de l'apprentissage premium</p>

          <!-- Receipt Summary -->
          <div class="rounded-2xl bg-gray-50 border border-gray-100 p-6 mb-8 text-left">
            <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Reçu de paiement</h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Cours</span>
                <span class="font-semibold text-gray-900">Algèbre — Bases et exercices</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Formule</span>
                <span class="font-semibold text-gray-900">Premium Mensuel</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Date</span>
                <span class="font-semibold text-gray-900">{{ today }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3 flex justify-between">
                <span class="font-bold text-gray-900">Total payé</span>
                <span class="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#1A73E8] to-[#FF6D00]">19.99 €</span>
              </div>
            </div>
          </div>

          <!-- What's Next -->
          <div class="grid grid-cols-3 gap-3 mb-8">
            <div class="rounded-xl bg-blue-50 p-4 text-center">
              <span class="text-2xl block mb-1">📚</span>
              <p class="text-xs font-semibold text-gray-700">12 Leçons<br>débloquées</p>
            </div>
            <div class="rounded-xl bg-orange-50 p-4 text-center">
              <span class="text-2xl block mb-1">🎓</span>
              <p class="text-xs font-semibold text-gray-700">Certificat<br>inclus</p>
            </div>
            <div class="rounded-xl bg-green-50 p-4 text-center">
              <span class="text-2xl block mb-1">💬</span>
              <p class="text-xs font-semibold text-gray-700">Support<br>prioritaire</p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <a routerLink="/dashboard" 
             class="block w-full rounded-xl bg-gradient-to-br from-[#1A73E8] to-[#FF6D00] px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-xl shadow-lg mb-3">
            Commencer à apprendre maintenant →
          </a>
          <a routerLink="/courses" class="block text-sm font-semibold text-[#1A73E8] hover:underline transition-all">
            Explorer d'autres cours
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes confetti-fall {
      0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    .animate-confetti {
      animation: confetti-fall 4s ease-in-out forwards;
    }
    @keyframes bounce-in {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .animate-bounce-in {
      animation: bounce-in 0.6s ease-out forwards;
    }
    @keyframes ping-slow {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    .animate-ping-slow {
      animation: ping-slow 2s ease-out infinite;
    }
    @keyframes draw-check {
      0% { stroke-dashoffset: 30; }
      100% { stroke-dashoffset: 0; }
    }
    .animate-draw-check {
      stroke-dasharray: 30;
      animation: draw-check 0.8s ease-out 0.3s forwards;
    }
  `]
})
export class CheckoutSuccessComponent implements OnInit {
  today = '';
  confettiPieces: { left: string; color: string; delay: string; duration: string }[] = [];

  ngOnInit() {
    this.today = new Date().toLocaleDateString('fr-FR', { 
      day: 'numeric', month: 'long', year: 'numeric' 
    });

    // Generate confetti
    const colors = ['#1A73E8', '#FF6D00', '#34A853', '#FBBC04', '#EA4335', '#ff6b9d', '#c44dff'];
    this.confettiPieces = Array.from({ length: 40 }, (_, i) => ({
      left: Math.random() * 100 + '%',
      color: colors[i % colors.length],
      delay: (Math.random() * 2) + 's',
      duration: (3 + Math.random() * 3) + 's'
    }));
  }
}
