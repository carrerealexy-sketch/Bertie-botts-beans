export const FilterItem = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="filter-bar-option">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};
