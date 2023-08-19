import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import CityPage from './pages/CityPage';
import { useEffect, useState } from 'react';
import { getData } from './components/https/requests';
import { setCities } from './components/store/citySlice';
import { ICity } from './components/types/type';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const [data, setData] = useState<ICity[]>();
  const dispach = useDispatch();

  useEffect(() => {
    if (!data) {
      getData(setData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispach(setCities(data));
    }
  }, [data]);

  // console.log('App');
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
