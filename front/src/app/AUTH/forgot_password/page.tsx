import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import Form from './Components/form_forgot';

export const metadata: Metadata = {
  title: 'Forgot Password | Auth',
  description: 'Forgot Password | Auth',
};

export default function ForgotPassword() {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <Form />
    </section>
  );
}
