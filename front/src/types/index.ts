export interface IRegisterProp {
    name: string
    email: string
    password: string
    repeatPassword: string
}


export interface ILogingProps {
    
    email: string,
    password: string
}

export interface IErrorProps {
    email?: string,
    password?: string
}

export interface IMascotas {
    id?: number
    name?: string
    edad?: string
    sexo?: string
    description?: string
    image?: string
    category?: string
    refugio?: string
    breed?: string
    age:string
    pet_size?: string
}

export interface IRefugios {
    id?: number
    name: string
    provincia?: string
    zona?: string
    image: string
    description?: string
    shelter_name?: string
    email?: string
    phone?: string
    pets?: IMascotas[]
    isActive?: boolean
    location?: string
    imgUrl?: string
}

export interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    nickname: string;
    picture?: string;
    role?: string;
  }

  export interface IDonation {
    shelter: IShelter;
    amount: number;
  }

  export interface IShelter {
    id?: string;
    name: string;
  }
  