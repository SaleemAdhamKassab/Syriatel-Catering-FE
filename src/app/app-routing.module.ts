import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/userComponent/home/home.component';
import { InfoComponent } from 'src/app/userComponent/info/info.component';
import { LogInComponent } from 'src/app/userComponent/log-in/log-in.component';
import { NotFoundComponent } from 'src/app/sharedComponent/not-found/not-found.component';
import { NotAuthComponent } from './sharedComponent/not-auth/not-auth.component';
import { ConfirmComponent } from './sharedComponent/confirm/confirm.component';
import { OrdersComponent } from './adminComponent/orders/orders.component';
import { SidenavComponent } from './adminComponent/sidenav/sidenav.component';
import { ProductsComponent } from './adminComponent/products/products.component';
import { MainComponent } from './adminComponent/main/main.component';
import { GuardAuthService } from './userServices/guard-auth.service';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: 'LogIn', component: LogInComponent },
  { path: 'chart', component: ChartsComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'notAuth', component: NotAuthComponent },
  {
    path: 'Admin',
    component: SidenavComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'statistics', component: MainComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'notAuth', component: NotAuthComponent },
      { path: '**', component: NotFoundComponent },
    ],
    canActivate: [GuardAuthService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
