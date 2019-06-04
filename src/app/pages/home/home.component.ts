import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routes = [
    {
      route: '/fighters',
      title: 'Lutadores',
    },
    {
      route: '/fighter-add',
      title: 'Novo lutador',
    },
    {
      route: '/random-fight',
      title: 'Luta aleatória',
    },
    {
      route: '/check-category',
      title: 'Verificar categoria',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
