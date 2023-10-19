import { ZodError } from "zod";
import { DatabaseException } from "../../db/database-exception.ts";
import { envSchema } from "../../env/env-schema.ts";
import { Bot } from "grammy";

const reportErrorToTelegram = (error: unknown, env: unknown) => {
  const envSafe = envSchema.safeParse(env);
  if (
    !envSafe.success ||
    !envSafe.data.BOT_ERROR_REPORTING_TOKEN ||
    !envSafe.data.BOT_ERROR_REPORTING_USER_ID
  ) {
    return;
  }

  const bot = new Bot(envSafe.data.BOT_ERROR_REPORTING_TOKEN);
  return bot.api
    .sendMessage(
      envSafe.data.BOT_ERROR_REPORTING_USER_ID,
      JSON.stringify(error, Object.getOwnPropertyNames(error)),
    )
    .catch((error) => console.error("Telegram error report failed:", error));
};

export function handleError<T>(
  callback: (...args: Parameters<PagesFunction>) => Promise<T>,
): (...args: Parameters<PagesFunction>) => Promise<T> {
  return async (...args: Parameters<PagesFunction>) => {
    try {
      return await callback(...args);
    } catch (e) {
      if (e instanceof DatabaseException) {
        console.error(e.error);
        console.error(e.error.hint);
      }
      if (e instanceof ZodError) {
        console.error(e.issues);
      }
      await reportErrorToTelegram(e, args[0].env);
      throw e;
    }
  };
}