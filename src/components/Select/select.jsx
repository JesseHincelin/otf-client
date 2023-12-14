import "./select.scss";

const Select = (props) => {
  const { className, options, id, label, value, required, disabled, handleSelectChange } = props;

  return (
    <div className={!className ? "field" : `field ${className}--field`}>
      <label
        htmlFor={id}
        className={!className ? "label" : `label ${className}--label`}
      >
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={value}
        className={!className ? "select" : `select ${className}--select`}
        required={!!required}
        disabled={!!disabled}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        {!!options
          ? options.map((e, i) => (
              <option
                key={`${id}_${i}`}
                value={e}
                // value={i === 0 ? "" : e}
                // disabled={i === 0 ? true : false}
                // selected={i === 0 ? true : false}
              >
                {e}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default Select;
