import Image from 'next/image'
import React from 'react'

export const ImageLogo = () => {
  return (
    <div>
        <Image 
        src="/LogoHuellas.svg" 
        width={500} height={500} 
        alt="Logo"
        className="w-20 h-auto flex justify-center items-center"
         />
         <h2 className=" flex justify-center items-end text-xl font-semibold relative" >Huellas de Esperanzas</h2>
    </div>
  )
}

export default ImageLogo