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
  confirmPassword: (getValues) => ({
    required: "Veuillez confirmer votre mot de passe",
    validate: (value) =>
      value === getValues("password") ||
      "Les mots de passe ne correspondent pas",
  }),
};
