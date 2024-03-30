import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  @Input() cart: any;
  quantity = 0;
  finalprice = 0;
  constructor() {}

  counteradd(event: any) {
    this.quantity = this.quantity + 1;
    event.quantity = this.quantity;
    console.log(this.cart, 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
    event.finalprice = event.price * this.quantity;
    const discount = event.finalprice * (event.discountPercentage / 100);
    event.final_price = event.finalprice - discount;
  }

  countersub(event: any) {
    if (this.quantity > 0) this.quantity = this.quantity - 1;
    event.quantity = this.quantity;
    console.log(this.cart, 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
    event.finalprice = event.price * this.quantity;
    const discount = event.finalprice * (event.discountPercentage / 100);
    event.final_price = event.finalprice - discount;
  }
}
