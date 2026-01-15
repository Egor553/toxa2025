
import { RecyclingPoint } from './types';

export const MOSCOW_POINTS: RecyclingPoint[] = [
  // ЦАО
  { id: 'm-cao-1', name: 'Эко-центр "Сборка" (Чистые пруды)', type: 'paper', address: 'Потаповский пер., 5, стр. 2', coords: [55.761, 37.640], hours: '10:00 - 21:00', description: 'Принимают макулатуру, стекло и редкие виды пластика.', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400' },
  { id: 'm-cao-2', name: 'Пункт на Новокузнецкой', type: 'batteries', address: 'ул. Пятницкая, 36', coords: [55.741, 37.629], hours: '09:00 - 21:00', description: 'Контейнер для батареек и малогабаритной электроники.' },

  // САО
  { id: 'm-sao-1', name: 'Эко-пункт Сокол', type: 'plastic', address: 'Ленинградский просп., 74', coords: [55.805, 37.515], hours: '10:00 - 20:00', description: 'Сбор ПЭТ-бутылок и алюминиевых банок.' },
  { id: 'm-sao-2', name: 'Мегабак Ховрино', type: 'glass', address: 'ул. Фестивальная, 2А', coords: [55.858, 37.481], hours: '08:00 - 20:00', description: 'Прием листового стекла и стеклотары.' },

  // СВАО
  { id: 'm-svao-1', name: 'СВАО-Эко', type: 'paper', address: 'ул. Тайнинская, 7', coords: [55.878, 37.675], hours: '09:00 - 18:00', description: 'Прием архивов, газет и картона.' },

  // ВАО
  { id: 'm-vao-1', name: 'Эко-центр Сокольники', type: 'plastic', address: '6-й Лучевой просек, 21', coords: [55.801, 37.678], hours: '10:00 - 19:00', description: 'Сбор пластиковых крышечек и пакетов.' },

  // ЮВАО
  { id: 'm-yuvao-1', name: 'Собиратор (Главный склад)', type: 'plastic', address: 'Кавказский бульвар, 54, стр. 5', coords: [55.629, 37.665], hours: '12:00 - 20:00', description: 'Принимают более 100 видов фракций.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' },

  // ЮАО
  { id: 'm-yuao-1', name: 'Пункт приема Нагатино', type: 'glass', address: 'ул. Нагатинская, 16', coords: [55.678, 37.635], hours: '09:00 - 20:00', description: 'Сбор банок и бутылок.' },

  // ЮЗАО
  { id: 'm-yuzao-1', name: 'Битца-Эко', type: 'batteries', address: 'Новоясеневский тупик, 1', coords: [55.596, 37.554], hours: '08:00 - 17:00', description: 'Прием батареек и ламп.' },

  // ЗАО
  { id: 'm-zao-1', name: 'Эко-точка Очаково', type: 'paper', address: 'ул. Наташи Ковшовой, 14', coords: [55.682, 37.452], hours: '10:00 - 19:00', description: 'Прием макулатуры и тетрапака.' },

  // СЗАО
  { id: 'm-szao-1', name: 'Куркино-Рециклинг', type: 'plastic', address: 'ул. Родионовская, 12', coords: [55.892, 37.391], hours: '09:00 - 21:00', description: 'Раздельный сбор пластика и металла.' },

  // Дополнительные важные точки
  { id: 'm-extra-1', name: 'Пункт ВкусВилл', type: 'batteries', address: 'ул. Профсоюзная, 102', coords: [55.641, 37.525], hours: '08:00 - 22:00', description: 'Контейнер для батареек.' },
  { id: 'm-extra-2', name: 'Эко-бокс IKEA', type: 'batteries', address: 'Химки, Микрорайон ИКЕА, к1', coords: [55.911, 37.397], hours: '10:00 - 23:00', description: 'Прием ламп и батареек.' },
  { id: 'm-extra-3', name: 'Сити-Бокс', type: 'paper', address: 'ул. Большая Татарская, 35', coords: [55.736, 37.636], hours: '24/7', description: 'Контейнер для бумаги.' }
];
