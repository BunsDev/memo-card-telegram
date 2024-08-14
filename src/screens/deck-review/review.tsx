import React from "react";
import { cardSize } from "../shared/card/card.tsx";
import { observer } from "mobx-react-lite";
import { css } from "@emotion/css";
import { CardState } from "./store/card-under-review-store.ts";
import { ProgressBar } from "../../ui/progress-bar.tsx";
import { useReviewStore } from "./store/review-store-context.tsx";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { useHotkeys } from "react-hotkeys-hook";
import { ReviewDeckName } from "./review-deck-name.tsx";
import { CardReviewWithControls } from "./card-review-with-controls.tsx";
import { createPortal } from "react-dom";
import {
  BrowserBackButton
} from "../shared/browser-platform/browser-back-button.tsx";
import { platform } from "../../lib/platform/platform.ts";
import {
  BrowserPlatform
} from "../../lib/platform/browser/browser-platform.ts";

export const Review = observer(() => {
  const reviewStore = useReviewStore();
  useBackButton(() => {
    reviewStore.submitUnfinished();
  });

  const onWrong = () => {
    reviewStore.changeState(CardState.Forget);
  };

  const onCorrect = () => {
    reviewStore.changeState(CardState.Remember);
  };

  useHotkeys("1", () => {
    if (reviewStore.currentCard?.isOpened) {
      onWrong();
    }
  });

  useHotkeys("2", () => {
    if (reviewStore.currentCard?.isOpened) {
      onCorrect();
    }
  });

  useHotkeys("enter", () => {
    if (reviewStore.currentCard?.isOpened) {
      onCorrect();
    } else {
      reviewStore.open();
    }
  });

  const component = (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      })}
    >
      {platform instanceof BrowserPlatform && (
        <div
          className={css({
            position: "absolute",
            top: 4,
            left: 110,
          })}
        >
          <BrowserBackButton />
        </div>
      )}
      <div
        className={css({
          width: cardSize,
          position: "absolute",
          top: 8,
        })}
      >
        {reviewStore.initialCardCount && (
          <ProgressBar
            value={reviewStore.reviewedCardsCount}
            max={reviewStore.initialCardCount}
          />
        )}
      </div>
      <ReviewDeckName />
      <CardReviewWithControls
        card={reviewStore.currentCard}
        onWrong={onWrong}
        onCorrect={onCorrect}
        onShowAnswer={reviewStore.open}
        onReviewCardWithAnswers={reviewStore.onReviewCardWithAnswers}
        onHideCardForever={reviewStore.onHideCardForever}
      />
    </div>
  );

  return reviewStore.currentCard?.isOverflowing.value
    ? createPortal(component, document.body)
    : component;
});
