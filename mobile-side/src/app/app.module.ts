import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//To get, post http request module.
import { HttpClientModule } from '@angular/common/http';

//Login, register... form module.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserModalComponent,
    ProductModalComponent
  ],
  entryComponents: [
    UserModalComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
