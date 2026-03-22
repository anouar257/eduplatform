import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      <div *ngFor="let toast of toastService.messages()"
           class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[300px] animate-slide-in-right transition-all">
        <div class="text-2xl">{{ toast.icon }}</div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-gray-800" [ngClass]="{
            'text-green-600': toast.type === 'success',
            'text-red-600': toast.type === 'error',
            'text-blue-600': toast.type === 'info',
            'text-orange-600': toast.type === 'warning'
          }">
            {{ toast.type === 'success' ? 'Succès' : 
               toast.type === 'error' ? 'Erreur' : 
               toast.type === 'warning' ? 'Attention' : 'Information' }}
          </p>
          <p class="text-sm text-gray-600">{{ toast.message }}</p>
        </div>
        <button (click)="toastService.remove(toast.id)" class="text-gray-400 hover:text-gray-600 p-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ToastComponent {
  toastService = inject(ToastService);
}
