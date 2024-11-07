import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { WeatherRecord } from '../types';
import { useDeleteWeatherRecordMutation, useGetWeatherRecordsQuery } from '../features/weather/weatherAPI';

const WeatherTable: React.FC = () => {
  const { data: records = [], isLoading, error } = useGetWeatherRecordsQuery();
  const [deleteWeatherRecord] = useDeleteWeatherRecordMutation();

  const handleDelete = (id: string) => {
    deleteWeatherRecord(id);
  };

  if (isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    console.error('Ошибка при загрузке данных:', error);
    return <p>Ошибка при загрузке данных.</p>;
  }

  return (
    <DataTable value={records} emptyMessage={<div className='weather-table-emptyMessage'>Записей пока нет</div>}>
      <Column field="date" header="Дата и время" />
      <Column field="temperature" header="Температура" />
      <Column field="weather" header="Погода" />
      <Column field="filledBy" header="Кто заполнил" />
      <Column field="comment" header="Комментарий" />
      <Column
        body={(rowData: WeatherRecord) => (
          <Button
            label="Удалить"
            icon="pi pi-times"
            className="p-button-danger"
            onClick={() => handleDelete(rowData.id)}
          />
        )}
      />
    </DataTable>
  );
};

export default WeatherTable;
