import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  constructor(
  private router: Router
  ) { }
  ngOnInit() {
    setInterval(() => {
      this._navigateToHome()
    },5000)
  }
  _navigateToHome() {
   this.router.navigate(['/home']);
 } 
}
