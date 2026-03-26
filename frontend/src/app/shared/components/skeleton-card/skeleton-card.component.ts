import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-card" [class.skeleton-horizontal]="variant === 'horizontal'">
      <!-- Image placeholder -->
      <div class="skeleton-image skeleton-shimmer"></div>
      
      <!-- Content placeholders -->
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-title skeleton-shimmer"></div>
        <div class="skeleton-line skeleton-subtitle skeleton-shimmer"></div>
        <div class="skeleton-line skeleton-text skeleton-shimmer"></div>
        <div class="skeleton-footer">
          <div class="skeleton-circle skeleton-shimmer"></div>
          <div class="skeleton-line skeleton-small skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      background: var(--bg-primary, #ffffff);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    :host-context(.dark) .skeleton-card {
      background: rgba(30, 30, 40, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .skeleton-image {
      width: 100%;
      height: 180px;
      border-radius: 16px 16px 0 0;
    }

    .skeleton-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skeleton-line {
      border-radius: 8px;
      height: 14px;
    }

    .skeleton-title {
      width: 80%;
      height: 18px;
    }

    .skeleton-subtitle {
      width: 60%;
    }

    .skeleton-text {
      width: 90%;
    }

    .skeleton-small {
      width: 40%;
      height: 12px;
    }

    .skeleton-footer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .skeleton-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .skeleton-shimmer {
      background: linear-gradient(
        110deg,
        #f0f0f0 8%,
        #e0e0e0 18%,
        #f0f0f0 33%
      );
      background-size: 200% 100%;
      animation: shimmerSlide 1.5s ease-in-out infinite;
    }

    :host-context(.dark) .skeleton-shimmer {
      background: linear-gradient(
        110deg,
        rgba(255, 255, 255, 0.06) 8%,
        rgba(255, 255, 255, 0.12) 18%,
        rgba(255, 255, 255, 0.06) 33%
      );
      background-size: 200% 100%;
    }

    .skeleton-horizontal {
      display: flex;
      flex-direction: row;
    }

    .skeleton-horizontal .skeleton-image {
      width: 200px;
      height: auto;
      min-height: 140px;
      border-radius: 16px 0 0 16px;
    }

    .skeleton-horizontal .skeleton-body {
      flex: 1;
    }

    @keyframes shimmerSlide {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonCardComponent {
  @Input() variant: 'vertical' | 'horizontal' = 'vertical';
}
