import { Translator } from "../lib/translator/translator.ts";

const en = {
  start: `Hello! I help improving memory with spaced repetition. You can learn languages, history or other subjects 👇`,
  invalid_card_format:
    "Please send a message in the format: `front \\- back`\n\n*Example:*\nMe gusta \\- I like it",
  no_decks_created: `You don't have any personal decks yet. Create one in the app first 👇`,
  create_deck: "Create deck",
  create_card_from_deck_message:
    "To create a card from the text, select a deck: ",
  bot_button_cancel: "❌ Cancel",
  bot_button_confirm: "✅ Create",
  bot_button_edit_front: `✏️ Front`,
  bot_button_edit_back: `✏️ Back`,
  bot_button_edit_example: `✏️ Edit example`,
  cancelled: "Cancelled",
  card_created: "Card has been created",
  send_new_front: "Send a message with the new front",
  send_new_back: "Send a message with the new back",
  send_new_example: "Send a message with the new example",
  confirm_card_creation_front: `Create card?\n\n*Front:* `,
  confirm_card_creation_back: `\n\n*Back:* `,
  confirm_card_creation_example: `\n\n*Example:* `,
  start_button: "Start bot",
};

type Translation = typeof en;

const ru: Translation = {
  start: `Привет! Я помогаю улучшать память с помощью интервального повторения. Подхожу для изучения языков, истории и других предметов 👇`,
  invalid_card_format:
    "Пожалуйста, отправь сообщение в формате: `вопрос \\- ответ`\n\n*Пример:*\nMe gusta \\- Мне нравится",
  no_decks_created: `У тебя ещё нет личных колод. Создай колоду в приложении 👇`,
  create_deck: "Создать колоду",
  create_card_from_deck_message:
    "Чтобы создать карточку из этого текста, выбери колоду: ",
  bot_button_cancel: "❌ Отмена",
  cancelled: "Отменено",
  card_created: "Карточка создана",
  send_new_front: "Отправь сообщение с новым вопросом",
  send_new_back: "Отправь сообщение с новым ответом",
  send_new_example: "Отправь сообщение с новым примером",
  bot_button_confirm: "✅ Создать",
  bot_button_edit_back: `✏️ Ответ`,
  bot_button_edit_example: `✏️ Пример`,
  bot_button_edit_front: `✏️ Вопрос`,
  confirm_card_creation_back: `\n\n*Ответ:* `,
  confirm_card_creation_example: `\n\n*Пример:* `,
  confirm_card_creation_front: `Создать карточку?:\n\n*Вопрос:* `,
  start_button: "Запустить бота",
};

const es: Translation = {
  start:
    "Hola! Te ayudo a mejorar la memoria con la repetición espaciada. Puedes aprender idiomas, historia u otras materias 👇",
  invalid_card_format:
    "Envíe un mensaje en el formato: `pregunta \\- respuesta`\n\n*Ejemplo:*\nI like it \\- Me gusta",
  no_decks_created: `Todavía no tienes mazos personales. Crea uno en la aplicación 👇`,
  create_deck: "Crear mazo",
  create_card_from_deck_message:
    "Para crear una tarjeta a partir de este texto, seleccione un mazo: ",
  bot_button_cancel: "❌ Cancelar",
  cancelled: "Cancelado",
  card_created: "La tarjeta ha sido creada",
  send_new_front: "Enviar un mensaje con la nueva pregunta",
  send_new_back: "Enviar un mensaje con la nueva respuesta",
  send_new_example: "Enviar un mensaje con el nuevo ejemplo",
  confirm_card_creation_back: `\n\n*Respuesta:* `,
  bot_button_edit_front: `✏️ Pregunta`,
  bot_button_edit_example: `✏️ Ejemplo`,
  bot_button_edit_back: `✏️ Respuesta`,
  bot_button_confirm: "✅ Crear",
  confirm_card_creation_example: `\n\n*Ejemplo:* `,
  confirm_card_creation_front: `Crear tarjeta?:\n\n*Pregunta:* `,
  start_button: "Iniciar bot",
};

const ptBr: Translation = {
  start: "Olá! Eu ajudo a melhorar a memória com repetição espaçada. Perfeito para aprender idiomas, história ou outras matérias 👇",
  invalid_card_format:
    "Por favor, envie uma mensagem no formato: `pergunta \\- resposta`\n\n*Exemplo:*\nEu gosto \\- Me gusta",
  no_decks_created: `Você ainda não tem baralhos pessoais. Crie um no aplicativo 👇`,
  create_deck: "Criar baralho",
  create_card_from_deck_message:
    "Para criar um cartão a partir deste texto, selecione um baralho: ",
  bot_button_cancel: "❌ Cancelar",
  cancelled: "Cancelado",
  card_created: "Cartão criado",
  send_new_front: "Envie uma mensagem com a nova pergunta",
  send_new_back: "Envie uma mensagem com a nova resposta",
  send_new_example: "Envie uma mensagem com o novo exemplo",
  bot_button_confirm: "✅ Criar",
  bot_button_edit_back: `✏️ Resposta`,
  bot_button_edit_example: `✏️ Exemplo`,
  bot_button_edit_front: `✏️ Pergunta`,
  confirm_card_creation_back: `\n\n*Resposta:* `,
  confirm_card_creation_example: `\n\n*Exemplo:* `,
  confirm_card_creation_front: `Criar cartão?:\n\n*Pergunta:* `,
  start_button: "Iniciar bot",
};

const translations = { en, ru, es, 'pt-br': ptBr } as const;
export type Language = keyof typeof translations;

export const createTranslator = (lang: Language) => {
  return new Translator(translations, lang);
};

export type MemoCardTranslator = Translator<Language, any>;
