import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductdataService {

  constructor( private http: HttpClient) { }
 
  serverURL = environment.serverURL;
  getAllProdsURL = environment.getAllProducts;
  getAllProdsByCategoriesURL = environment.getAllProdByCategories
  getProdsByIDURL=environment.getProdByID
  categoriesURL = environment.getCategoriesURL
  encryptionURL = environment.encryption

  // json-server routes
  baseURL = environment.baseURL;
  products = environment.products;

  
  // real apis and routes
  _getAllProducts() {
  try {
    return this.http.get<any>(this.serverURL+this.getAllProdsURL,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
  } catch (error:any) {
    return throwError(() => { new Error(error) })
  }
}

  _getAllCategories() {
    try {
       return this.http.get<any>(this.serverURL+this.categoriesURL,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
    } catch (error:any) {
      return throwError(() => { new Error(error) })
    }
  }

  _getProductsByCategories(slug: any) {
    // Call the encryption API with the provided slug
    return this.encription(slug).pipe(
      // Use the encrypted data in the getProductsByCategories API
      switchMap((res) => {
        if (res.status === 200) {
          // Store the encrypted data in a variable
          const encKey = res.data;
          console.log(encKey,"enc key");
          
          // Call the getProductsByCategories API with the encrypted data
          return this.http.get<any>(this.serverURL + this.getAllProdsByCategoriesURL, {
            headers: new HttpHeaders({
              'ngrok-skip-browser-warning': 'skip-browser-warning',
              'Access-Control-Allow-Origin': '*',
              'category_id': encKey,
            }),
          });
        } else {
          // Handle the case where the encryption API returns an error
          // For example, you can throw an error or return an empty Observable
          return throwError('Encryption failed');
        }
      })
    );
  }
  
// get product by id
  _getProductById(id: any) { 
    return this.encription(id).pipe(
      switchMap((res) => {
        if (res.status === 200) {
          const encyData = res.data;
          console.log(encyData, "product enc value");
          return this.http.get<any>(this.serverURL + this.getProdsByIDURL, {
            headers: new HttpHeaders({
              'ngrok-skip-browser-warning': 'skip-browser-warning',
              'Access-Control-Allow-Origin': '*',
              'product_id': encyData,
            }),
          })
          
        } else {
          return throwError('Encryption failed');
        }
      })
    );
  }



  // encription method
  encription(slug: any) {
    // Call the encryption API with the provided slug
    return this.http.get<any>(this.serverURL + this.encryptionURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        'id': slug,
      }),
    });
  }
  
//  
}
