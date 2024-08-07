import { trimEnd } from "../../lib/string/trim.ts";
import { platform } from "../../lib/platform/platform.ts";
import { getBotUrl } from "../../lib/urls/get-bot-url.ts";
import { assert } from "../../../shared/typescript/assert.ts";
import { TelegramPlatform } from "../../lib/platform/telegram/telegram-platform.ts";

export const getDeckOrFolderLink = (shareId: string) => {
  const botUrl = getBotUrl();
  assert(botUrl, "Bot URL is not set");
  return `${trimEnd(botUrl, "/")}?startapp=${shareId}`;
};

export const redirectUserToDeckOrFolderLink = (shareId: string) => {
  if (!(platform instanceof TelegramPlatform)) {
    return;
  }
  const botUrlWithDeckId = getDeckOrFolderLink(shareId);

  const shareUrl = `https://t.me/share/url?${
    platform.isMacos() ? "" : "text=&"
  }url=${botUrlWithDeckId}`;

  platform.openInternalLink(shareUrl);
};
