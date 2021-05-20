import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './description.component';
import { DescriptionService } from './description.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopBarService } from './top-bar/top-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    WelcomeComponent,
    TopBarComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DescriptionService,
    TopBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
