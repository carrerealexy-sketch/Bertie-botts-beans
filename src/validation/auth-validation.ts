export const signinValidation = {
  name: {
    required: "Le nom d'utilisateur est obligatoire",
    minLength: {
      value: 3,
      message: "3 caractères minimum",
    },
  },
  password: {
    required: "Le mot de passe est obligatoire",
  },
};

export const signupValidation = {
  ...signinValidation,
  password: {
    required: "Le mot de passe est obligatoire",
    minLength: {
      value: 8,
      message: "8 caractères minimum",
    },
    validate: {
      hasUppercase: (value) =>
        /[A-Z]/.test(value) || "Au moins une majuscule requise",
      hasLowercase: (value) =>
        /[a-z]/.test(value) || "Au moins une minuscule requise",
      hasNumber: (value) => /[0-9]/.test(value) || "Au moins un chiffre requis",
      hasSpecialCharacter: (value) =>
        /[^A-Za-z0-9]/.test(value) || "Au moins un caractère spécial requis",
    },
  },
  confirmPassword: (getValues) => ({
    required: "Veuillez confirmer votre mot de passe",
    validate: (value) =>
      value === getValues("password") ||
      "Les mots de passe ne correspondent pas",
  }),
};
