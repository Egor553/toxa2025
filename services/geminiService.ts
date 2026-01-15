
import { NDVIResult, ChatMessage, RecyclingPoint } from "../types";

/**
 * Статическая база экологических данных по городам России.
 * Используется вместо нейросети для мгновенной работы и стабильности.
 */
const CITY_ECO_DATA: Record<string, NDVIResult> = {
  "Москва": {
    city: "Москва",
    ndviValue: 0.42,
    percentage: 38,
    healthStatus: "Стабильно-удовлетворительное",
    timestamp: new Date().toISOString(),
    historicalTrend: [0.45, 0.44, 0.42, 0.41, 0.42]
  },
  "Санкт-Петербург": {
    city: "Санкт-Петербург",
    ndviValue: 0.38,
    percentage: 31,
    healthStatus: "Требует внимания",
    timestamp: new Date().toISOString(),
    historicalTrend: [0.40, 0.39, 0.38, 0.37, 0.38]
  },
  "Троицк": {
    city: "Троицк",
    ndviValue: 0.68,
    percentage: 62,
    healthStatus: "Высокий уровень озеленения",
    timestamp: new Date().toISOString(),
    historicalTrend: [0.72, 0.70, 0.69, 0.68, 0.68]
  },
  "Казань": {
    city: "Казань",
    ndviValue: 0.48,
    percentage: 42,
    healthStatus: "Хорошее",
    timestamp: new Date().toISOString(),
    historicalTrend: [0.44, 0.45, 0.46, 0.47, 0.48]
  }
};

const DEFAULT_ECO_DATA = (cityName: string): NDVIResult => ({
  city: cityName,
  ndviValue: 0.35,
  percentage: 25,
  healthStatus: "Средний уровень (данные уточняются)",
  timestamp: new Date().toISOString(),
  historicalTrend: [0.35, 0.35, 0.35, 0.35, 0.35]
});

export const analyzeEcologicalState = async (cityName: string): Promise<NDVIResult> => {
  // Имитация задержки сети для реалистичности
  await new Promise(resolve => setTimeout(resolve, 800));
  const key = Object.keys(CITY_ECO_DATA).find(k => cityName.toLowerCase().includes(k.toLowerCase()));
  return key ? CITY_ECO_DATA[key] : DEFAULT_ECO_DATA(cityName);
};

export const getEnvironmentalAdvice = async (data: NDVIResult): Promise<string> => {
  if (data.percentage > 50) {
    return "Сохраняйте существующие лесные массивы. Рекомендуется создание эко-троп и ограничение точечной застройки в зеленых зонах.";
  }
  return "Рекомендуется увеличение площади парковых зон на 15%. Необходимо внедрение систем вертикального озеленения и очистки ливневых стоков.";
};

/**
 * Помощник теперь работает на базе локальных правил (без нейросети)
 */
export const ecoAssistantChat = async (history: ChatMessage[], message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const msg = message.toLowerCase();
  
  if (msg.includes("пластик") || msg.includes("сдать")) {
    return "Вы можете найти ближайшие пункты приема пластика во вкладке 'Карта'. В Москве рекомендуем центр 'Собиратор'.";
  }
  if (msg.includes("ndvi") || msg.includes("индекс")) {
    return "Индекс NDVI показывает плотность растительности. Чем выше значение (от 0 до 1), тем больше здоровой зелени в городе.";
  }
  if (msg.includes("привет") || msg.includes("здравствуй")) {
    return "Здравствуйте! Я ваш локальный эко-гид. Могу рассказать про пункты приема вторсырья или индекс озеленения вашего города.";
  }
  
  return "Я зафиксировал ваш вопрос. Для получения точной информации по переработке в РФ рекомендую воспользоваться разделом 'Карта'.";
};
