import { observer } from "mobx-react-lite";
import { useAiMassCreationStore } from "./store/ai-mass-creation-store-provider.tsx";
import { useState } from "react";
import { createMockCardPreviewForm } from "../deck-form/card-form/create-mock-card-preview-form.ts";
import { CardPreview } from "../deck-form/card-form/card-preview.tsx";
import { assert } from "../../../shared/typescript/assert.ts";

type Props = {
  card: { front: string; back: string; example?: string };
};

export const GeneratedCardPreviewScreen = observer((props: Props) => {
  const store = useAiMassCreationStore();
  assert(store.massCreationForm);
  const { card } = props;
  const [form] = useState(
    createMockCardPreviewForm({
      example: card.example || null,
      back: card.back,
      front: card.front,
      answers: [],
      options: null,
      answer_type: "remember",
    }),
  );

  return (
    <CardPreview
      form={form}
      onBack={() => {
        assert(store.massCreationForm);
        store.massCreationForm.selectedCardIndex.onChange(null);
      }}
    />
  );
});
