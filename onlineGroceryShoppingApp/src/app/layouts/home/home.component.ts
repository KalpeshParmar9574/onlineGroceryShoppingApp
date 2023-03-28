import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../../services/productdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private productDataServices: ProductdataService,private router:Router ) { 
  }
  

  featureProdData!: any[];
  ngOnInit() {
    window.scroll(0, 0)
    // this is service which is make an api request to the server and get thefeature product data
    this.featureProdData = this.productDataServices.getFeatureProducts();
    console.log(this.featureProdData)
  }
  navigate() {
    this.router.navigate(['./categories/category','all'])

  }
}
