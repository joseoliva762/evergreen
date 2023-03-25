import './styles.scss';
import { Spin } from './../Spin';

export const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <Spin />
        <p className="loading__text">Loading...</p>
      </div>
    </div>
  );
}