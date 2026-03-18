"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Упс, похоже нет соединения с базой данных :(
        </h1>
        <p className="mt-2 text-center text-2xl">
          Попробуйте обновить страницу
        </p>
      </div>
    </div>
  );
}
