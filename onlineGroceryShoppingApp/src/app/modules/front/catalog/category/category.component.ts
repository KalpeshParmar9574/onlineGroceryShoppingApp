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
  category_prod_data!:any;
  type!: any;
  constructor(private route: ActivatedRoute, private productService: ProductdataService) { 
    this.type = this.route.snapshot.paramMap.get('type');
   
  }

  ngOnInit() {  this._getProducts() }
  
  _getProducts() {
  
    if (this.type !== 'all') {
      this.productService._getProductsByCategories(this.type).subscribe((res) => {
        console.log(res);
        this.category_prod_data = res.data
       
        if (this.category_prod_data) {
          this.productsData = this.category_prod_data.map((item:any) => {
            return item.product
          })
          console.log(this.productsData);
          
        }
        
       
      }, (error) => {
        console.log(error);
        
      })
     
    }
    else {
          this.productService._getAllProducts().subscribe((res) => {
            this.productsData = res.data
            console.log(this.productsData);
            
      }, (error) => {
        console.log(error);
        
      })
    }
  }
  
    
    
  }

  


