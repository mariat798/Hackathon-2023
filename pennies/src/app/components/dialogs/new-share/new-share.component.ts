/// new-balance.component.ts

// API imports
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ShareModel } from "../../../models/share-model";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-new-share',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-share.component.html',
  styleUrl: './new-share.component.scss'
})
export class NewShareComponent {
  public form: FormGroup = new FormGroup({
    symbol: new FormControl(''),
    quantity: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<NewShareComponent>,
    private apiService: ApiService
  ) { }

  public get Symbol(): string {
    return this.form.get('symbol')?.value;
  }

  public get Quantity(): number {
    return this.form.get('quantity')?.value;
  }

  public valid(): boolean {
    return this.Symbol.length > 0 && this.Quantity.toString().length > 0;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public async confirm(): Promise<void> {
    const share: ShareModel = await this.apiService.addShare(this.Symbol, this.Quantity);

    this.dialogRef.close(share);
  }
}