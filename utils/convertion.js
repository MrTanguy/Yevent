import * as Location from 'expo-location';

export const convertISOToReadableDate = (isoTimestamp) => {
  if (!isoTimestamp) return 'Date non disponible';
  const date = new Date(isoTimestamp);
  return date.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const geocodedAddress = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (geocodedAddress.length === 0) {
      throw new Error("Aucune adresse trouvée pour ces coordonnées.");
    }

    const address = geocodedAddress[0];

    // Concaténation des éléments de l'adresse
    return `${address.street || ''} ${address.streetNumber || ''}, ${address.city || ''}`;
  } catch (error) {
    console.error("Erreur lors du géocodage inversé :", error);
    throw new Error("Impossible de convertir les coordonnées en adresse.");
  }
};
