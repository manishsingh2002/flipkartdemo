import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  navbardata: any = [];
  cartdata: any;
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  @Output() navbardataEvent = new EventEmitter<any>();
  navbarData(data: any) {
    this.navbardata = data;
    this.navbardataEvent.emit(data);
    console.log(data, 'nav');
  }

  @Output() cartdataEvent = new EventEmitter<any[]>();
  productcart: any = [];
  cartDatas(data: any) {
    // console.log(data, typeof data, 'cart');
    // this.cartdataEvent.emit(data);
    // console.log(data, 'cart data');
    this.productcart = data;
    console.log(this.productcart);
  }

  getcart() {
    return this.productcart;
  }

  checkoutchoosenpproducct: any[] = [];
  finalrate: any = [];
  // checkout final list
  finalcheckout(data: any, finalprice: any) {
    this.checkoutchoosenpproducct = data;
    this.finalrate = finalprice;
    console.log(this.checkoutchoosenpproducct);
  }

  setFinalCheckout() {
    return this.checkoutchoosenpproducct;
  }
  setfinalprice() {
    return this.finalrate;
  }

  // @Output() userdetailevent = new EventEmitter<any>();

  userInfo: any = [];
  userdata(DATA: any) {
    this.userInfo = DATA;
    console.log('us', this.userInfo);
    // this.userdetailevent.emit(DATA);
    console.log(this.userInfo, 'aaaaaaaaaaaaaa');
    // this.getuserdata();
  }

  getuserdata() {
    console.log(this.userInfo, 'llllllllllllll');
    return this.userInfo;
  }
}
