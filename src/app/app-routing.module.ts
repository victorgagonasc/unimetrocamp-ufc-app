import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FightersComponent } from './pages/fighters/fighters.component';
import { FighterAddComponent } from './pages/fighter-add/fighter-add.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckCategoryComponent } from './pages/check-category/check-category.component';
import { HistoryComponent } from './pages/history/history.component';
import { RandomFightComponent } from './pages/random-fight/random-fight.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'fighters',
    component: FightersComponent
  },
  {
    path: 'fighter-add',
    component: FighterAddComponent
  },
  {
    path: 'random-fight',
    component: RandomFightComponent
  },
  {
    path: 'check-category',
    component: CheckCategoryComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
