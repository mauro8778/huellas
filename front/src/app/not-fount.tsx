// src/app/404/page.tsx
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! La página que buscas no fue encontrada.</p>
      <Link href="/">
        <a className="text-blue-500 hover:underline text-lg">Volver al inicio</a>
      </Link>
    </div>
  );
};

export default Custom404;
