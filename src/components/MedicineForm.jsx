import { useState } from 'react';
import { createMedicine, updateMedicine } from '../api';

export default function MedicineForm({ medicine, onBack }) {
  const [form, setForm] = useState({
    name: medicine?.name || '',
    manufacturer: medicine?.manufacturer || '',
    price: medicine?.price || '',
    quantity: medicine?.quantity || 0,
    description: medicine?.description || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };
    try {
      if (medicine) {
        await updateMedicine(medicine.id, payload);
      } else {
        await createMedicine(payload);
      }
      onBack();
    } catch (err) {
      if (err.response?.status === 422) {
        setError('Проверьте поля: цена > 0, название не пустое.');
      } else if (err.response?.status === 401) {
        setError('Ошибка авторизации. Проверьте admin/secret в api.js');
      } else {
        setError('Ошибка сохранения');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{medicine ? 'Редактировать' : 'Добавить'} лекарство</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Название *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Производитель *</label>
          <input name="manufacturer" value={form.manufacturer} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Цена *</label>
          <input name="price" type="number" step="0.01" min="0.01" value={form.price} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Количество</label>
          <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Описание</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="2" className="w-full border p-2 rounded" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Сохранить</button>
          <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Отмена</button>
        </div>
      </form>
    </div>
  );
}