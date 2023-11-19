/// new-balance.component.ts

// API imports
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BalanceModel } from "../../../models/balance-model";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-new-balance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-balance.component.html',
  styleUrl: './new-balance.component.scss'
})
export class NewBalanceComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    balance: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<NewBalanceComponent>,
    private apiService: ApiService
  ) { }

  public get Name(): string {
    return this.form.get('name')?.value;
  }

  public get Balance(): number {
    return this.form.get('balance')?.value;
  }

  public valid(): boolean {
    return this.Name.length > 0 && this.Balance.toString().length > 0;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public async confirm(): Promise<void> {
    const balance: BalanceModel = await this.apiService.addBalance(this.Name, this.Balance);

    console.log("NEW BALANCE");
    console.log(balance);

    this.dialogRef.close(balance);
  }
}