import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import Layout from './layouts/Layout';
import { getData } from './components/https/requests';
import { setCities } from './components/store/citySlice';
import { ICity } from './components/types/type';

const App: React.FC = () => {
  const [data, setData] = useState<ICity[]>();
  const dispach = useDispatch();

  useEffect(() => {
    if (!data) {
      getData(setData);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      dispach(setCities(data));
    }
  }, [data, dispach]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:name" element={<CityPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
