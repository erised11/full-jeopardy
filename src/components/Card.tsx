import { PropsWithChildren } from "react";

type CardProps = {};

const Card = ({ children }: PropsWithChildren<CardProps>) => {
  return (
    <div className="relative flex justify-center rounded-xl bg-amber-100 w-72 h-48 hover:cursor-pointer">
      {children}
    </div>
  );
};

export default Card;
