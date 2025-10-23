type HeaderProps = { title: string };

{
  /* Tiêu đề chính */
}

export default function Header({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-md">
      {title}
    </h2>
  );
}
