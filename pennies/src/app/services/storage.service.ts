/// storage.service.ts

// API imports
import { Inject, Injectable } from "@angular/core";

// Model imports
import { StorageItem } from "../models/storage-item";

@Injectable({providedIn: 'root'})
export class StorageService {
    public static None = 'None';

    public getItem<T>(itemName: StorageItem): T | null {
        const item: string | null = localStorage.getItem(itemName.toString());
        
        if (item) {
            return JSON.parse(item) as T;
        }

        return null;
    }

    public setItem<T extends string>(itemName: StorageItem, value: T): void {
        localStorage.setItem(itemName.toString(), JSON.stringify(value));
    }

    public clear(): void {
        localStorage.clear();
    }
}