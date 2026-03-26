import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.messages(); track toast.id) {
        <div class="toast-item" [class]="'toast-' + toast.type">
          <!-- Colored accent bar -->
          <div class="toast-accent" [class]="'accent-' + toast.type"></div>
          
          <!-- Icon -->
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('success') { <span>✅</span> }
              @case ('error') { <span>❌</span> }
              @case ('warning') { <span>⚠️</span> }
              @default { <span>ℹ️</span> }
            }
          </div>
          
          <!-- Content -->
          <div class="toast-content">
            <p class="toast-title">
              {{ toast.type === 'success' ? 'Succès' : 
                 toast.type === 'error' ? 'Erreur' : 
                 toast.type === 'warning' ? 'Attention' : 'Information' }}
            </p>
            <p class="toast-message">{{ toast.message }}</p>
          </div>
          
          <!-- Close button -->
          <button class="toast-close" (click)="toastService.remove(toast.id)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Progress bar -->
          <div class="toast-progress">
            <div class="toast-progress-bar" [class]="'progress-' + toast.type"
                 [style.animation-duration.ms]="toast.duration || 3000"></div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
    }

    .toast-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 14px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: toastSlideIn 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(12px);
      min-width: 340px;
    }

    :host-context(.dark) .toast-item {
      background: rgba(30, 30, 40, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .toast-item:not(:host-context(.dark) *) {
      background: rgba(255, 255, 255, 0.97);
      border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .toast-accent {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      border-radius: 4px 0 0 4px;
    }
    .accent-success { background: linear-gradient(180deg, #10b981, #059669); }
    .accent-error { background: linear-gradient(180deg, #ef4444, #dc2626); }
    .accent-warning { background: linear-gradient(180deg, #f59e0b, #d97706); }
    .accent-info { background: linear-gradient(180deg, #3b82f6, #2563eb); }

    .toast-icon {
      font-size: 1.4rem;
      flex-shrink: 0;
      margin-top: 2px;
      animation: iconPop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.15s both;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-weight: 700;
      font-size: 0.85rem;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    :host-context(.dark) .toast-title { color: #e5e7eb; }
    .toast-title { color: #1f2937; }

    .toast-success .toast-title { color: #059669; }
    .toast-error .toast-title { color: #dc2626; }
    .toast-warning .toast-title { color: #d97706; }
    .toast-info .toast-title { color: #2563eb; }

    .toast-message {
      font-size: 0.875rem;
      margin: 4px 0 0;
      line-height: 1.4;
    }

    :host-context(.dark) .toast-message { color: #9ca3af; }
    .toast-message { color: #6b7280; }

    .toast-close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 8px;
      transition: all 0.2s ease;
      color: #9ca3af;
      margin-top: 2px;
    }

    .toast-close:hover {
      background: rgba(107, 114, 128, 0.15);
      color: #374151;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0, 0, 0, 0.05);
    }

    .toast-progress-bar {
      height: 100%;
      border-radius: 0 0 14px 14px;
      animation: progressShrink linear forwards;
    }
    .progress-success { background: linear-gradient(90deg, #10b981, #34d399); }
    .progress-error { background: linear-gradient(90deg, #ef4444, #f87171); }
    .progress-warning { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .progress-info { background: linear-gradient(90deg, #3b82f6, #60a5fa); }

    @keyframes toastSlideIn {
      0% {
        transform: translateX(120%) scale(0.85);
        opacity: 0;
      }
      100% {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
    }

    @keyframes iconPop {
      0% { transform: scale(0) rotate(-45deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes progressShrink {
      0% { width: 100%; }
      100% { width: 0%; }
    }

    @media (max-width: 480px) {
      .toast-container {
        left: 16px;
        right: 16px;
        bottom: 16px;
      }
      .toast-item {
        min-width: unset;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
