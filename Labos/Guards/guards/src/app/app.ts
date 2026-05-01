import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guards');
  sweet : boolean = false;
  salty : boolean = false;

  constructor() { }

  ngOnInit() {
    this.sweet = localStorage.getItem("sweet") != null;
    this.salty = localStorage.getItem("salty") != null;
  }

  updateSalty(){
    if(this.salty)
      localStorage.setItem("salty", "true");
    else
      localStorage.removeItem("salty");
  }

  updateSweet(){
    if(this.sweet)
      localStorage.setItem("sweet", "true");
    else
      localStorage.removeItem("sweet");
  }

}
