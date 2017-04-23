import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
const appRoutes: Routes = [
  { path: 'home',        component: HomeComponent },
  { path: 'login',        component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}