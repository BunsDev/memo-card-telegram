import { observer } from "mobx-react-lite";
import React from "react";
import { AnswerFormView } from "./answer-form-view.tsx";
import { assert } from "../../lib/typescript/assert.ts";
import { CardFormStore } from "./store/card-form-store.ts";
import { CardPreview } from "./card-preview.tsx";
import { CardFormView } from "./card-form-view.tsx";
import { DeckFormStore } from "./store/deck-form-store.ts";

type Props = {
  cardFormStore: CardFormStore;
  deckFormStore?: DeckFormStore;
};

export const CardFormWrapper = observer((props: Props) => {
  const { cardFormStore, deckFormStore } = props;
  const { cardForm } = cardFormStore;
  assert(cardForm, "Card should not be empty before editing");

  if (cardForm.answerId) {
    return <AnswerFormView cardForm={cardForm} />;
  }

  if (cardFormStore.isCardPreviewSelected.value) {
    return (
      <CardPreview
        form={cardForm}
        deckFormStore={deckFormStore}
        onBack={cardFormStore.isCardPreviewSelected.setFalse}
      />
    );
  }

  return <CardFormView cardFormStore={cardFormStore} />;
});
