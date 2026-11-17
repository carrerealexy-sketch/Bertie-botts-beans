const API_URL = "http://localhost:3000";

export const login = async (credentials) => {
  try {
    const params = new URLSearchParams({
      username: credentials.username,
      password: credentials.password,
    });

    const response = await fetch(`${API_URL}/users?${params}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }

    const users = await response.json();

    if (users.length === 0) {
      return null;
    }

    const { password, ...user } = users[0];

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
