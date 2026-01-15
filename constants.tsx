
import React from 'react';
import { History, BarChart3, Recycle } from 'lucide-react';
import { RecyclingPoint, RecyclingZone } from './types';

export const RECYCLING_POINTS: RecyclingPoint[] = [
  {
    id: '1',
    name: 'Эко-пункт Троицк Центр',
    type: 'plastic',
    address: 'ул. Центральная, 12',
    coords: [55.483, 37.300],
    hours: '09:00 - 20:00',
    description: 'Принимаем ПЭТ (1), ПНД (2). Просьба споласкивать тару.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    name: 'Макулатура Троицк',
    type: 'paper',
    address: 'ул. Текстильщиков, 5',
    coords: [55.488, 37.295],
    hours: '10:00 - 18:00',
    description: 'Газеты, журналы, картон. Не принимаем чеки и упаковку от яиц.',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    name: 'Бокс для батареек (ВкусВилл)',
    type: 'batteries',
    address: 'мкр. В, 39',
    coords: [55.479, 37.305],
    hours: '08:00 - 22:00',
    description: 'Сбор любых бытовых батареек и аккумуляторов.',
    image: 'https://images.unsplash.com/photo-1591113061614-118128336215?auto=format&fit=crop&q=80&w=400'
  }
];

export const RECYCLING_ZONES: RecyclingZone[] = [
  {
    id: 'z1',
    name: 'Центральный кластер',
    description: 'Зона сбора пластика и стекла. Вывоз: Вт, Чт.',
    color: '#6366f1',
    polygon: [
      [55.480, 37.290],
      [55.490, 37.290],
      [55.490, 37.310],
      [55.480, 37.310]
    ]
  },
  {
    id: 'z2',
    name: 'Промзона Сиреневая',
    description: 'Прием опасных отходов и электроники.',
    color: '#f43f5e',
    polygon: [
      [55.470, 37.280],
      [55.475, 37.280],
      [55.475, 37.295],
      [55.470, 37.295]
    ]
  },
  {
    id: 'z3',
    name: 'Парковый сектор',
    description: 'Зона био-отходов. Компостирование листвы.',
    color: '#10b981',
    polygon: [
      [55.495, 37.300],
      [55.505, 37.300],
      [55.505, 37.320],
      [55.495, 37.320]
    ]
  }
];

export const NAV_ITEMS = [
  { id: 'retrospective', label: 'История', icon: <History className="w-5 h-5" />, description: 'Динамика 1995-2025' },
  { id: 'analyzer', label: 'Анализ', icon: <BarChart3 className="w-5 h-5" />, description: 'Индекс NDVI' },
  { id: 'recycling', label: 'Карта', icon: <Recycle className="w-5 h-5" />, description: 'Вторсырье' },
];

export const TROITSK_COORDS: [number, number] = [55.485, 37.302];
