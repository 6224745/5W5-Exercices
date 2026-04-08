import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  slimeIsPresent = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards

    // TODO 2e animation angular en même temps
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
  }
}
