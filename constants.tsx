
import React from 'react';
import { History, BarChart3, Recycle, MessageSquare } from 'lucide-react';
import { RecyclingPoint, RecyclingZone } from './types';
import { RUSSIA_POINTS } from './russiaData';

export const RECYCLING_POINTS: RecyclingPoint[] = RUSSIA_POINTS;

export const RECYCLING_ZONES: RecyclingZone[] = [
  { id: 'z1', name: 'Центральный узел', description: 'Зона высокой плотности.', color: '#6366f1', polygon: [[55.5, 37.3], [55.9, 37.3], [55.9, 37.9], [55.5, 37.9]] }
];

export const NAV_ITEMS = [
  { id: 'retrospective', label: 'История', icon: <History className="w-5 h-5" />, description: 'Динамика 1995-2026' },
  { id: 'analyzer', label: 'Анализ', icon: <BarChart3 className="w-5 h-5" />, description: 'Индекс NDVI' },
  { id: 'recycling', label: 'Карта', icon: <Recycle className="w-5 h-5" />, description: 'Пункты РФ' },
  { id: 'assistant', label: 'AI Гид', icon: <MessageSquare className="w-5 h-5" />, description: 'Ваш помощник' },
];

export const TROITSK_COORDS: [number, number] = [55.485, 37.302];
export const RUSSIA_CENTER: [number, number] = [61.524, 105.318];
