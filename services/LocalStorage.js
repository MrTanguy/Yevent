import AsyncStorage from '@react-native-async-storage/async-storage';

/* Access Token */

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token
  } catch (err) {
    console.error('Erreur lors de la récupération du token', err);
  }
};

export const setAccessToken = async (token) => {
    if (token !== null) {
        AsyncStorage.setItem('accessToken', token)
    } else {
        AsyncStorage.removeItem('accessToken')
    }
}


/* Refresh Token */



