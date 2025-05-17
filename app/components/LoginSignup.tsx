import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router';

import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

import Button from '~/components/Button';
import { useTheme } from '~/context/ThemeContext';

import { formValidationRules } from '~/utils';

export type FormInputs = {
  email: string;
  password: string;
  username: string;
};

export type LoginSignupProps = {
  handleFormSubmit: (_data: FormInputs) => Promise<void>;
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

export default function LoginSignup({ handleFormSubmit }: LoginSignupProps) {
  const location = useLocation();
  const { theme } = useTheme();
  const isLogin = location.pathname === '/login';

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
      username: ''
    },
    mode: 'onTouched',
    reValidateMode: 'onSubmit'
  });

  return (
    <Container
      className="flex flex-col justify-center items-center mt-6"
      component="form"
      sx={{
        '& .MuiFormGroup-root': {
          width: '100%'
        }
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FormGroup>
        {!isLogin && (
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                id="username"
                label="User Name"
                sx={commonInputStyles(theme, !!errors.username)}
                onChange={event => {
                  field.onChange(event);
                  clearErrors('username');
                }}
              />
            )}
            rules={formValidationRules('username')}
          />
        )}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              id="email"
              label="Email"
              sx={{ marginTop: 2, ...commonInputStyles(theme, !!errors.email) }}
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
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              id="password"
              label="Password"
              sx={{ marginTop: 2, ...commonInputStyles(theme, !!errors.password) }}
              type="password"
              onChange={event => {
                field.onChange(event);
                clearErrors('password');
              }}
            />
          )}
          rules={formValidationRules('password')}
        />
      </FormGroup>
      <div className="mt-4 text-(--muted) text-sm">
        {isLogin ? `Don't have an account? ` : 'Already have an account? '}
        {isLogin ? 'Click here to ' : 'Go to '}
        <Link className="text-(--primary)" to={isLogin ? '/register' : '/login'}>
          {isLogin ? 'register.' : 'login.'}
        </Link>
      </div>
      <footer className="mt-4 w-full">
        <Button title={isLogin ? 'Login' : 'Register'} type="submit" />
      </footer>
    </Container>
  );
}
