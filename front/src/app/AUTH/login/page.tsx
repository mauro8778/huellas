import type { Metadata } from 'next';
import Logo from '@/components/ui/Logo';
import Form from './Components/form_login';

const Login = () =>{
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <Form />
    </section>
  );
}
export default Login