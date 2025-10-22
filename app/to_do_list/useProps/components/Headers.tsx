type HeaderProps = { title: string };
export default function Header({ title }: HeaderProps) {
  return (
    <h2 className="text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-md">
      {title}
    </h2>
  );
}
