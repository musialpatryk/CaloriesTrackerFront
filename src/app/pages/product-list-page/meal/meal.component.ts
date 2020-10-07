import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  @Input() mealIndex: number;

  constructor() { }

  ngOnInit(): void { }


}
