import { useState } from 'react';
import MedicineList from './components/MedicineList';
import MedicineForm from './components/MedicineForm';

function App() {
  const [view, setView] = useState('list'); // 'list' или 'form'
  const [editingMedicine, setEditingMedicine] = useState(null);

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setView('form');
  };

  const handleBack = () => {
    setEditingMedicine(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Аптека — Учёт лекарств</h1>
      {view === 'list' ? (
        <MedicineList onEdit={handleEdit} onAdd={() => setView('form')} />
      ) : (
        <MedicineForm medicine={editingMedicine} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;