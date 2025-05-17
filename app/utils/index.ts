export const formValidationRules = (field: string) => {
  switch (field) {
    case 'email':
      return {
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email address'
        }
      };
    case 'password':
      return {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters long'
        }
      };
    case 'username':
      return {
        required: 'User Name is required'
      };
    default:
      return undefined;
  }
};
