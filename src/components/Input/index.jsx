import "./styles.scss";

export const Input = ({ label, name, type, value, placeholder, onChange }) => {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form__input"
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
