/// api.service.ts

// API imports
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BalanceModel } from "../models/balance-model";
import { ShareModel } from "../models/share-model";
import { UserModel } from "../models/user-model";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class ApiService {
  static Url = "http://localhost:5001";

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  private async login(username: string, password: string): Promise<UserModel> {

    const headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    const user: UserModel = await firstValueFrom(this.http.post<UserModel>(
      ApiService.Url + "/user/login",
      { username: username, password: password },
      { headers: headers }
    ));

    return user;
  }

  public async tryLogin(username: string, password: string): Promise<boolean> {
    const user: UserModel | undefined = await this.login(username, password);

    if (user != undefined) {
      this.userService.setUser(user);
      return true;
    }

    return false;
  }

  /// Balances

  public async getBalances(): Promise<BalanceModel[]> {

    const balances: BalanceModel[] = await firstValueFrom(this.http.get<BalanceModel[]>(
      `${ApiService.Url}/balances/${this.userService.User.userId}`
    ));

    return balances;
  }

  public async addBalance(name: string, balance: number): Promise<BalanceModel> {

    const headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    const newBalance: BalanceModel = await firstValueFrom(this.http.post<BalanceModel>(
      ApiService.Url + "/balances",
      { user: this.userService.User, name: name, balance: balance },
      { headers: headers }
    ));

    return newBalance;
  }

  public async deleteBalance(balanceId: string): Promise<void> {
    await firstValueFrom(this.http.delete(
      `${ApiService.Url}/balances/${balanceId}`
    ));
  }

  public async updateBalance(balance: BalanceModel): Promise<BalanceModel> {

    const headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    const updatedBalance: BalanceModel = await firstValueFrom(this.http.put<BalanceModel>(
      `${ApiService.Url}/balances`,
      { ...balance },
      { headers: headers }
    ));

    return updatedBalance;
  }

  /// Shares

  public async getShares(): Promise<ShareModel[]> {
    const shares: ShareModel[] = await firstValueFrom(this.http.get<ShareModel[]>(
      `${ApiService.Url}/shares/${this.userService.User.userId}`
    ));

    return shares;
  }

  public async addShare(symbol: string, quantity: number): Promise<ShareModel> {

    const headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    const newShare: ShareModel = await firstValueFrom(this.http.post<ShareModel>(
      `${ApiService.Url}/shares`,
      { user: this.userService.User, symbol: symbol, quantity: quantity },
      { headers: headers }
    ));

    return newShare;
  }

  public async deleteShare(shareId: string): Promise<void> {
    await firstValueFrom(this.http.delete(
      `${ApiService.Url}/shares/${shareId}`
    ));
  }

  public async updateShare(share: ShareModel): Promise<ShareModel> {

    const headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    const updatedShare: ShareModel = await firstValueFrom(this.http.put<ShareModel>(
      `${ApiService.Url}/shares`,
      { ...share },
      { headers: headers }
    ));

    return updatedShare;
  }
}