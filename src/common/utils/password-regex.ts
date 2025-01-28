/**
 * **Password regex validation**
 * - At least one uppercase letter.
 * - At least one lowercase letter.
 * - At least one number.
 * - At least one special character.
 * 
 * @param password 
 * @returns true if is valid
 */
export const validatePasswordRegex = (password : string) : boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}