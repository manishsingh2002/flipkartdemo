import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { MenubarModule } from 'primeng/menubar';
import { ThemeDirective } from './theme.directive';
import { HovercolorDirective } from './directives/hovercolor/hovercolor.directive';
import { UserdetailformComponent } from './userdetailform/userdetailform.component';
import { TableModule } from 'primeng/table';
import { BodercolorDirective } from './directives/bordercolor/bodercolor.directive';
import { UnlessDirective } from './directives/st-unless/unless.directive';
import { FormValidationDirective } from './directives/st-formsvalidator/form-validation.directive';
import { InputTextModule } from 'primeng/inputtext';
import { DeliverPageComponent } from './deliver-page/deliver-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
//
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
//

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    CheckoutComponent,
    ThemeDirective,
    UserdetailformComponent,
    HovercolorDirective,
    BodercolorDirective,
    UnlessDirective,
    FormValidationDirective,
    DeliverPageComponent,
    LandingpageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    InputTextModule,
    TableModule,
    MenubarModule,
    GalleriaModule,
    ButtonModule,
    CardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    SlickCarouselModule,
    MultiSelectModule,
    ImageModule,
    CommonModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
