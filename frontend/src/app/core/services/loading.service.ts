import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = signal(0);
  
  public isLoading = signal(false);

  show() {
    this.loadingCount.update(count => count + 1);
    this.isLoading.set(this.loadingCount() > 0);
  }

  hide() {
    this.loadingCount.update(count => Math.max(0, count - 1));
    this.isLoading.set(this.loadingCount() > 0);
  }
}
