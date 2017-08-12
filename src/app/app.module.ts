import {
  BrowserModule,
  Title
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { LoadingComponent } from './core/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    Title,
    AuthService,
    ApiService,
    DatePipe,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
