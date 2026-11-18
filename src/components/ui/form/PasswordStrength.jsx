const passwordCriteria = [
  {
    label: "8 caractères minimum",
    test: (value) => value.length >= 8,
  },
  {
    label: "Une lettre majuscule",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    label: "Une lettre minuscule",
    test: (value) => /[a-z]/.test(value),
  },
  {
    label: "Un chiffre",
    test: (value) => /[0-9]/.test(value),
  },
  {
    label: "Un caractère spécial",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export const PasswordStrength = ({ password = "" }) => {
  const score = passwordCriteria.filter((criterion) =>
    criterion.test(password),
  ).length;

  const strength = [
    { label: "Très faible", color: "bg-red-500" },
    { label: "Faible", color: "bg-red-500" },
    { label: "Moyen", color: "bg-orange-500" },
    { label: "Bon", color: "bg-yellow-500" },
    { label: "Fort", color: "bg-lime-500" },
    { label: "Robuste", color: "bg-green-500" },
  ];

  const currentStrength = strength[score];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary">
            Sécurité du mot de passe
          </span>

          <span className="text-sm font-semibold">
            {password.length > 0 ? currentStrength.label : "Non renseigné"}
          </span>
        </div>

        <div className="flex gap-1.5">
          {passwordCriteria.map((criterion, index) => (
            <div
              key={criterion.label}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index < score ? currentStrength.color : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-1.5">
        {passwordCriteria.map((criterion) => {
          const isValid = criterion.test(password);

          return (
            <li
              key={criterion.label}
              className={`flex items-center gap-2 text-xs ${
                isValid ? "text-green-600" : "text-secondary"
              }`}
            >
              <span>{isValid ? "✓" : "○"}</span>
              {criterion.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
