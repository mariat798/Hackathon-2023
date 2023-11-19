/// new-balance.component.ts

// API imports
import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

// Model imports
import { BalanceModel } from "../../../models/balance-model";
import { ShareModel } from "../../../models/share-model";

// Service imports
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-edit-share',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-share.component.html',
  styleUrl: './edit-share.component.scss'
})
export class EditShareComponent {
  public form: FormGroup = new FormGroup({
    symbol: new FormControl(''),
    quantity: new FormControl('')
  });
  private shareId: string;

  constructor(
    private dialogRef: MatDialogRef<EditShareComponent>,
    @Inject(MAT_DIALOG_DATA) data: ShareModel,
    private apiService: ApiService
  ) {
    this.shareId = data.id;
    this.form.get('symbol')?.setValue(data.symbol);
    this.form.get('quantity')?.setValue(data.quantity);
  }

  public get Symbol(): string {
    return this.form.get('symbol')?.value;
  }

  public get Quantity(): number {
    return this.form.get('quantity')?.value;
  }

  public valid(): boolean {
    return this.Symbol.length > 0 && this.Quantity.toString().length > 0;
  }

  public async delete(): Promise<void> {
    await this.apiService.deleteShare(this.shareId);
    this.dialogRef.close({ deleted: true });
  }

  public cancel(): void {
    this.dialogRef.close({});
  }

  public async confirm(): Promise<void> {
    const share: ShareModel = await this.apiService.updateShare({
      id: this.shareId,
      symbol: this.Symbol,
      quantity: this.Quantity
    } as ShareModel);

    this.dialogRef.close({updatedShare: share});
  }
}