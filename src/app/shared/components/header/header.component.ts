import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  previousScroll = 0;
  isHidden = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.previousScroll && currentScroll > 100) {
      this.isHidden = true;
    }

    if (currentScroll < this.previousScroll) {
      this.isHidden = false;
    }

    this.previousScroll = currentScroll;
  }
}
