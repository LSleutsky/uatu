import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

import { auth } from '~/lib/firebase';

export type SignupFormInputs = {
  email: string;
  password: string;
};

const commonInputStyles = (theme: string | undefined) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${theme === 'dark' ? '#a0a0c0' : '#4f4f80'}`,
    },
    '&:hover fieldset': {
      borderColor: `${theme === 'dark' ? '#a0a0c0' : '#4f4f80'}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme === 'dark' ? '#a0a0c0' : '#4f4f80'}`,
    },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${theme === 'dark' ? '#ff4c4c' : '#d32f2f'}`
      },
    }
  },
  '& label': {
    color: `${theme === 'dark' ? '#a0a0c0' : '#4f4f80'}`,
    '&.Mui-focused': {
      color: `${theme === 'dark' ? '#a0a0c0' : '#4f4f80'}`,
      fontWeight: 600
    },
    '&.Mui-error': {
      color: `${theme === 'dark' ? '#ff4c4c' : '#d32f2f'}`
    }
  }
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | undefined;

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
    <Container className="flex flex-col justify-center items-center" component="form">
      <FormGroup className="w-full">
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
                ...commonInputStyles(storedTheme)
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
                ...commonInputStyles(storedTheme)
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
    </Container>
  );
}
