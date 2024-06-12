import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import RefugioForm from './components/shelter_form';

export const metadata: Metadata = {
  title: 'Register Refugio | Auth',
  description: 'Register Refugio | Auth',
};

export const RegisterRefugio = () => {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <RefugioForm />
    </section>
  );
}

export default RegisterRefugio;
