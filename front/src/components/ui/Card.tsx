

export interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ title, children, icon }) => {
    return (
      <div className="bg-white shadow-2xl rounded-lg p-6 flex items-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  

export default Card;
