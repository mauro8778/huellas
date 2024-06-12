import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import Form from './components/form_register';

export const metadata: Metadata = {
  title: 'Register | Auth',
  description: 'Register | Auth',
};

export const Register =() => {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <Form />
    </section>
  );
}

export default Register