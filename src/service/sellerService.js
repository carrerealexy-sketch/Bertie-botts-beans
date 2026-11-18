const API_URL = 'http://localhost:3000/vendeurs'

export default async function getSellers() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des vendeurs')
  }

  return await response.json()
}
