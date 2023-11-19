/// new-balance.component.ts

// API imports
import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

// Model imports
import { BalanceModel } from "../../../models/balance-model";

// Service imports
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-new-balance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-balance.component.html',
  styleUrl: './edit-balance.component.scss'
})
export class EditBalanceComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    balance: new FormControl('')
  });
  private balanceId: string;

  constructor(
    private dialogRef: MatDialogRef<EditBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) data: BalanceModel,
    private apiService: ApiService
  ) {
    console.log(data);
    this.balanceId = data.id;
    this.form.get('name')?.setValue(data.name);
    this.form.get('balance')?.setValue(data.balance);
  }

  public get Name(): string {
    return this.form.get('name')?.value;
  }

  public get Balance(): number {
    return this.form.get('balance')?.value;
  }

  public valid(): boolean {
    return this.Name.length > 0 && this.Balance.toString().length > 0;
  }

  public async delete(): Promise<void> {
    await this.apiService.deleteBalance(this.balanceId);
    this.dialogRef.close({deleted: true});
  }

  public cancel(): void {
    this.dialogRef.close({});
  }

  public async confirm(): Promise<void> {
    const balance: BalanceModel = await this.apiService.updateBalance({
      id: this.balanceId,
      name: this.Name,
      balance: this.Balance
    } as BalanceModel);

    this.dialogRef.close({updatedBalance: balance});
  }
}