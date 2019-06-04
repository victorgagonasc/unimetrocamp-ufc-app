import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fighter-add',
  templateUrl: './fighter-add.component.html',
  styleUrls: ['./fighter-add.component.scss']
})
export class FighterAddComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  categories: Category[] = [];
  maleCategories: Category[] = [];
  femaleCategories: Category[] = [];
  weightLimits: any = {};

  fighterForm = this.fb.group({
    name: [null, Validators.required],
    birthDate: [null, Validators.required],
    country: [null, Validators.required],
    gender: [null, Validators.required],
    category: [null, Validators.required],
    weight: [{ value: null, disabled: true }, Validators.compose([
      Validators.required,
      Validators.min(30),
      Validators.max(120.2)
    ])]
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar) {
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

  ngOnInit() {
    const currentDate: Date = new Date();

    this.minDate = new Date(currentDate.getFullYear() - 50, 0, 1);
    this.maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  }

  genderChange(gender) {
    this.categories = gender === 'Masculino' ? this.maleCategories : this.femaleCategories;
    this.fighterForm.controls.category.setValue(null);
    this.fighterForm.controls.weight.reset();
    this.fighterForm.controls.weight.disable();
  }

  categoryChange(value) {
    const categories: Category[] = this.fighterForm.value.gender === 'Masculino' ? this.maleCategories : this.femaleCategories;

    const index = categories.findIndex((category: Category) => category.title === value);

    this.weightLimits.max = categories[index].weight;

    const previous: Category = this.categories[index - 1];

    this.weightLimits.min = previous ? parseFloat((previous.weight + 0.1).toFixed(1)) : 30;
    this.fighterForm.controls.weight.enable();
    this.fighterForm.controls.weight.setValidators([
      Validators.required,
      Validators.min(this.weightLimits.min),
      Validators.max(this.weightLimits.max),
    ]);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  onSubmit() {
    this.api.addFighter(this.fighterForm.value).subscribe(res => {
      this.openSnackBar('Lutador adicionado');
      this.router.navigateByUrl('/fighters');
    }, err => {
      this.openSnackBar(err.error);
    });
  }
}
