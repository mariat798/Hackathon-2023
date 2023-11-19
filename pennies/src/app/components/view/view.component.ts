/// view.component.ts

// API imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'

// Model imports
import { BalanceModel } from '../../models/balance-model';
import { ApiService } from '../../services/api.service';
import { NewBalanceComponent } from '../dialogs/new-balance/new-balance.component';
import { firstValueFrom } from 'rxjs';
import { EditBalanceComponent } from '../dialogs/edit-balance/edit-balance.component';
import { ShareModel } from '../../models/share-model';
import { NewShareComponent } from '../dialogs/new-share/new-share.component';
import { EditShareComponent } from '../dialogs/edit-share/edit-share.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {

  public balances: BalanceModel[] = [];
  public shares: ShareModel[] = [];

  constructor(
    private userService: UserService, 
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.userService.IsLoggedIn) {
      this.router.navigate(['/']);
      return;
    }

    this.balances = await this.apiService.getBalances();
    this.shares = await this.apiService.getShares();
  }

  public getTotal(): number {
    let total: number = 0;

    this.balances.forEach(x => total += x.balance);

    return total;
  }

  public newBalance(): void {
    firstValueFrom(this.dialog.open(NewBalanceComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: false
      })
      .afterClosed())
      .then((newBalance: BalanceModel) => {
        if (newBalance == null) {
          return;
        }

        this.balances.push(newBalance);
      });
  }

  public editBalance(balance: BalanceModel): void {
    firstValueFrom(this.dialog.open(EditBalanceComponent, {
      width: '450px',
      disableClose: true,
      autoFocus: false,
      data: balance
      })
      .afterClosed())
      .then(({updatedBalance, deleted}: { updatedBalance?: BalanceModel, deleted?: boolean }) => {
        if (updatedBalance) {
          const foundBalance: BalanceModel = this.balances.find(x => x.id === updatedBalance.id)!;

          foundBalance.name = updatedBalance.name;
          foundBalance.balance = updatedBalance.balance;
        } else if (deleted) {
          this.balances = this.balances.filter(x => x.id !== balance.id);
        }
      })
  }

  public newShare(): void {
    firstValueFrom(this.dialog.open(NewShareComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: false
      })
      .afterClosed())
      .then((newShare: ShareModel) => {
        if (newShare == null) {
          return;
        }

        this.shares.push(newShare);
      });
  }

  public editShare(share: ShareModel): void {
    firstValueFrom(this.dialog.open(EditShareComponent, {
      width: '450px',
      disableClose: true,
      autoFocus: false,
      data: share
      })
      .afterClosed())
      .then(({updatedShare, deleted}: { updatedShare?: ShareModel, deleted?: boolean }) => {
        if (updatedShare) {
          const foundShare: ShareModel = this.shares.find(x => x.id === updatedShare.id)!;

          foundShare.symbol = updatedShare.symbol;
          foundShare.quantity = updatedShare.quantity;
        } else if (deleted) {
          this.shares = this.shares.filter(x => x.id !== share.id);
        }
      })
  }
}
