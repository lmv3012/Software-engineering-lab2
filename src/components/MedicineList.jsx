import { useEffect, useState } from 'react';
import { getMedicines, deleteMedicine } from '../api';

export default function MedicineList({ onEdit, onAdd }) {
  const [medicines, setMedicines] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = { limit: 50, search: search || undefined, manufacturer: manufacturer || undefined };
      const res = await getMedicines(params);
      setMedicines(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [search, manufacturer]);

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить лекарство?')) return;
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch (err) {
      alert('Ошибка удаления (проверьте пароль в api.js)');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <input
          type="text"
          placeholder="Производитель"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="border p-2 rounded w-48"
        />
        <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Добавить
        </button>
        <span className="ml-auto text-gray-500">Всего: {total}</span>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Название</th>
              <th className="p-2 text-left">Производитель</th>
              <th className="p-2 text-right">Цена</th>
              <th className="p-2 text-right">Кол-во</th>
              <th className="p-2 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{m.id}</td>
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.manufacturer}</td>
                <td className="p-2 text-right">{m.price.toFixed(2)} ₽</td>
                <td className="p-2 text-right">{m.quantity}</td>
                <td className="p-2 text-center space-x-2">
                  <button onClick={() => onEdit(m)} className="text-blue-600 hover:underline">Ред.</button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:underline">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}