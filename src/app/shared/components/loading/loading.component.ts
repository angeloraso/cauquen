import { Component, Input } from '@angular/core';
@Component({
  selector: 'cauquen-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.css']
})
export class LoadingComponent {
  @Input() show: boolean = false;
}
