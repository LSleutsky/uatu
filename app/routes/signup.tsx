import { Link, useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

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

export default function Signup() {
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

  const handleSignup = async (data: FormInputs) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      navigate('/');
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <section className='flex flex-col justify-center items-center'>
      <div className='w-1/2 p-6 border border-(--border) rounded-lg bg-(--surface)'>
        <header className='flex justify-center'>
          <h2 className='text-4xl text-(--primary)'>Register</h2>
        </header>
        <Container
          className='flex flex-col justify-center items-center mt-6'
          component='form'
          sx={{
            '& .MuiFormGroup-root': {
              width: '100%'
            }
          }}
          onSubmit={handleSubmit(handleSignup)}
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
            {`Already have an account? Go to `}
            <Link className='text-(--primary)' to='/login'>
              login.
            </Link>
          </div>
          <footer className='mt-4 w-full'>
            <Button title='Register' type='submit' />
          </footer>
        </Container>
      </div>
    </section>
  );
}
