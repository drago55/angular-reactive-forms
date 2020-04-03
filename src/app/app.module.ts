import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './service/registration.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, HttpClientModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
