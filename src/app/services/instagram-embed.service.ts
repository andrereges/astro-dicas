import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class InstagramEmbedService {
  private loading?: Promise<void>;

  load(): Promise<void> {
    if ((window as any).instgrm?.Embeds) {
      return Promise.resolve();
    }

    if (!this.loading) {
      this.loading = new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }

    return this.loading;
  }

  process() {
    (window as any).instgrm?.Embeds?.process();
  }
}