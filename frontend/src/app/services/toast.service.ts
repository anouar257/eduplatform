import { Injectable, signal, computed } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  icon: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSignal = signal<ToastMessage[]>([]);
  public messages = computed(() => this.messagesSignal());
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    const id = ++this.counter;
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    const toast: ToastMessage = { id, message, type, icon, duration };
    
    this.messagesSignal.update(msgs => [...msgs, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  remove(id: number) {
    this.messagesSignal.update(msgs => msgs.filter(m => m.id !== id));
  }
}
