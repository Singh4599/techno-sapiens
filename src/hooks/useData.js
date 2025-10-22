import { useState, useEffect } from 'react';

// Generic hook for data fetching and CRUD operations
const useData = (service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: err } = await service.getAll();
      if (err) throw new Error(err);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const create = async (newItem) => {
    try {
      const { data: result, error: err } = await service.create(newItem);
      if (err) throw new Error(err);
      setData([...data, result]);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const update = async (id, updates) => {
    try {
      const { data: result, error: err } = await service.update(id, updates);
      if (err) throw new Error(err);
      setData(data.map(item => item.id === id ? result : item));
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const remove = async (id) => {
    try {
      const { error: err } = await service.delete(id);
      if (err) throw new Error(err);
      setData(data.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchData
  };
};

export default useData;
