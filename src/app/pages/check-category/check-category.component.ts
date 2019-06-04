import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-category',
  templateUrl: './check-category.component.html',
  styleUrls: ['./check-category.component.scss']
})
export class CheckCategoryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'minWeight', 'maxWeight', 'idealWeight'];
  dataSource = new MatTableDataSource([]);
  categories: any[] = [];
  maleCategories: Category[] = [];
  femaleCategories: Category[] = [];

  fighterForm = this.fb.group({
    gender: ['Masculino', Validators.required],
    weight: [null, [Validators.required, Validators.min(30)]]
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.api.getMaleCategories()
      .subscribe(res => {
        this.maleCategories = res;
        this.loadCategories();
      }, err => {
        this.openSnackBar(err.error);
      });

    this.api.getFemaleCategories()
      .subscribe(res => {
        this.femaleCategories = res;
      }, err => {
        this.openSnackBar(err.error);
      });
  }

  loadCategories() {
    this.categories = this.fighterForm.value.gender === 'Masculino' ? this.maleCategories : this.femaleCategories;
    this.categories = this.categories.map((category: any, index) => {
      let minWeight: number;

      minWeight = this.categories[index - 1] ?
        this.categories[index - 1].weight + 0.1 : 30;

      category.minWeight = parseFloat(minWeight.toFixed(2));
      return category;
    });

    this.dataSource.data = this.categories;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

}
