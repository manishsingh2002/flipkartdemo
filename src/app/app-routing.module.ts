import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserdetailformComponent } from './userdetailform/userdetailform.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliverPageComponent } from './Components/deliver-page/deliver-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'userdetail',
    component: UserdetailformComponent,
  },
  {
    path: '',
    component: NavbarComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: 'userdetails',
        component: UserdetailformComponent,
        children: [
          {
            path: 'del',
            component: DeliverPageComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: NavbarComponent,
  },
  {
    path: 'delivery',
    component: DeliverPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
