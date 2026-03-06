import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const TOKEN_LOCALSTORAGE_KEY = "token";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiBaseUrl = "https://localhost:7263/api/"
  accountBaseUrl = this.apiBaseUrl + "Account/";

  username = "test";
  motDePasse = "Passw0rd!";

  constructor(public http: HttpClient) { }

  async register(){
    let registerData = {
      username: this.username,
      email : this.username + "@test.com",
      password : this.motDePasse,
      passwordConfirm : this.motDePasse,
    }
    await lastValueFrom(this.http.post<any>(this.accountBaseUrl + 'Register', registerData));
  }

  async login(){
    let registerData = {
      username : this.username,
      password : this.motDePasse
    }
    let result = await lastValueFrom(this.http.post<any>(this.accountBaseUrl + 'Login', registerData));
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, result.token);
  }

  async publicCall() : Promise<string[]>{
    return await lastValueFrom(this.http.get<any>(this.accountBaseUrl + 'PublicTest'));
  }

  async privateCall() : Promise<string[]>{
    return await lastValueFrom(this.http.get<any>(this.accountBaseUrl + 'PrivateTest'));
  }

  async logout(){
    // Rien d'autre à faire que d'oublier le Token
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
  }

  isLoggedIn() : Boolean{
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) != null;
  }

}
