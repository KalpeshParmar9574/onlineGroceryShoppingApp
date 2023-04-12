import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @Input() data!: string
  display: boolean = false;
  ngOnInit() {
    this._categoryDisplay()
  }
  _categoryDisplay() {
    if (this.data == '1' || this.data == '2' || this.data == '3' || this.data == '4' || this.data == '5' || this.data == '6') {
      this.display=true
    }
  }
}
