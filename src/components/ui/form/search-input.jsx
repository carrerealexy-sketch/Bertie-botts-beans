export const SearchInput = ({
  htmlFor,
  label,
  id,
  placeholder = "Rechercher...",
  value,
  onChange,
}) => {
  return (
    <div className="bean-search">
      <label className="visually-hidden" htmlFor={htmlFor}>
        {label}
      </label>

      <input
        id={id}
        className="form-control bean-search-input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
