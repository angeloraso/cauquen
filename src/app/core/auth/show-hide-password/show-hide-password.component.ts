import { Component, ContentChild, ElementRef } from '@angular/core';
@Component({
  selector: 'cauquen-show-hide-password',
  templateUrl: './show-hide-password.html',
  styleUrls: ['./show-hide-password.css']
})
export class ShowHidePasswordComponent {
  @ContentChild('showHidePasswordInput') showHidePasswordInput: ElementRef | null = null;
  showPassword = false;

  toggleShow() {
    this.showPassword = !this.showPassword;
    if (this.showHidePasswordInput) {
      this.showHidePasswordInput.nativeElement.type = this.showPassword ? 'text' : 'password';
    }
  }
}
