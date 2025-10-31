import { memo } from "react";

type TitleProps = {
  paragraph: string;
};

const title = ({ paragraph }: TitleProps) => {
  console.log("Paragraph render!");
  return (
    <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
      {paragraph}
    </h3>
  );
};

export default memo(title);
