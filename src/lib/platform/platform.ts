import { TelegramPlatform } from "./telegram/telegram-platform.ts";
import { BrowserPlatform } from "./browser/browser-platform.ts";
import { isRunningWithinTelegram } from "./is-running-within-telegram.ts";
import { Language } from "../../translations/t.ts";
import { PlatformSchemaType } from "../../../functions/db/user/upsert-user-db.ts";

export type PlatformTheme = {
  buttonColor: string;
  hintColor: string;
  buttonTextColor: string;
};

export interface Platform {
  initialize(): void;
  getInitData(): string | null;
  openExternalLink(link: string): void;
  openInternalLink(link: string): void;
  getTheme(): PlatformTheme;
  getClientData(): PlatformSchemaType;
  getLanguage(): Language;
  getStartParam(): string | undefined;
  openInvoiceLink(link: string): void;
}

export type UseMainButtonType = (
  text: string | (() => string),
  onClick: () => void,
  condition?: () => boolean,
  deps?: any[],
  options?: { forceHide?: boolean },
) => void;

export type UseBackButtonType = (onBack: () => void, deps?: any[]) => void;

export type ShowConfirmType = (text: string) => Promise<boolean>;

const createPlatform = (): Platform => {
  return isRunningWithinTelegram()
    ? new TelegramPlatform()
    : new BrowserPlatform();
};

export const platform = createPlatform();
