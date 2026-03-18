import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";

export function prismaKnownError(e: unknown) {
  if (!(e instanceof PrismaClientValidationError))
    throw new Error("Неизвестная ошибка");

  if (e instanceof PrismaClientKnownRequestError) {
    const error = QueryError.get(e.code);

    if (!error) throw new Error("Неизвестная ошибка");

    throw new Error(error.message);
  } else if (e instanceof PrismaClientValidationError) {
    console.error(
      "Prisma Validation Error: Invalid input data provided ",
      e.message,
    );
    throw new Error("Ошибка базы данных");
  } else {
    // Handle any other unexpected errors
    console.error("An unexpected error occurred:", e);
    throw new Error("Неизвестная ошибка");
  }
}

export const QueryError = new Map<
  string,
  { message: string; httpStatus: number }
>([
  [
    "P2000",
    {
      message:
        "Предоставленное значение для колонки слишком длинное для данного типа колонки",
      httpStatus: 400,
    },
  ],
  [
    "P2001",
    {
      message: "Запрашиваемая запись в условии where не существует",
      httpStatus: 404,
    },
  ],
  [
    "P2002",
    { message: "Нарушение уникальности (unique constraint)", httpStatus: 409 },
  ],
  ["P2003", { message: "Нарушение внешнего ключа", httpStatus: 409 }],
  [
    "P2004",
    { message: "Нарушение ограничения в базе данных", httpStatus: 400 },
  ],
  [
    "P2005",
    {
      message:
        "Значение, сохраненное в базе данных для данного поля, недопустимо для его типа",
      httpStatus: 400,
    },
  ],
  [
    "P2006",
    {
      message: "Предоставленное значение для поля является недопустимым",
      httpStatus: 400,
    },
  ],
  ["P2007", { message: "Ошибка валидации данных", httpStatus: 400 }],
  [
    "P2008",
    { message: "Не удалось разобрать запрос (parse error)", httpStatus: 400 },
  ],
  ["P2009", { message: "Не удалось проверить запрос", httpStatus: 400 }],
  ["P2010", { message: "Ошибка при выполнении raw-запроса", httpStatus: 500 }],
  ["P2011", { message: "Нарушение ограничения NOT NULL", httpStatus: 400 }],
  ["P2012", { message: "Отсутствует обязательное значение", httpStatus: 400 }],
  ["P2013", { message: "Отсутствует обязательный аргумент", httpStatus: 400 }],
  [
    "P2014",
    {
      message:
        "Изменение, которое вы пытаетесь применить, нарушает обязательное отношение",
      httpStatus: 400,
    },
  ],
  ["P2015", { message: "Связанная запись не найдена", httpStatus: 404 }],
  ["P2016", { message: "Ошибка интерпретации запроса", httpStatus: 400 }],
  [
    "P2017",
    {
      message:
        "Записи для связи между родительской и дочерней моделями не соединены",
      httpStatus: 400,
    },
  ],
  [
    "P2018",
    {
      message: "Необходимые связанные записи не найдены",
      httpStatus: 404,
    },
  ],
  ["P2019", { message: "Ошибка ввода", httpStatus: 400 }],
  [
    "P2020",
    {
      message:
        "Значение выходит за пределы допустимого диапазона для данного типа",
      httpStatus: 400,
    },
  ],
  [
    "P2021",
    {
      message: "Таблица не существует в текущей базе данных",
      httpStatus: 404,
    },
  ],
  [
    "P2022",
    {
      message: "Колонка не существует в текущей базе данных",
      httpStatus: 404,
    },
  ],
  ["P2023", { message: "Несогласованность данных в колонке", httpStatus: 400 }],
  [
    "P2024",
    {
      message: "Таймаут при получении нового соединения из пула",
      httpStatus: 500,
    },
  ],
  [
    "P2025",
    {
      message:
        "Операция не выполнена, так как она зависит от одной или нескольких записей, которые были обязательны, но не найдены",
      httpStatus: 404,
    },
  ],
  [
    "P2026",
    {
      message:
        "Текущий провайдер базы данных не поддерживает функционал, используемый в запросе",
      httpStatus: 400,
    },
  ],
  [
    "P2027",
    {
      message:
        "При выполнении запроса произошло несколько ошибок в базе данных",
      httpStatus: 500,
    },
  ],
]);
