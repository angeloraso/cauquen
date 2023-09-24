import { Component, Input } from '@angular/core';

@Component({
  selector: 'cauquen-title',
  templateUrl: 'title.html',
  styleUrls: ['title.css']
})
export class TitleComponent {
  @Input() title: string = '';
}
