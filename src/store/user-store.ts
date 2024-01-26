import { makeAutoObservable } from "mobx";
import { type UserDbType } from "../../functions/db/user/upsert-user-db.ts";
import { assert } from "../lib/typescript/assert.ts";
import { type PlansForUser } from "../../functions/db/plan/get-plans-for-user.ts";

export class UserStore {
  userInfo?: UserDbType;
  plans?: PlansForUser;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: UserDbType, plans: PlansForUser) {
    this.userInfo = user;
    this.plans = plans;
  }

  get user() {
    return this.userInfo ?? null;
  }

  get myId() {
    return this.user?.id;
  }

  get isAdmin() {
    return this.user?.is_admin ?? false;
  }

  get canDuplicateDecks() {
    if (this.isAdmin) {
      return true;
    }

    return this.plans?.some((plan) => plan.advanced_duplicate) ?? false;
  }

  get canDuplicateFolders() {
    if (this.isAdmin) {
      return true;
    }

    return this.plans?.some((plan) => plan.advanced_duplicate) ?? false;
  }

  get isSpeakingCardsEnabled() {
    return this.user?.is_speaking_card_enabled ?? false;
  }

  updateSettings(body: Partial<UserDbType>) {
    assert(this.userInfo, "myInfo is not loaded in optimisticUpdateSettings");
    Object.assign(this.userInfo, body);
  }
}

export const userStore = new UserStore();
