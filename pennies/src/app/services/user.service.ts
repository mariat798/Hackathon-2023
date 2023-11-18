/// user.service.ts

// API imports
import { Injectable } from "@angular/core";

// Service imports
import { StorageService } from "./storage.service";
import { UserModel } from "../models/user-model";
import { StorageItem } from "../models/storage-item";

@Injectable({providedIn: 'root'})
export class UserService {

    public user: UserModel | null = null;

    constructor(private storageService: StorageService) {
        const user: UserModel | null = storageService.getItem<UserModel>(StorageItem.User);

        this.user = user;
    }

    public get IsLoggedIn(): boolean {
        return this.user != null;
    }
}