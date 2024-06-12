import Logo from '@/components/ui/Logo';
import FormularioAdoption from '@/components/FormularioAdoption/FormularioAdoption';


export const FormAdopt = () =>{
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Logo />
      <FormularioAdoption />
    </section>
  );
}
export default FormAdopt