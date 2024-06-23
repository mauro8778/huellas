import Image from "next/image"
import Link from "next/link"


interface FooterProps {
  username: string | null;
  className?: string; // Añade esta línea
}

const Footer: React.FC<FooterProps> = ({ username, className }) => {
    return (
        <footer className="bg-gray-50 font-sans dark:bg-gray-900 mt-10 border-t-2 border-gray-200 shadow-2xl ">
    <div className="container px-6 py-12 mx-auto ">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 ">
            
            <div>
                {/* <p className="font-semibold text-gray-800 dark:text-white">Link</p> */}

                <div className="flex flex-col items-start mt-5 space-y-2 ">
                    <Link href= "/nosotros" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Quienes Somos
                    </Link>
                    <Link href= "/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Refugios
                    </Link>
                    <Link href= "/adopta" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Quiero Adoptar
                    </Link>
                </div>
            </div>

            <div>
                {/* <p className="font-semibold text-gray-800 dark:text-white">Link</p> */}

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href= "/Home" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Home
                    </Link>

                    <Link href= "/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Home
                    </Link>

                    <Link href= "/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-tertiary" >
                        Home
                    </Link>
                </div>
            </div>
        </div>
        
        <hr className="my-6 border-gray-400 md:my-8 dark:border-gray-700 h-2" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
            
            
        <div className="flex justify-center items-center gap-4 hover:cursor-pointer mx-auto max-w-xs">

                    <Link href="https://www.facebook.com/" target="_blank">
                        <Image
                            src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                            width="30"
                            height="30"
                            alt="fb"
                        />
                    </Link> 

                    <Link href="https://www.instagram.com/" target="_blank">
                        <Image
                            src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
                            width="30"
                            height="30"
                            alt="inst"
                        />
                    </Link>

                    <Link href="https://github.com/" target="_blank">
                        <Image
                            src="https://www.svgrepo.com/show/94698/github.svg"
                            className=""
                            width="30"
                            height="30"
                            alt="gt"
                        />
                    </Link>

                    <Link href="https://www.linkedin.com/" target="_blank">                    
                        <Image
                            src="https://www.svgrepo.com/show/28145/linkedin.svg"
                            width="30"
                            height="30"
                            alt="in"
                        />
                    </Link>

                </div>
        </div>
    </div>
</footer>
    )
}

export default Footer