import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Fighter } from 'src/app/models/fighter';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthDate', 'gender', 'country', 'weight', 'category'];
  data: Fighter[] = [];
  dataSource = new MatTableDataSource([]);
  categories: Category[] = [];
  maleCategories: Category[] = [];
  femaleCategories: Category[] = [];
  selectedGender = 'Todos';
  selectedCategory = 'Todas';

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  ngOnInit() {
    this.api.getMaleCategories()
      .subscribe(res => {
        this.maleCategories = res;
      }, err => {
        this.openSnackBar(err.error);
      });

    this.api.getFemaleCategories()
      .subscribe(res => {
        this.femaleCategories = res;
      }, err => {
        this.openSnackBar(err.error);
      });

    this.loadData();
  }

  loadData() {
    this.api.getFighters()
      .subscribe(res => {
        this.data = res;
        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;
        this.openSnackBar('Lutadores encontrados com sucesso');
      }, err => {
        this.openSnackBar(err.error);
      });
  }

  genderChange(gender) {
    if (gender === 'Todos') {
      this.categories = [];
      this.loadData();
    } else {
      this.dataSource.data = this.data.filter((fighter: Fighter) => fighter.gender === gender);
      this.categories = gender === 'Masculino' ? this.maleCategories : this.femaleCategories;
    }
  }

  applyFilter(category) {
    this.genderChange(this.selectedGender);
    if (category !== 'Todas') {
      this.dataSource.data = this.dataSource.data.filter((fighter: Fighter) => fighter.category === category);
    }
  }

  resetFilters() {
    this.genderChange('Todos');
    this.selectedGender = 'Todos';
    this.selectedCategory = 'Todas';
  }

}
