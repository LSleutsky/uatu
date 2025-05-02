import { useNavigate } from 'react-router';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

import LoginSignup from '~/components/LoginSignup';

import { auth } from '~/lib/firebase';

export type FormInputs = {
  email: string;
  password: string;
};

export default function Signup() {
  const navigate = useNavigate();

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
        <LoginSignup handleFormSubmit={handleSignup} />
      </div>
    </section>
  );
}
