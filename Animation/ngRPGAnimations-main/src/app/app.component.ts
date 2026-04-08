import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { shakeX } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("death", [
      transition(
        ":increment",
        useAnimation(shakeX, { params: { timing: 0.5 } })
      ),
    ]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;
 ng_death: any
  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
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
