import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { Fighter } from 'src/app/models/fighter';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-random-fight',
  templateUrl: './random-fight.component.html',
  styleUrls: ['./random-fight.component.scss']
})
export class RandomFightComponent implements OnInit {
  categories: Category[] = [];
  maleCategories: Category[] = [];
  femaleCategories: Category[] = [];
  selectedGender = null;
  selectedCategory = null;
  fighters: Fighter[] = [];

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

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
  }

  genderChange(gender) {
    this.selectedCategory = null;
    this.categories = gender === 'Masculino' ? this.maleCategories : this.femaleCategories;
  }

  generateFight() {
    this.api.generateFight(this.selectedGender, this.selectedCategory).subscribe(res => {
      this.fighters = res;
      this.openSnackBar('Luta gerada com sucesso');
    }, err => {
      this.openSnackBar(err.error);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
