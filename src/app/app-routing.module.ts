import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { ProductDetailsComponent } from '../app/product-details/product-details.component';
import { ProductDetailsIdComponent } from '../app/product-details-id/product-details-id.component';
import { RegisterUserComponent } from '../app/register-user/register-user.component';
import { ForgotPasswordComponent } from '../app/forgot-password/forgot-password.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productDetails/:productId', component: ProductDetailsIdComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: RegisterUserComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
