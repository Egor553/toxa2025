
import React from 'react';
import { History, BarChart3, Recycle, MessageSquare } from 'lucide-react';
import { RecyclingPoint, RecyclingZone } from './types';

export const RECYCLING_POINTS: RecyclingPoint[] = [
  // МОСКВА
  { id: 'mos-1', name: 'Собиратор (Главный эко-центр)', type: 'plastic', address: 'Москва, Кавказский бульвар, 54, стр. 5', coords: [55.629, 37.665], hours: '12:00 - 20:00', description: 'Самый крупный пункт приема. Принимают почти все виды пластика, электронику и одежду.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' },
  { id: 'mos-2', name: 'Эко-центр "Сборка"', type: 'paper', address: 'Москва, Потаповский переулок, 5, стр. 2', coords: [55.761, 37.640], hours: '10:00 - 21:00', description: 'Музей рециклинга и пункт приема макулатуры, стекла и редких видов пластика.', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400' },
  
  // САНКТ-ПЕТЕРБУРГ
  { id: 'spb-1', name: 'Правила Деления (МЕГА Парнас)', type: 'plastic', address: 'Санкт-Петербург, пересечение КАД и пр. Энгельса', coords: [60.092, 30.379], hours: '10:00 - 22:00', description: 'Удобный пункт раздельного сбора. Принимают ПЭТ, стекло и алюминий.', image: 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&q=80&w=400' },
  { id: 'spb-2', name: 'БалтКом (Прием картона)', type: 'paper', address: 'Санкт-Петербург, ул. Литовская, 10', coords: [59.975, 30.355], hours: '08:00 - 19:00', description: 'Промышленный прием макулатуры и картона в больших объемах.', image: 'https://images.unsplash.com/photo-1605600611284-1b5233646452?auto=format&fit=crop&q=80&w=400' },

  // КАЗАНЬ
  { id: 'kaz-1', name: 'Эко-пункт на Адоратского', type: 'plastic', address: 'Казань, ул. Адоратского, 21', coords: [55.828, 49.162], hours: '08:00 - 20:00', description: 'Прием ПЭТ, пленки и флаконов ПНД.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' },
  
  // ЕКАТЕРИНБУРГ
  { id: 'ekb-1', name: 'Немузей Мусора', type: 'batteries', address: 'Екатеринбург, ул. Антона Валека, 12', coords: [56.840, 60.595], hours: '10:00 - 20:00', description: 'Прием батареек, ламп и редкого вторсырья.', image: 'https://images.unsplash.com/photo-1591113061614-118128336215?auto=format&fit=crop&q=80&w=400' },

  // НОВОСИБИРСК
  { id: 'nsk-1', name: 'Эко-центр "Пчела"', type: 'glass', address: 'Новосибирск, ул. Некрасова, 55', coords: [55.045, 82.932], hours: '11:00 - 19:00', description: 'Принимают стекло, металл и пластиковые крышечки.', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fafa5?auto=format&fit=crop&q=80&w=400' },

  // СОЧИ
  { id: 'sochi-1', name: 'Эко-Сочи (Донская)', type: 'plastic', address: 'Сочи, ул. Донская, 28', coords: [43.614, 39.728], hours: '09:00 - 18:00', description: 'Сбор пластика и пленки на побережье.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' },

  // ВЛАДИВОСТОК
  { id: 'vld-1', name: 'Примтехнополис', type: 'batteries', address: 'Владивосток, ул. Бородинская, 46', coords: [43.167, 131.936], hours: '08:00 - 17:00', description: 'Утилизация опасных отходов, батареек и ртутных ламп.', image: 'https://images.unsplash.com/photo-1591113061614-118128336215?auto=format&fit=crop&q=80&w=400' },

  // ТРОИЦК (сохраняем для примера)
  { id: 'tr-1', name: 'Эко-пункт Троицк', type: 'plastic', address: 'Троицк, Центральная, 12', coords: [55.483, 37.300], hours: '09:00 - 21:00', description: 'Местный пункт приема пластика.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' }
];

export const RECYCLING_ZONES: RecyclingZone[] = [
  { id: 'z1', name: 'Московский узел', description: 'Зона высокой плотности переработки.', color: '#6366f1', polygon: [[55.5, 37.3], [55.9, 37.3], [55.9, 37.9], [55.5, 37.9]] }
];

export const NAV_ITEMS = [
  { id: 'retrospective', label: 'История', icon: <History className="w-5 h-5" />, description: 'Динамика 1995-2025' },
  { id: 'analyzer', label: 'Анализ', icon: <BarChart3 className="w-5 h-5" />, description: 'Индекс NDVI' },
  { id: 'recycling', label: 'Карта', icon: <Recycle className="w-5 h-5" />, description: 'Пункты РФ' },
  { id: 'assistant', label: 'AI Гид', icon: <MessageSquare className="w-5 h-5" />, description: 'Ваш помощник' },
];

export const TROITSK_COORDS: [number, number] = [55.485, 37.302];
