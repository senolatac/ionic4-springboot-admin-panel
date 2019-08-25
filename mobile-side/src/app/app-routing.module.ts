import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';


const routes: Routes = [
  //Main default initial page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/user/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/user/register/register.module#RegisterPageModule' },
  //Profile need authentication.
  {
    path: 'profile',
    loadChildren: './pages/user/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'home', loadChildren: './pages/user/home/home.module#HomePageModule' },
  {
    path: 'detail/:id',
    loadChildren: './pages/user/detail/detail.module#DetailPageModule'
  },
  //Only users who have Admin role can reach these pages.
  {
    path: 'dashboard',
    loadChildren: './pages/admin/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'users',
    loadChildren: './pages/admin/users/users.module#UsersPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'products',
    loadChildren: './pages/admin/products/products.module#ProductsPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'transactions',
    loadChildren: './pages/admin/transactions/transactions.module#TransactionsPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  //Error pages
  {
    path: '404',
    loadChildren: './pages/error/not-found/not-found.module#NotFoundPageModule'
  },
  {
    path: '401',
    loadChildren: './pages/error/unathorized/unathorized.module#UnathorizedPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //if there is an error on router, then redirect it to 404 not-found page.
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    }
  }
}
