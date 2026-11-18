export const InputNumber = ({
  label = "Stock",
  htmlFor = "product-stock",
  id = "product-stock",
  name = "stock",
  type = "number",
  min = "0",
  step = "1",
  value,
  onChange,
  required = true,
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
        min={min}
        step={step}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
