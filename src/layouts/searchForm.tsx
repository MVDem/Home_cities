import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../components/types/type';
import {
  sortByContinent,
  sortByDistance,
  searchByName,
  sortByName,
  removeSort,
} from '../components/store/citySlice';

export default function SearchForm() {
  const cities = useSelector((state: IState) => state.cities.data);
  const searchParams = useSelector(
    (state: IState) => state.cities.searchParams
  );
  const [input, setInput] = useState<string | null>(null);
  const [searchString, setSearchString] = useState(searchParams.searchString);
  const dispach = useDispatch();

  const handleSearchByName = (e: string) => {
    setSearchString(e);
    dispach(searchByName(e));
  };

  const handleSortByContinent = (e: string) => {
    setInput(null);
    dispach(sortByContinent(e));
  };

  const handleSortByDistance = (e: string) => {
    dispach(sortByDistance(e));
  };

  const handleSortByName = () => {
    setInput(null);
    dispach(removeSort());
    dispach(sortByName());
  };

  const handleRemoveSort = () => {
    setInput(null);
    dispach(removeSort());
    setSearchString('');
  };

  return (
    <div className="searchForm">
      <div className="searchForm__start"></div>
      {input === 'search' && (
        <input
          className="searchForm__inputForm"
          type="text"
          value={searchString ? searchString : ''}
          onChange={(e) => handleSearchByName(e.target.value)}
          placeholder="Type location"
        />
      )}
      {input === 'dist' && (
        <select
          className="searchForm__sortByDist"
          onChange={(e) => handleSortByDistance(e.target.value)}
          value={
            searchParams.userLocation?.name
              ? searchParams.userLocation?.name
              : 'Sort'
          }
        >
          <option value="Sort">Please choose your location</option>
          {cities.map((e, i) => {
            return (
              <option key={i} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      )}
      <button
        type="button"
        className="searchForm__searchBtn"
        onClick={() => setInput('search')}
      >
        <img
          className="searchForm__search"
          src="./search.png"
          alt="search-button"
        />
      </button>
      <button type="button" className="searchForm__searchBtn">
        <img
          className="searchForm__search"
          src="./dist.png"
          alt="search-button"
          onClick={() => setInput('dist')}
        />
      </button>
      <button
        type="button"
        className="searchForm__searchBtn"
        onClick={handleSortByName}
      >
        <img
          className="searchForm__search"
          src="./sort.png"
          alt="sort-button"
        />
      </button>
      <select
        className="searchForm__sortByContinent"
        onChange={(e) => handleSortByContinent(e.target.value)}
        value={searchParams.continent}
      >
        <option value="Sort">Sort by Continent</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Australia">Australia</option>
        <option value="Africa">Africa</option>
      </select>
      <button
        type="button"
        className="searchForm__searchBtn"
        onClick={handleRemoveSort}
      >
        <img
          className="searchForm__search"
          src="./closeWhite.png"
          alt="close-button"
        />
      </button>
      <div className="searchForm__end"></div>
    </div>
  );
}
