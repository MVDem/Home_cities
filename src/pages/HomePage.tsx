import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IState } from '../components/types/type';
import Card from '../layouts/Card';
import SearchForm from '../layouts/searchForm';

export default function HomePage() {
  const citiesView = useSelector((state: IState) => state.cities.viewList);

  return (
    <div className="homePage">
      <section className="menu">
        <SearchForm />
      </section>
      <section className="content">
        <div className="content__wrapper">
          {citiesView.length ? (
            citiesView?.map((e, i) => {
              if (e.active) {
                return (
                  <NavLink key={i} to={`/${e.name}`} className="link">
                    <Card city={e} />
                  </NavLink>
                );
              }
              return <></>;
            })
          ) : (
            <></>
          )}
        </div>
        {!citiesView.length && (
          <div className="content__error">
            <p>No results found</p>
          </div>
        )}
      </section>
    </div>
  );
}
