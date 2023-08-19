import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../components/types/type';
import {
  sortByContinent,
  sortByDistance,
  searchByName,
  searchByCountryName,
} from '../components/store/citySlice';

export default function SearchForm() {
  const cities = useSelector((state: IState) => state.cities.data);
  const searchParams = useSelector(
    (state: IState) => state.cities.searchParams
  );

  const [searchString, setSearchString] = useState(searchParams.searchString);
  const [continent, setContinent] = useState(searchParams.continent);
  const [sortParam, setSortParam] = useState('');
  const [visible, setVisible] = useState<boolean>(true);
  const [location, setLocation] = useState(searchParams.userLocation?.name);

  const dispach = useDispatch();

  const handleSearchByName = (e: string) => {
    setSearchString(e);
    dispach(searchByName(e));
  };

  const handleSortByContinent = (e: string) => {
    setContinent(e);
    dispach(sortByContinent(e));
  };

  const handleSortByDistance = (e: string) => {
    setLocation(e);
    dispach(sortByDistance(e));
  };

  useEffect(() => {
    if (sortParam === 'Distance') {
      setVisible(false);
    } else if (sortParam === 'Name') {
      setVisible(true);
      dispach(searchByCountryName());
    }
  }, [sortParam]);

  return (
    <div className="searchForm">
      <p className="searchForm__lable">Search</p>
      <input
        className="searchForm__inputForm"
        type="text"
        value={searchString ? searchString : ''}
        onChange={(e) => handleSearchByName(e.target.value)}
        placeholder="Type location"
      />
      <label className="select">
        Search by continent
        <select
          className="select__form"
          onChange={(e) => handleSortByContinent(e.target.value)}
        >
          <option value={continent}>Please choose an continent</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Australia">Australia</option>
          <option value="Africa">Africa</option>
        </select>
      </label>
      <label className="select">
        Sort
        <select
          className="select__form"
          onChange={(e) => setSortParam(e.target.value)}
        >
          <option value={sortParam}>Please choose a method</option>
          <option value="Name">Name</option>
          <option value="Distance">Distance</option>
        </select>
        <select
          hidden={visible}
          className="select__form"
          onChange={(e) => handleSortByDistance(e.target.value)}
        >
          <option value={location}>Please choose your location</option>
          {cities.map((e, i) => {
            return (
              <option key={i} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
