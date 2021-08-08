import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'elements', canActivate:[AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./ui/elements/elements.module').then(m => m.ElementsModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'chat', canActivate:[AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./ui/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {path: '**', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent}
  ];
   
   @NgModule({
     imports: [RouterModule.forRoot(routes,{
       enableTracing: false,
       preloadingStrategy: PreloadAllModules
     })],
     exports: [RouterModule]
   })
   export class AppRoutingModule { }
   