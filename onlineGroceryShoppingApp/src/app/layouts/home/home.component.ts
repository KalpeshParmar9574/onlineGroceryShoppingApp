import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../../services/productdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  spinner: boolean = true;
  featureProdData!: any[];
  categories!: any[];
  constructor(private productServices: ProductdataService,private router:Router ) { 
  }
  

  
  ngOnInit() {
    window.scroll(0, 0) 
   
    setTimeout(() => {
      this.spinner=false;
    }, 3000);
    this._getAllCategories()
    this._getAllProducts()
  }

 

  navigate() {
    this.router.navigate(['./categories/category','all'])

  }
// get categories data 
  _getAllCategories() { 


  this.productServices._getAllCategories().subscribe((res) => { 
    if (res) { 
      this.categories=res.data
      console.log((this.categories));
      
    }
  }, (error: any) => {
    console.log(error);
    
  })
 
  }

  _getAllProducts() {
    debugger
    this.productServices._getAllProducts().subscribe((res) => { 
      if (res.status == 200) {
       this.featureProdData=res.data
     } 
    },(error)=>{console.log(error);
    })
  }
  
  _onCategoryCardClick(slug:any) {
    this.router.navigate(['./categories/category',slug])
  }
}


