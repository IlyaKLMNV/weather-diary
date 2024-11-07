import { rest } from 'msw';
import { WeatherRecord } from '../types';

// Функция для загрузки данных из localStorage
const loadRecordsFromLocalStorage = (): WeatherRecord[] => {
  try {
    const serializedData = localStorage.getItem('weatherRecords');
    return serializedData ? JSON.parse(serializedData) : [];
  } catch (e) {
    console.error("Failed to load records from localStorage", e);
    return [];
  }
};

// Тестовые данные пользователей
const users = [
  { label: 'Иванов Петр Иванович', value: 'Иванов Петр Иванович' },
  { label: 'Викторов Антон Степанович', value: 'Викторов Антон Степанович' },
  { label: 'Цаплин александр Сергеевич', value: 'Цаплин александр Сергеевич' },
];

// Функция для сохранения данных в localStorage
const saveRecordsToLocalStorage = (records: WeatherRecord[]) => {
  try {
    const serializedData = JSON.stringify(records);
    localStorage.setItem('weatherRecords', serializedData);
  } catch (e) {
    console.error("Failed to save records to localStorage", e);
  }
};

// Инициализация массива с данными из localStorage
let weatherRecords = loadRecordsFromLocalStorage();

export const handlers = [
  // Эндпоинт для получения списка пользователей
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  // Эндпоинт для получения всех записей
  rest.get('/api/weatherRecords', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(weatherRecords));
  }),

  // Эндпоинт для добавления новой записи
  rest.post('/api/weatherRecords', (req, res, ctx) => {
    const newRecord = req.body as WeatherRecord;

    if (!newRecord.id) {
      return res(ctx.status(400), ctx.json({ error: 'ID is required for each record' }));
    }

    weatherRecords.push(newRecord);
    saveRecordsToLocalStorage(weatherRecords);
    return res(ctx.status(201), ctx.json(newRecord));
  }),

  // Эндпоинт для удаления записи по ID
  rest.delete('/api/weatherRecords/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = weatherRecords.findIndex((record) => record.id === id);

    if (index !== -1) {
      weatherRecords.splice(index, 1);
      saveRecordsToLocalStorage(weatherRecords);
      return res(ctx.status(200), ctx.json({ id }));
    } else {
      return res(ctx.status(404), ctx.json({ error: 'Record not found' }));
    }
  }),
];
