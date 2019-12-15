import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AccountApiService } from './core/api/account-api.service';
import { AccountService } from './core/services/account.service';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationApiService } from './core/api/authentication-api.service';
import { AuthenticationService } from './core/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EventsService } from './core/services/events.service';
import { NgModule } from '@angular/core';
import { NotificationsService } from './core/services/notifications.service';
import { PlaylistApiService } from './core/api/playlist-api.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        AccountApiService,
        AuthenticationApiService,
        PlaylistApiService,
        NotificationsService,
        AuthenticationService,
        AccountService,
        EventsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
