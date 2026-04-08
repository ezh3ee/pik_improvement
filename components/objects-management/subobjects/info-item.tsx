export default function InfoItem() {
  return (
    <div className="p-4">
      <div className="title">Адрес объекта</div>
      <div className="flex justify-between">
        <span className="left">ЖК</span>
        <span className="right">Б. Академическая 85</span>
      </div>
      <div className="flex justify-between">
        <span className="left">Тип</span>
        <span className="right">МКД</span>
      </div>
      <div className="flex justify-between">
        <span className="left">Стр. адрес</span>
        <span className="right">Москва, Б. Академическая ул., 85, корп.3</span>
      </div>
      <div className="flex justify-between">
        <span className="left">Почт. адрес</span>
        <span className="right">г. Москва, ул. Б. Академическая, д.85 к 3</span>
      </div>
    </div>
  );
}
