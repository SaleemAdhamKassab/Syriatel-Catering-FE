import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { LogInComponent } from './userComponent/log-in/log-in.component';
import { HomeComponent } from './userComponent/home/home.component';
import { InfoComponent } from './userComponent/info/info.component';
import { MainComponent } from './adminComponent/main/main.component';
import { OrdersComponent } from './adminComponent/orders/orders.component';
import { ConfirmComponent } from './sharedComponent/confirm/confirm.component';
import { SidenavComponent } from './adminComponent/sidenav/sidenav.component';
import { ProductsComponent } from './adminComponent/products/products.component';
import { NotFoundComponent } from './sharedComponent/not-found/not-found.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { evenPipe } from './Pipes/even-pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotAuthComponent } from './sharedComponent/not-auth/not-auth.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDrawerContainer, MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CategoriesComponent } from './adminComponent/categories/categories.component';
import { NewProductComponent } from './adminComponent/new-product/new-product.component';
import { NewExtraComponent } from './adminComponent/new-extra/new-extra.component';
import { ChartsComponent } from './charts/charts.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    InfoComponent,
    MainComponent,
    OrdersComponent,
    ConfirmComponent,
    SidenavComponent,
    ProductsComponent,
    NotFoundComponent,
    evenPipe,
    NotAuthComponent,
    CategoriesComponent,
    NewProductComponent,
    NewExtraComponent,
    ChartsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule ,
    MatGridListModule,
    MatToolbarModule,FormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
                                                                                       
    
  
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ConfirmComponent,InfoComponent,CategoriesComponent,NewExtraComponent]
})
export class AppModule { }
