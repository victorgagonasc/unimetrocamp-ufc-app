import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  routes: ROUTE[] = [
    {
      icon: 'home',
      route: 'home',
      title: 'Home',
    },
    {
      icon: 'group',
      route: 'fighters',
      title: 'Lutadores',
    },
    {
      icon: 'person_add',
      route: 'fighter-add',
      title: 'Novo lutador',
    },
    {
      icon: 'fitness_center',
      route: 'random-fight',
      title: 'Luta aleatória',
    },
    {
      icon: 'poll',
      route: 'check-category',
      title: 'Verificar categoria',
    },
    {
      icon: 'book',
      route: 'history',
      title: 'História UFC',
    },
    {
      icon: 'assignment',
      route: 'about',
      title: 'Sobre',
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
