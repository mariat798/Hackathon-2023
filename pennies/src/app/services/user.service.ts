/// user.service.ts

// API imports
import { Injectable } from "@angular/core";

// Service imports
import { StorageService } from "./storage.service";
import { UserModel } from "../models/user-model";
import { StorageItem } from "../models/storage-item";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class UserService {

  private user: UserModel | null = null;

  constructor(private storageService: StorageService) {
    const user: UserModel | null = storageService.getItem<UserModel>(StorageItem.User);

    this.user = user;
  }

  public get IsLoggedIn(): boolean {
    return this.user != null;
  }

  public get User(): UserModel {
    return this.user!;
  }

  public async setUser(user: UserModel): Promise<void> {
    this.user = user;
    this.storageService.setItem(StorageItem.User, user);
  }
}