import { ICity } from '../components/types/type';

export default function Card(props: { city: ICity }) {
  return (
    <div className="card">
      <h3 className="card__title">
        {props.city.name} - {props.city.country}
      </h3>
      <img className="card__image" src={props.city.image} alt="CityImage" />
      <p className="card__description">{props.city.description}</p>
    </div>
  );
}
