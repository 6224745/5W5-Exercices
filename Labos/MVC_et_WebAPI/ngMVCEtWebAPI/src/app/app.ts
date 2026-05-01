import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngMVCEtWebAPI');
  
  constructor(public http : HttpClient){}

  resultat : string[] = [];
  username : string = "";
  newTestDataName : string = "";

  async getPublicTest(){
    let x = await lastValueFrom(this.http.get<string[]>("https://localhost:7119/api/Account/PublicTest"));
    console.log(x);
    this.resultat = x;
  }

  async getPrivateTest(){
    let x = await lastValueFrom(this.http.get<string[]>("https://localhost:7119/api/Account/PrivateTest"));
    console.log(x);
    this.resultat = x;
  }

  async register(){
    let registerDTO = {
      PasswordConfirm: "Passw0rd!",
      Password: "Passw0rd!",
      Username: this.username,
      Email: this.username + "@gmail.com"
    };

    let x = await lastValueFrom(this.http.post<any>("https://localhost:7119/api/Account/Register", registerDTO));
    console.log(x);
  }

  async login(){
    let loginDTO = {
      Username: this.username,
      Password: "Passw0rd!"
    };

    let x = await lastValueFrom(this.http.post<any>("https://localhost:7119/api/Account/Login", loginDTO));
    console.log(x);

    sessionStorage.setItem("token", x.token);
  }

  logout(){
    sessionStorage.removeItem("token");
    this.username = "";
  }

  async createTestData(name:string){
    let testData = {
      name: name
    }
    await lastValueFrom(this.http.post<any>("https://localhost:7119/api/TestData/CreateData", testData));
  }
}
