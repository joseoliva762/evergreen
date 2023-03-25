import './styles.scss';

export const Button = ({ label, type, onClick }) => {
  return (
    <button className="form__button" type={type} onClick={onClick}>
      {label}
    </button>
  );
}