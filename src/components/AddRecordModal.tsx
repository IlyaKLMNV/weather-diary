import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useAddWeatherRecordMutation, useGetUsersQuery } from '../features/weather/weatherAPI';
import { validateTemperature } from '../utils/validation';

interface AddRecordModalProps {
  visible: boolean;
  onClose: () => void;
}

// Валидация даты формата чч.мм дд.мм.гггг
const datePattern = /^\d{2}\.\d{2} \d{2}\.\d{2}\.\d{4}$/;

const AddRecordModal: React.FC<AddRecordModalProps> = ({ visible, onClose }) => {
  const [date, setDate] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [filledBy, setFilledBy] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [addWeatherRecord] = useAddWeatherRecordMutation();
  const [error, setError] = useState<string>('');

  // Загрузка списка пользователей с сервера
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const handleSave = async () => {
    const tempValue = parseFloat(temperature);
    if (!datePattern.test(date)) {
      setError('Дата должна быть в формате мм.чч дд.мм.гггг');
      return;
    }
    if (!validateTemperature(tempValue)) {
      alert('Температура должна быть от -50 до 60');
      return;
    }

    await addWeatherRecord({
      id: Date.now().toString(),
      date,
      temperature: tempValue,
      weather,
      filledBy,
      comment,
    });

    setDate('');
    setTemperature('');
    setWeather('');
    setFilledBy('');
    setComment('');
    setError('');

    onClose();
  };

  return (
    <Dialog header="Добавить запись" visible={visible} onHide={onClose}>
      <div className="p-fluid">
        <div className="p-field">
          <InputText
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Дата (мм.чч дд.мм.гггг)"
          />
          {error && <small className="p-error">{error}</small>}
        </div>
        <div className="p-field">
          <InputText
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Температура"
          />
        </div>
        <div className="p-field">
          <Dropdown
            value={weather}
            options={[
              { label: 'Солнечно', value: 'Солнечно' },
              { label: 'Дождливо', value: 'Дождливо' },
              { label: 'Облачно', value: 'Облачно' },
            ]}
            onChange={(e) => setWeather(e.value)}
            placeholder="Погода"
          />
        </div>
        <div className="p-field">
          {usersLoading ? (
            <p>Загрузка пользователей...</p>
          ) : (
            <Dropdown
              value={filledBy}
              options={users}
              onChange={(e) => setFilledBy(e.value)}
              placeholder="Кто заполнил"
            />
          )}
        </div>
        <div className="p-field">
          <InputTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Комментарий"
          />
        </div>
      </div>
      <Button label="Сохранить" onClick={handleSave} />
    </Dialog>
  );
};

export default AddRecordModal;
