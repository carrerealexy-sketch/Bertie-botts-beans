export const Textarea = ({
  label,
  htmlFor,
  id,
  name,
  value,
  onChange,
  required = false,
  rows,
  placeholder,
}) => {
  return (
    <div className="add-bean-field add-bean-field-description">
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>

      <textarea
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};
