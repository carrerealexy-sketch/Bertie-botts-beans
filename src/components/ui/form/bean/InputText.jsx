export const InputText = ({
  label,
  htmlFor,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="add-bean-field">
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>

      <input
        className="form-control"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};