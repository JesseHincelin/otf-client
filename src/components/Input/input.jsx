import "./input.scss";

const Input = (props) => {
  const { className, id, label, value, type, disabled, required, placeholder, handleInputChange } =
    props;

  return (
    <div className={!className ? "field" : `field ${className}--field`}>
      <label
        htmlFor={id}
        className={!className ? "label" : `label ${className}--label`}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={!className ? "input" : `input ${className}--input`}
        value={value}
        type={type || "text"}
        disabled={!!disabled}
        required={!!required}
        placeholder={placeholder || ""}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
