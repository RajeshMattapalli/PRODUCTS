import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductDetailsComponent, ProductsDialog, DeleteDialog } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ProductDetailsIdComponent } from './product-details-id/product-details-id.component';

import { EncrDecrService } from './sharedServices/encr-decr.service';
import { AuthGuard } from './auth.guard';
import { AlertsService } from '../app/alerts/alerts.service'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatCheckboxModule,
  MatGridListModule, MatDividerModule, MatListModule, MatTooltipModule
} from '@angular/material';

import { JwtModule } from '@auth0/angular-jwt';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppRoutingModule } from './app-routing.module';
import { BlockDirective } from './sharedServices/block.directive';
import { EqualValidator } from './sharedServices/equal-validator.directive';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AlertsComponent } from './alerts/alerts.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterUserComponent,
    ProductsDialog,
    DeleteDialog,
    ProductDetailsIdComponent,
    BlockDirective,
    EqualValidator,
    ForgotPasswordComponent,
    LogoutComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatButtonModule, MatCardModule, MatDialogModule,
    MatInputModule, MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,
    MatCheckboxModule, MatGridListModule, MatDividerModule, MatListModule, MatTooltipModule, ShowHidePasswordModule, AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000']
      }
    })
  ],
  exports: [EmailValidator],
  entryComponents: [ProductsDialog, DeleteDialog],
  providers: [EncrDecrService, AuthGuard, AlertsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
