
import { RecyclingPoint } from './types';

export const RUSSIA_POINTS: RecyclingPoint[] = [
  // --- МОСКВА (30 точек по округам) ---
  // ЦАО
  { id: 'm-c-1', name: 'Эко-центр "Сборка"', type: 'paper', address: 'Москва, Потаповский пер., 5', coords: [55.761, 37.640], hours: '10:00 - 21:00', description: 'Макулатура, стекло, редкий пластик.' },
  { id: 'm-c-2', name: 'Собиратор Центр', type: 'plastic', address: 'Москва, Садовническая наб., 7', coords: [55.748, 37.632], hours: '12:00 - 20:00', description: 'Прием популярных фракций.' },
  { id: 'm-c-3', name: 'Green Point Китай-город', type: 'batteries', address: 'Москва, ул. Забелина, 1', coords: [55.754, 37.639], hours: '09:00 - 22:00', description: 'Сбор батареек.' },
  { id: 'm-c-4', name: 'СтеклоМир Арбат', type: 'glass', address: 'Москва, пер. Сивцев Вражек, 12', coords: [55.748, 37.596], hours: '10:00 - 19:00', description: 'Прием любой стеклянной тары.' },
  { id: 'm-c-5', name: 'Макулатура Пресня', type: 'paper', address: 'Москва, ул. Красная Пресня, 24', coords: [55.761, 37.561], hours: '08:00 - 20:00', description: 'Прием газет и журналов.' },

  // САО
  { id: 'm-n-1', name: 'Эко-Точка Отрадное', type: 'plastic', address: 'Москва, ул. Декабристов, 12', coords: [55.861, 37.604], hours: '10:00 - 20:00', description: 'Пластик 01 и 02.' },
  { id: 'm-n-2', name: 'Втормет Ховрино', type: 'glass', address: 'Москва, ул. Фестивальная, 2', coords: [55.858, 37.485], hours: '09:00 - 18:00', description: 'Стекло и жесть.' },
  { id: 'm-n-3', name: 'Бумага САО', type: 'paper', address: 'Москва, Кронштадтский б-р, 7', coords: [55.839, 37.489], hours: '08:00 - 17:00', description: 'Офисная бумага.' },
  { id: 'm-n-4', name: 'ЭкоСбор Тимирязевская', type: 'plastic', address: 'Москва, ул. Тимирязевская, 11', coords: [55.809, 37.559], hours: '10:00 - 19:00', description: 'ПЭТ и HDPE.' },
  { id: 'm-n-5', name: 'Батарейки Коптево', type: 'batteries', address: 'Москва, ул. Зои и Александра Космодемьянских, 23', coords: [55.821, 37.512], hours: '24/7', description: 'Контейнер самообслуживания.' },

  // ЮАО
  { id: 'm-s-1', name: 'Собиратор Склад (Юг)', type: 'plastic', address: 'Москва, Кавказский бульвар, 54', coords: [55.629, 37.665], hours: '12:00 - 20:00', description: 'Крупнейший центр переработки.' },
  { id: 'm-s-2', name: 'Пункт "Зеленый Слон"', type: 'batteries', address: 'Москва, ул. Свободы, 14', coords: [55.823, 37.452], hours: '10:00 - 19:00', description: 'Сбор батареек.' },
  { id: 'm-s-3', name: 'ВторЦветМет Бутово', type: 'paper', address: 'Москва, ул. Поляны, 54', coords: [55.545, 37.545], hours: '08:00 - 17:00', description: 'Прием картона.' },
  { id: 'm-s-4', name: 'Эко-Хаб Чертаново', type: 'glass', address: 'Москва, ул. Кировоградская, 14', coords: [55.611, 37.606], hours: '10:00 - 21:00', description: 'Стекло и ПЭТ.' },
  { id: 'm-s-5', name: 'Пластик ЮАО', type: 'plastic', address: 'Москва, ул. Дорожная, 3', coords: [55.632, 37.625], hours: '09:00 - 18:00', description: 'Промышленный пластик.' },

  // ВАО
  { id: 'm-e-1', name: 'Эко-Пункт Измайлово', type: 'paper', address: 'Москва, Измайловский пр-т, 54', coords: [55.794, 37.785], hours: '10:00 - 19:00', description: 'Макулатура.' },
  { id: 'm-e-2', name: 'Стекло Перово', type: 'glass', address: 'Москва, ул. Перовская, 31', coords: [55.748, 37.765], hours: '09:00 - 20:00', description: 'Бутылки и банки.' },
  { id: 'm-e-3', name: 'Батарейки Новокосино', type: 'batteries', address: 'Москва, ул. Суздальская, 26', coords: [55.741, 37.852], hours: '08:00 - 23:00', description: 'Эко-бокс в ТЦ.' },
  { id: 'm-e-4', name: 'Пластик-Р Гольяново', type: 'plastic', address: 'Москва, ул. Хабаровская, 15', coords: [55.821, 37.825], hours: '10:00 - 18:00', description: 'Прием упаковки.' },
  { id: 'm-e-5', name: 'ЭкоСбор Преображенка', type: 'paper', address: 'Москва, ул. Большая Черкизовская, 5', coords: [55.795, 37.712], hours: '09:00 - 19:00', description: 'Прием бумаги.' },

  // ЗАО
  { id: 'm-w-1', name: 'Эко-Пункт "Фили"', type: 'glass', address: 'Москва, Багратионовский пр., 5', coords: [55.742, 37.502], hours: '09:00 - 21:00', description: 'Стекло в ЗАО.' },
  { id: 'm-w-2', name: 'Крылатское Вторсырье', type: 'paper', address: 'Москва, Осенний б-р, 12', coords: [55.761, 37.412], hours: '10:00 - 19:00', description: 'Макулатура.' },
  { id: 'm-w-3', name: 'Эко-Ника Кунцево', type: 'plastic', address: 'Москва, ул. Партизанская, 25', coords: [55.735, 37.405], hours: '09:00 - 18:00', description: 'Сбор ПЭТ.' },
  { id: 'm-w-4', name: 'Батарейки Солнцево', type: 'batteries', address: 'Москва, ул. Авиаторов, 10', coords: [55.639, 37.391], hours: '24/7', description: 'Уличный контейнер.' },
  { id: 'm-w-5', name: 'Стекло Тропарево', type: 'glass', address: 'Москва, Ленинский пр-т, 146', coords: [55.651, 37.481], hours: '10:00 - 20:00', description: 'Прием тары.' },

  // ТиНАО (Новая Москва)
  { id: 'tr-1', name: 'Троицк-Вторсырье', type: 'paper', address: 'Троицк, мкр. "В", 42', coords: [55.485, 37.305], hours: '09:00 - 20:00', description: 'Сбор макулатуры.' },
  { id: 'tr-2', name: 'Эко-Бокс Троицк Центр', type: 'batteries', address: 'Троицк, Сиреневый бульвар, 1', coords: [55.482, 37.298], hours: '08:00 - 22:00', description: 'Сбор батареек.' },
  { id: 'tr-3', name: 'Пластик Ватутинки', type: 'plastic', address: 'Ватутинки, ул. Дмитрия Рябинкина, 14', coords: [55.501, 37.332], hours: '10:00 - 18:00', description: 'Прием ПЭТ.' },
  { id: 'tr-4', name: 'Макулатура Коммунарка', type: 'paper', address: 'Коммунарка, ул. Лазурная, 1', coords: [55.561, 37.485], hours: '09:00 - 19:00', description: 'Сбор бумаги.' },
  { id: 'tr-5', name: 'Стекло Московский', type: 'glass', address: 'г. Московский, 1-й мкр, 23', coords: [55.592, 37.345], hours: '10:00 - 19:00', description: 'Прием стекла.' },

  // --- МОСКОВСКАЯ ОБЛАСТЬ (20 точек) ---
  { id: 'mo-1', name: 'Мега Бак Химки', type: 'plastic', address: 'Химки, ул. Машинцева, 9', coords: [55.891, 37.425], hours: '09:00 - 18:00', description: 'Общегородской пункт.' },
  { id: 'mo-2', name: 'Эко-Химки Центр', type: 'paper', address: 'Химки, ул. Кирова, 12', coords: [55.885, 37.445], hours: '10:00 - 19:00', description: 'Макулатура.' },
  { id: 'mo-3', name: 'Одинцово Эко-Сбор', type: 'plastic', address: 'Одинцово, Можайское ш., 100', coords: [55.672, 37.261], hours: '09:00 - 20:00', description: 'Прием пластика.' },
  { id: 'mo-4', name: 'Батарейки Одинцово', type: 'batteries', address: 'Одинцово, ул. Маршала Неделина, 6', coords: [55.679, 37.275], hours: '24/7', description: 'Опасные отходы.' },
  { id: 'mo-5', name: 'Балашиха-Втор', type: 'paper', address: 'Балашиха, ш. Энтузиастов, 32', coords: [55.801, 37.945], hours: '08:00 - 17:00', description: 'Макулатура.' },
  { id: 'mo-6', name: 'Эко-Бокс Балашиха', type: 'batteries', address: 'Балашиха, пр-т Ленина, 25', coords: [55.795, 37.935], hours: '10:00 - 21:00', description: 'Элементы питания.' },
  { id: 'mo-7', name: 'Люберцы-Эко', type: 'plastic', address: 'Люберцы, Октябрьский пр-т, 112', coords: [55.675, 37.895], hours: '09:00 - 18:00', description: 'Прием ПЭТ.' },
  { id: 'mo-8', name: 'Стекло Люберцы', type: 'glass', address: 'Люберцы, ул. Кирова, 5', coords: [55.681, 37.882], hours: '10:00 - 19:00', description: 'Сбор тары.' },
  { id: 'mo-9', name: 'Мытищи Сбор', type: 'paper', address: 'Мытищи, ул. Мира, 3', coords: [55.912, 37.735], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'mo-10', name: 'Зеленоград-Эко', type: 'plastic', address: 'Зеленоград, 2-й мкр, к. 232', coords: [55.998, 37.212], hours: '10:00 - 18:00', description: 'Пластик.' },
  { id: 'mo-11', name: 'Красногорск Вторсырье', type: 'glass', address: 'Красногорск, ул. Ленина, 2', coords: [55.825, 37.325], hours: '09:00 - 20:00', description: 'Стекло.' },
  { id: 'mo-12', name: 'Королев-Бумага', type: 'paper', address: 'Королев, пр-т Космонавтов, 15', coords: [55.915, 37.855], hours: '10:00 - 19:00', description: 'Макулатура.' },
  { id: 'mo-13', name: 'Подольск Эко-Пункт', type: 'plastic', address: 'Подольск, пр-т Ленина, 107', coords: [55.431, 37.545], hours: '09:00 - 18:00', description: 'Упаковка.' },
  { id: 'mo-14', name: 'Стекло Подольск', type: 'glass', address: 'Подольск, ул. Кирова, 15', coords: [55.425, 37.535], hours: '10:00 - 19:00', description: 'Бутылки.' },
  { id: 'mo-15', name: 'Домодедово-Втор', type: 'paper', address: 'Домодедово, Каширское ш., 49', coords: [55.441, 37.755], hours: '08:00 - 17:00', description: 'Макулатура.' },
  { id: 'mo-16', name: 'Реутов-Пластик', type: 'plastic', address: 'Реутов, ул. Победы, 20', coords: [55.761, 37.861], hours: '10:00 - 19:00', description: 'Прием ПЭТ.' },
  { id: 'mo-17', name: 'Видное-Эко', type: 'paper', address: 'Видное, ул. Советская, 10', coords: [55.555, 37.712], hours: '09:00 - 18:00', description: 'Бумага.' },
  { id: 'mo-18', name: 'Щелково-Сбор', type: 'glass', address: 'Щелково, Пролетарский пр-т, 8', coords: [55.921, 37.995], hours: '10:00 - 20:00', description: 'Стекло.' },
  { id: 'mo-19', name: 'Лобня-Бокс', type: 'batteries', address: 'Лобня, ул. Ленина, 5', coords: [56.012, 37.475], hours: '24/7', description: 'Батарейки.' },
  { id: 'mo-20', name: 'Долгопрудный-Втор', type: 'plastic', address: 'Долгопрудный, Лихачевское ш., 1', coords: [55.935, 37.512], hours: '09:00 - 19:00', description: 'Прием ПЭТ.' },

  // --- САНКТ-ПЕТЕРБУРГ (10 точек) ---
  { id: 'spb-1', name: 'Правила Деления (Север)', type: 'plastic', address: 'СПб, ТЦ МЕГА Парнас', coords: [60.092, 30.379], hours: '10:00 - 22:00', description: 'Пункт сбора ПЭТ.' },
  { id: 'spb-2', name: 'БалтКом (Центр)', type: 'paper', address: 'СПб, ул. Литовская, 10', coords: [59.975, 30.355], hours: '08:00 - 19:00', description: 'Картон и бумага.' },
  { id: 'spb-3', name: 'Эко-Бокс Васильевский', type: 'batteries', address: 'СПб, 8-я линия В.О., 25', coords: [59.942, 30.277], hours: '24/7', description: 'Батарейки.' },
  { id: 'spb-4', name: 'Переработка.пт', type: 'glass', address: 'СПб, Софийская ул., 125', coords: [59.835, 30.435], hours: '09:00 - 18:00', description: 'Стекло.' },
  { id: 'spb-5', name: 'Эко-станция Охта', type: 'plastic', address: 'СПб, Якорная ул., 5', coords: [59.945, 30.415], hours: '10:00 - 21:00', description: 'Комплексный сбор.' },
  { id: 'spb-6', name: 'Точка Сбора ЮЗ', type: 'paper', address: 'СПб, пр-т Жукова, 31', coords: [59.845, 30.215], hours: '09:00 - 20:00', description: 'Макулатура.' },
  { id: 'spb-7', name: 'Стекло Приморский', type: 'glass', address: 'СПб, ул. Савушкина, 119', coords: [59.988, 30.215], hours: '10:00 - 21:00', description: 'Сбор тары.' },
  { id: 'spb-8', name: 'Батарейки Купчино', type: 'batteries', address: 'СПб, ул. Гашека, 5', coords: [59.831, 30.375], hours: '08:00 - 22:00', description: 'Элементы.' },
  { id: 'spb-9', name: 'Пластик Гатчина', type: 'plastic', address: 'Гатчина, ул. Чехова, 9', coords: [59.565, 30.125], hours: '10:00 - 19:00', description: 'ПЭТ.' },
  { id: 'spb-10', name: 'Эко-Сбор Пушкин', type: 'paper', address: 'Пушкин, Оранжерейная ул., 20', coords: [59.721, 30.412], hours: '09:00 - 18:00', description: 'Макулатура.' },

  // --- КАЗАНЬ (10 точек) ---
  { id: 'kaz-1', name: 'Эко-пункт Адоратского', type: 'plastic', address: 'Казань, ул. Адоратского, 21', coords: [55.828, 49.162], hours: '08:00 - 20:00', description: 'ПЭТ и пленка.' },
  { id: 'kaz-2', name: 'Чистый Мир Вахитовский', type: 'paper', address: 'Казань, ул. Пушкина, 10', coords: [55.792, 49.124], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'kaz-3', name: 'Точка Сбора Квартал', type: 'glass', address: 'Казань, пр. Ямашева, 46', coords: [55.827, 49.115], hours: '10:00 - 18:00', description: 'Стекло.' },
  { id: 'kaz-4', name: 'Эко-Бокс Горки', type: 'batteries', address: 'Казань, ул. Зорге, 66', coords: [55.748, 49.208], hours: '08:00 - 22:00', description: 'Батарейки.' },
  { id: 'kaz-5', name: 'Эко-Логика', type: 'plastic', address: 'Казань, ул. Техническая, 10', coords: [55.760, 49.140], hours: '09:00 - 17:00', description: 'Переработка.' },
  { id: 'kaz-6', name: 'Бумага Юдино', type: 'paper', address: 'Казань, ул. Ильича, 1', coords: [55.815, 48.885], hours: '10:00 - 19:00', description: 'Бумага.' },
  { id: 'kaz-7', name: 'Стекло Дербышки', type: 'glass', address: 'Казань, ул. Мира, 7', coords: [55.855, 49.215], hours: '09:00 - 18:00', description: 'Тара.' },
  { id: 'kaz-8', name: 'Пластик Авиастрой', type: 'plastic', address: 'Казань, ул. Дементьева, 1', coords: [55.858, 49.095], hours: '08:00 - 20:00', description: 'ПЭТ.' },
  { id: 'kaz-9', name: 'Батарейки Кировский', type: 'batteries', address: 'Казань, ул. Фрунзе, 5', coords: [55.812, 49.045], hours: '24/7', description: 'Элементы.' },
  { id: 'kaz-10', name: 'ВторЦентр Савиново', type: 'paper', address: 'Казань, ул. Лаврентьева, 9', coords: [55.832, 49.135], hours: '09:00 - 18:00', description: 'Макулатура.' },

  // --- ЕКАТЕРИНБУРГ (10 точек) ---
  { id: 'ekb-1', name: 'Немузей Мусора', type: 'glass', address: 'Екатеринбург, ул. Валека, 12', coords: [56.840, 60.595], hours: '10:00 - 20:00', description: 'Центр приема.' },
  { id: 'ekb-2', name: 'Урал-Рециклинг', type: 'paper', address: 'Екатеринбург, ул. Бригад, 18', coords: [56.885, 60.655], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'ekb-3', name: 'ВторМаг Академ', type: 'plastic', address: 'Екатеринбург, ул. де Геннина, 34', coords: [56.790, 60.515], hours: '10:00 - 18:00', description: 'Пластик.' },
  { id: 'ekb-4', name: 'Смарт-Бокс Эльмаш', type: 'batteries', address: 'Екатеринбург, ул. Стачек, 4', coords: [56.885, 60.625], hours: '08:00 - 21:00', description: 'Батарейки.' },
  { id: 'ekb-5', name: 'Спецавтобаза', type: 'glass', address: 'Екатеринбург, ул. Посадская, 3', coords: [56.825, 60.585], hours: '08:00 - 17:00', description: 'Стекло.' },
  { id: 'ekb-6', name: 'Бумага Химмаш', type: 'paper', address: 'Екатеринбург, ул. Дагестанская, 40', coords: [56.745, 60.685], hours: '10:00 - 19:00', description: 'Бумага.' },
  { id: 'ekb-7', name: 'Пластик Уралмаш', type: 'plastic', address: 'Екатеринбург, ул. Комиссаров, 10', coords: [56.905, 60.585], hours: '09:00 - 18:00', description: 'ПЭТ.' },
  { id: 'ekb-8', name: 'Стекло ЮЗ', type: 'glass', address: 'Екатеринбург, ул. Амундсена, 63', coords: [56.795, 60.575], hours: '10:00 - 20:00', description: 'Тара.' },
  { id: 'ekb-9', name: 'Батарейки Центр', type: 'batteries', address: 'Екатеринбург, ул. Малышева, 31', coords: [56.835, 60.605], hours: '24/7', description: 'Элементы.' },
  { id: 'ekb-10', name: 'Эко-Пункт Вторчермет', type: 'paper', address: 'Екатеринбург, ул. Титова, 19', coords: [56.775, 60.615], hours: '09:00 - 18:00', description: 'Макулатура.' },

  // --- НОВОСИБИРСК (10 точек) ---
  { id: 'nsk-1', name: 'Пчела (Центр)', type: 'glass', address: 'Новосибирск, ул. Некрасова, 55', coords: [55.045, 82.932], hours: '11:00 - 19:00', description: 'Стекло.' },
  { id: 'nsk-2', name: 'Грин-Сервис Левобережный', type: 'plastic', address: 'Новосибирск, ул. Петухова, 35', coords: [54.921, 82.935], hours: '08:00 - 17:00', description: 'Переработка.' },
  { id: 'nsk-3', name: 'Вторресурс Академ', type: 'paper', address: 'Новосибирск, ул. Кутателадзе, 4', coords: [54.855, 83.105], hours: '09:00 - 18:00', description: 'Бумага.' },
  { id: 'nsk-4', name: 'Эко-Сибирь', type: 'batteries', address: 'Новосибирск, ул. Большевистская, 131', coords: [55.005, 82.955], hours: '10:00 - 20:00', description: 'Батарейки.' },
  { id: 'nsk-5', name: 'Апрель-Пластик', type: 'plastic', address: 'Новосибирск, ул. Станционная, 30', coords: [55.015, 82.855], hours: '08:00 - 17:00', description: 'ПНД.' },
  { id: 'nsk-6', name: 'Бумага Заельцовка', type: 'paper', address: 'Новосибирск, ул. Ковальчук, 179', coords: [55.058, 82.915], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'nsk-7', name: 'Стекло Октябрьский', type: 'glass', address: 'Новосибирск, ул. Выборная, 87', coords: [54.995, 83.005], hours: '10:00 - 18:00', description: 'Тара.' },
  { id: 'nsk-8', name: 'Батарейки Речной', type: 'batteries', address: 'Новосибирск, ул. Восход, 5', coords: [55.012, 82.942], hours: '08:00 - 22:00', description: 'Элементы.' },
  { id: 'nsk-9', name: 'Пластик Дзержинка', type: 'plastic', address: 'Новосибирск, пр-т Дзержинского, 30', coords: [55.045, 82.965], hours: '10:00 - 19:00', description: 'ПЭТ.' },
  { id: 'nsk-10', name: 'ВторЦентр ОбьГЭС', type: 'paper', address: 'Новосибирск, ул. Софийская, 2', coords: [54.855, 82.935], hours: '09:00 - 18:00', description: 'Макулатура.' },

  // --- НИЖНИЙ НОВОГОРОД (10 точек) ---
  { id: 'nn-1', name: 'Исток Центр', type: 'paper', address: 'Н. Новгород, ул. Горького, 150', coords: [56.315, 43.995], hours: '09:00 - 18:00', description: 'Бумага.' },
  { id: 'nn-2', name: 'Эко-Пункт Сормово', type: 'plastic', address: 'Н. Новгород, б-р Юбилейный, 12', coords: [56.345, 43.865], hours: '08:00 - 20:00', description: 'Пластик.' },
  { id: 'nn-3', name: 'Нижэкоресурс Родионова', type: 'glass', address: 'Н. Новгород, ул. Родионова, 165', coords: [56.325, 44.055], hours: '10:00 - 19:00', description: 'Стекло.' },
  { id: 'nn-4', name: 'Батарейки Лядова', type: 'batteries', address: 'Н. Новгород, пл. Лядова, 2', coords: [56.312, 43.985], hours: '24/7', description: 'Элементы.' },
  { id: 'nn-5', name: 'Чистый Город Автозавод', type: 'plastic', address: 'Н. Новгород, ул. Коновалова, 4', coords: [56.375, 43.835], hours: '08:00 - 17:00', description: 'ПЭТ.' },
  { id: 'nn-6', name: 'Бумага Канавинский', type: 'paper', address: 'Н. Новгород, ул. Чкалова, 1', coords: [56.318, 43.945], hours: '09:00 - 18:00', description: 'Макулатура.' },
  { id: 'nn-7', name: 'Стекло Ленинский', type: 'glass', address: 'Н. Новгород, пр-т Ленина, 50', coords: [56.285, 43.915], hours: '10:00 - 19:00', description: 'Тара.' },
  { id: 'nn-8', name: 'Пластик Щербинки', type: 'plastic', address: 'Н. Новгород, пр-т Гагарина, 100', coords: [56.235, 43.955], hours: '09:00 - 18:00', description: 'Упаковка.' },
  { id: 'nn-9', name: 'Батарейки Мещера', type: 'batteries', address: 'Н. Новгород, ул. Акимова, 25', coords: [56.345, 43.935], hours: '08:00 - 22:00', description: 'Элементы.' },
  { id: 'nn-10', name: 'ВторЦентр Кузнечиха', type: 'paper', address: 'Н. Новгород, ул. Ивлиева, 10', coords: [56.295, 44.035], hours: '10:00 - 19:00', description: 'Бумага.' },

  // --- КРАСНОДАР (10 точек) ---
  { id: 'krd-1', name: 'Чистый Юбилейный', type: 'plastic', address: 'Краснодар, ул. 70-летия Октября, 1', coords: [45.035, 38.905], hours: '08:00 - 20:00', description: 'Пластик.' },
  { id: 'krd-2', name: 'Эко-Юг Фестивальный', type: 'paper', address: 'Краснодар, ул. Тургенева, 138', coords: [45.055, 38.945], hours: '09:00 - 19:00', description: 'Бумага.' },
  { id: 'krd-3', name: 'Кубань-Вторресурс', type: 'glass', address: 'Краснодар, ул. Уральская, 95', coords: [45.035, 39.045], hours: '08:00 - 17:00', description: 'Стекло.' },
  { id: 'krd-4', name: 'Зеленый Квартал', type: 'batteries', address: 'Краснодар, ул. Ставропольская, 210', coords: [45.015, 39.025], hours: '10:00 - 20:00', description: 'Батарейки.' },
  { id: 'krd-5', name: 'Эко-Пункт Пашковский', type: 'plastic', address: 'Краснодар, ул. Бершанской, 74', coords: [45.025, 39.085], hours: '09:00 - 18:00', description: 'ПЭТ.' },
  { id: 'krd-6', name: 'Бумага Красная', type: 'paper', address: 'Краснодар, ул. Красная, 100', coords: [45.045, 38.975], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'krd-7', name: 'Стекло Гидрострой', type: 'glass', address: 'Краснодар, ул. Невкипелого, 10', coords: [45.005, 39.065], hours: '10:00 - 18:00', description: 'Тара.' },
  { id: 'krd-8', name: 'Пластик Энка', type: 'plastic', address: 'Краснодар, ул. Кореновская, 1', coords: [45.095, 38.955], hours: '09:00 - 18:00', description: 'Упаковка.' },
  { id: 'krd-9', name: 'Батарейки Центр', type: 'batteries', address: 'Краснодар, ул. Северная, 300', coords: [45.035, 38.985], hours: '24/7', description: 'Элементы.' },
  { id: 'krd-10', name: 'ВторЦентр Славянский', type: 'paper', address: 'Краснодар, ул. Славянская, 5', coords: [45.045, 38.925], hours: '10:00 - 19:00', description: 'Бумага.' },

  // --- СОЧИ (10 точек) ---
  { id: 'sochi-1', name: 'Чистый Сочи Центр', type: 'plastic', address: 'Сочи, ул. Гагарина, 72', coords: [43.605, 39.735], hours: '10:00 - 19:00', description: 'Пластик.' },
  { id: 'sochi-2', name: 'Адлер-Эко', type: 'paper', address: 'Сочи, ул. Ленина, 156', coords: [43.435, 39.915], hours: '09:00 - 18:00', description: 'Бумага.' },
  { id: 'sochi-3', name: 'Хоста-Вторсырье', type: 'glass', address: 'Сочи, ул. Шоссейная, 5', coords: [43.515, 39.865], hours: '10:00 - 18:00', description: 'Стекло.' },
  { id: 'sochi-4', name: 'Лазаревское-Сбор', type: 'batteries', address: 'Сочи, ул. Победы, 100', coords: [43.915, 39.325], hours: '08:00 - 20:00', description: 'Батарейки.' },
  { id: 'sochi-5', name: 'Дагомыс-Эко', type: 'plastic', address: 'Сочи, ул. Армавирская, 20', coords: [43.655, 39.655], hours: '09:00 - 17:00', description: 'Пластик.' },
  { id: 'sochi-6', name: 'Бумага Кудепста', type: 'paper', address: 'Сочи, ул. Искры, 10', coords: [43.495, 39.895], hours: '09:00 - 18:00', description: 'Макулатура.' },
  { id: 'sochi-7', name: 'Стекло Мацеста', type: 'glass', address: 'Сочи, ул. Аллейная, 2', coords: [43.555, 39.795], hours: '10:00 - 18:00', description: 'Тара.' },
  { id: 'sochi-8', name: 'Батарейки ТЦ Моремолл', type: 'batteries', address: 'Сочи, ул. Новая Заря, 7', coords: [43.602, 39.732], hours: '10:00 - 22:00', description: 'Элементы.' },
  { id: 'sochi-9', name: 'Пластик Бытха', type: 'plastic', address: 'Сочи, ул. Бытха, 1', coords: [43.565, 39.765], hours: '09:00 - 18:00', description: 'Упаковка.' },
  { id: 'sochi-10', name: 'Эко-Сбор Мамайка', type: 'paper', address: 'Сочи, ул. Крымская, 15', coords: [43.625, 39.695], hours: '10:00 - 19:00', description: 'Бумага.' },

  // --- ВЛАДИВОСТОК (10 точек) ---
  { id: 'vld-1', name: 'Прим-Эко Снеговая', type: 'glass', address: 'Владивосток, ул. Снеговая, 64', coords: [43.145, 131.955], hours: '09:00 - 18:00', description: 'Стекло.' },
  { id: 'vld-2', name: 'Эко-ДВ Центр', type: 'paper', address: 'Владивосток, ул. Светланская, 15', coords: [43.115, 131.885], hours: '10:00 - 19:00', description: 'Макулатура.' },
  { id: 'vld-3', name: 'Вторсырье Бородинская', type: 'plastic', address: 'Владивосток, ул. Бородинская, 20', coords: [43.165, 131.925], hours: '08:00 - 17:00', description: 'Пластик.' },
  { id: 'vld-4', name: 'Зеленый Остров Калинина', type: 'batteries', address: 'Владивосток, ул. Калинина, 275', coords: [43.095, 131.915], hours: '10:00 - 21:00', description: 'Батарейки.' },
  { id: 'vld-5', name: 'Чистый Прим Фадеева', type: 'plastic', address: 'Владивосток, ул. Фадеева, 30', coords: [43.115, 131.965], hours: '09:00 - 18:00', description: 'Сбор.' },
  { id: 'vld-6', name: 'Бумага Чуркин', type: 'paper', address: 'Владивосток, ул. Окатовая, 12', coords: [43.085, 131.905], hours: '09:00 - 19:00', description: 'Макулатура.' },
  { id: 'vld-7', name: 'Стекло Вторая Речка', type: 'glass', address: 'Владивосток, ул. Русская, 44', coords: [43.161, 131.912], hours: '10:00 - 20:00', description: 'Тара.' },
  { id: 'vld-8', name: 'Батарейки Луговая', type: 'batteries', address: 'Владивосток, ул. Ивановская, 6', coords: [43.125, 131.935], hours: '08:00 - 22:00', description: 'Элементы.' },
  { id: 'vld-9', name: 'Пластик Тихая', type: 'plastic', address: 'Владивосток, ул. Сахалинская, 5', coords: [43.095, 131.945], hours: '10:00 - 18:00', description: 'ПЭТ.' },
  { id: 'vld-10', name: 'Втормет Эгершельд', type: 'paper', address: 'Владивосток, ул. Крыгина, 28', coords: [43.095, 131.865], hours: '09:00 - 18:00', description: 'Макулатура.' }
];
