// Generates a random string of given length

export const generateRandomString = (length: number): string => {
  const allPossCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += allPossCharacters[Math.floor(Math.random() * allPossCharacters.length)];
  }
  return result;
};
