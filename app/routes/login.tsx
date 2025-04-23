import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

import Button from '~/components/Button';
import { useTheme } from '~/context/ThemeContext';

import { auth } from '~/lib/firebase';

export type SignupFormInputs = {
  email: string;
  password: string;
};

const commonInputStyles = (theme: 'dark' | 'light') => {
  const errorStyle = `${theme === 'dark' ? '#d12356' : '#ff6b8a'}`;
  const inputStyle = `${theme === 'dark' ? '#778bff' : '#4b5dff'}`;

  return {
    '& .MuiInputBase-input': {
      color: inputStyle
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: inputStyle,
      },
      '&:hover fieldset': {
        borderColor: inputStyle,
      },
      '&.Mui-focused fieldset': {
        borderColor: inputStyle,
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `2px solid ${errorStyle}`
        },
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
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { control } = useForm<SignupFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: `onTouched`,
    reValidateMode: `onSubmit`
  });

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-1/2 p-6 border border-(--border) rounded-lg bg-(--surface)">
        <header className="flex justify-center">
          <h2 className="text-4xl text-(--primary)">Login</h2>
        </header>
        <Container
          className="flex flex-col justify-center items-center mt-6"
          component="form"
          sx={{
            '& .MuiFormGroup-root': {
              width: '100%'
            }
          }}
        >
          <FormGroup className="w-1/3">
            <Controller
              control={control}
              name="email"
              render={({ field }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  sx={{
                    ...commonInputStyles(theme)
                  }}
                  type="text"
                  value={email}
                  onChange={event => {
                    field.onChange(event);
                    setEmail(event.target.value);
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }: any) => (
                <TextField
                  {...field}
                  id="password"
                  label="Password"
                  name="password"
                  sx={{
                    marginTop: 2,
                    ...commonInputStyles(theme)
                  }}
                  type="password"
                  value={password}
                  onChange={event => {
                    field.onChange(event);
                    setPassword(event.target.value);
                  }}
                />
              )}
            />
          </FormGroup>
          <footer>
            <Button title="Submit" />
          </footer>
        </Container>
      </div>
    </section>
  );
}
