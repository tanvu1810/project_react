import { memo } from "react";

type HeaderProps = { title: string };

const Header = ({ title }: HeaderProps) => {
  console.log("Header render!");
  return (
    <h2 className="text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-md">
      {title}
    </h2>
  );
};

export default memo(Header);
