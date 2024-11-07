import React, { useState } from 'react';
import WeatherTable from './components/WeatherTable';
import AddRecordModal from './components/AddRecordModal';
import './App.scss';

const App: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div className="app-container">
      <WeatherTable />
      <AddRecordModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      <button className="add-record-button" onClick={() => setModalVisible(true)}>
        Добавить запись
      </button>
    </div>
  );
};

export default App;
