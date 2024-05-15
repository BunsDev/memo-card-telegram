import { RequestStore } from "../../../lib/mobx-request/request-store.ts";
import { deckChangeInputModeRequest } from "../../../api/api.ts";
import { makeAutoObservable } from "mobx";
import { TextField } from "mobx-form-lite";
import { assert } from "../../../lib/typescript/assert.ts";
import { notifyError, notifySuccess } from "../../shared/snackbar/snackbar.tsx";
import { deckListStore } from "../../../store/deck-list-store.ts";
import { t } from "../../../translations/t.ts";
import { DeckFormStore } from "../../deck-form/deck-form/store/deck-form-store.ts";
import { createCachedCardInputModesRequest } from "../../../api/create-cached-card-input-modes-request.ts";

export class CardInputModeStore {
  cardInputModesRequest = createCachedCardInputModesRequest();
  deckChangeInputModeRequest = new RequestStore(deckChangeInputModeRequest);
  modeId = new TextField<string | null>(null);

  constructor(private deckFormStore: DeckFormStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  load() {
    assert(this.deckFormStore.deckForm, "Deck form should be loaded");
    const cardInputModeId = this.deckFormStore.deckForm.cardInputModeId;

    this.modeId.onChange(cardInputModeId);
    this.cardInputModesRequest.execute();
  }

  async submit() {
    if (this.cardInputModesRequest.isLoading) {
      return;
    }

    assert(this.deckFormStore.deckForm, "Deck form should be loaded");
    const deckId = this.deckFormStore.deckForm.id;
    assert(deckId, "Deck id should be defined");

    const result = await this.deckChangeInputModeRequest.execute({
      deckId: deckId,
      cardInputModeId: this.modeId.value,
    });

    if (result.status === "error") {
      notifyError({
        e: result.error,
        info: "Failed to change card input mode",
      });
      return;
    }

    deckListStore.updateDeckCardInputMode(deckId, this.modeId.value);
    notifySuccess(t("card_input_mode_changed"));
    this.deckFormStore.quitInnerScreen();
  }
}