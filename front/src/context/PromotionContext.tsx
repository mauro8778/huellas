// 'use client';
// import React, { createContext, useState, useContext, ReactNode } from "react";

// interface PromotionProviderProps {
//   children: ReactNode;
// }

// interface Promotion {
//   imageSrc: string;
//   duration: number; // Duration in seconds
// }

// interface PromotionContextProps {
//   currentPromotion: Promotion;
//   setPromotion: (promotion: Promotion) => void;
//   stopPromotion: () => void;
//   isPromotionActive: boolean;
// }

// const defaultPromotion: Promotion = { imageSrc: "/promo1.webp", duration: 10 };

// const PromotionContext = createContext<PromotionContextProps>({
//   currentPromotion: defaultPromotion,
//   setPromotion: () => {},
//   stopPromotion: () => {},
//   isPromotionActive: true,
// });

// export const PromotionProvider: React.FC<PromotionProviderProps> = ({ children }) => {
//   const [currentPromotion, setCurrentPromotion] = useState<Promotion>(defaultPromotion);
//   const [isPromotionActive, setIsPromotionActive] = useState<boolean>(true);

//   const stopPromotion = () => {
//     setIsPromotionActive(false);
//     setCurrentPromotion(defaultPromotion);
//   };

//   return (
//     <PromotionContext.Provider value={{ currentPromotion, setPromotion: setCurrentPromotion, stopPromotion, isPromotionActive }}>
//       {children}
//     </PromotionContext.Provider>
//   );
// };

// export const usePromotion = () => useContext(PromotionContext);
