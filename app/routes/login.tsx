import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

import Button from '~/components/Button';
import { useTheme } from '~/context/ThemeContext';

import { auth } from '~/lib/firebase';
import { formValidationRules } from '~/utils';

export type FormInputs = {
  email: string;
  password: string;
};

const commonInputStyles = (theme: 'dark' | 'light', error: boolean) => {
  const errorStyle = `${theme === 'dark' ? '#ff6b8a' : '#d12356'}`;
  const inputStyle = `${theme === 'dark' ? '#778bff' : '#4b5dff'}`;

  return {
    '& .MuiFormHelperText-root': {
      color: errorStyle,
      '&.Mui-error': {
        color: errorStyle
      }
    },
    '& .MuiInputBase-input': {
      color: error ? errorStyle : inputStyle
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: inputStyle
      },
      '&:hover fieldset': {
        borderColor: inputStyle
      },
      '&.Mui-focused fieldset': {
        borderColor: inputStyle
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `2px solid ${errorStyle}`
        }
      }
    },
    '& label': {
      color: inputStyle,
      '&.Mui-focused': {
        color: inputStyle,
        fontWeight: 600
      },
      '&.Mui-error': {
        color: errorStyle
      }
    }
  };
};

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    clearErrors,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onTouched',
    reValidateMode: 'onSubmit'
  });

  const firebaseError = (code: string): string => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid username and/or password';
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Something went wrong. Please try again';
    }
  };

  const handleLogin = async (data: FormInputs) => {
    try {
      setError(null);

      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate('/');
    } catch (err: any) {
      console.error(err.message);

      setError(firebaseError(err.code));
    }
  };

  return (
    <section className='flex flex-col justify-center items-center'>
      <div className='w-1/2 p-6 border border-(--border) rounded-lg bg-(--surface)'>
        <header className='flex justify-center'>
          <h2 className='text-4xl text-(--primary)'>Login</h2>
        </header>
        <Container
          className='flex flex-col justify-center items-center mt-6'
          component='form'
          sx={{
            '& .MuiFormGroup-root': {
              width: '100%'
            }
          }}
          onSubmit={handleSubmit(handleLogin)}
        >
          <FormGroup>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id='email'
                  label='Email'
                  sx={commonInputStyles(theme, !!errors.email)}
                  onChange={event => {
                    field.onChange(event);
                    clearErrors('email');
                  }}
                />
              )}
              rules={formValidationRules('email')}
            />
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  id='password'
                  label='Password'
                  sx={{ marginTop: 2, ...commonInputStyles(theme, !!errors.password) }}
                  type='password'
                  onChange={event => {
                    field.onChange(event);
                    clearErrors('password');
                  }}
                />
              )}
              rules={formValidationRules('password')}
            />
          </FormGroup>
          <div className='mt-4 text-(--muted) text-sm'>
            {`Don't have an account? Click `}
            <Link className='text-(--primary)' to='/signup'>
              here
            </Link>
            {` to register.`}
          </div>
          <footer className='mt-4 w-full'>
            <Button title='Login' type='submit' />
            {error && <p className='text-sm mt-4 text-(--error)'>{error}</p>}
          </footer>
        </Container>
      </div>
    </section>
  );
}
