// import auth from '@react-native-firebase/auth'
//
//
//
// export const useAuth = async (phoneNumber) => {
//   await auth().signInWithPhoneNumber(phoneNumber)
// }

export const useGetNewUser = () => {
  const email = `someone-${Math.random()}@email.com`;
  const password = '123456';

  return { email, password };
};
