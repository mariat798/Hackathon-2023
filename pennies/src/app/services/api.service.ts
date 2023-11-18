/// api.service.ts

// API imports
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService {
  static Url = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  public async login(username: string, password: string): Promise<boolean> {
    const userId: string | undefined = await firstValueFrom(this.http.post<string>(
      ApiService.Url + "/login",
      { username: username, password: password }
    ));

    return userId != undefined;
  }
}