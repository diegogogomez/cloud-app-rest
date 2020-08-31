import { Component, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from './bill.model';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { flatten } from '@angular/compiler';

export const REST_URL = new InjectionToken('rest_url');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private products: Product[] = new Array<Product>();
  private theBills: Bill[] = new Array<Bill>();
  private bills: Bill[] = new Array<Bill>();
  showTable: boolean;

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string ){

    this.getData().subscribe(data => this.bills = data);
    this.getBills();
  }

  imprimir() {
    this.showTable = true;
  }

  getBills(): Bill[] {
    this.getProducts();
    return this.bills;
  }

  private getData(): Observable<Bill[]> {
    return this.sendRequest<Bill[]>('GET', this.url);
  }

  getProducts(): Product[]{
    // this.theBills = this.getBills();

    let flag: Boolean;


    for(let factura of this.bills){
      flag = false;
      for(let producto of this.products){
        if(producto.productId == factura.productId){
          flag = true;

          // producto.quantity++;
          producto.quantity += factura.quantity;
          producto.spend += producto.spend;
        }
      }
      if(!flag){
        this.products.push(new Product(factura.productId, factura.quantity, factura.spend));
      }
    }
    console.log(this.products.length);
    return this.products;
  }

  private sendRequest<T>(verb: string, url: string, body?: Bill)
  : Observable<T> {
    return this.http.request<T>(verb, url, {
      body: body,
      headers: new HttpHeaders({
        "Access-Key": "<secret>",
        "Application-Name": "exampleApp"
      })
    });
  }

}
