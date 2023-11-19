/// app.module.ts

// API imports
import { NgModule } from "@angular/core";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';

// Component imports
import { NewBalanceComponent } from "./components/dialogs/new-balance.component";

@NgModule({
    imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    declarations: [
        NewBalanceComponent
    ]
})
export class AppModule { }