import AsyncStorage from '@react-native-async-storage/async-storage';

export const getId = async () => {
  try {
    const token = await AsyncStorage.getItem('id');
    return token
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'id', err);
  }
};

export const setId = async (token) => {
    if (token !== null) {
        AsyncStorage.setItem('id', token)
    } else {
        AsyncStorage.removeItem('id')
    }
}
