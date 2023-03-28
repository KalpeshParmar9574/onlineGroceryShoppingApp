import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductdataService } from 'src/app/services/productdata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productsData: any[]=[];
  category_prod_data: any[]=[];
  type!: any;
  constructor(private route: ActivatedRoute, private prodData: ProductdataService) { 
        
    
    this.type = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
    this.prodData.getData().subscribe((data) => {
    
      this.productsData = Object.values(data) 
     
      
    }, (error) => {
      console.log("error");
      
    }
    );
   
 
    if (this.type !== 'all') {

      

     console.log(  this._filter());
    
      
    } else {
      this.category_prod_data = this.productsData;
      
  }
  
  }

  _filter(): any {
    
    return
  }

}
