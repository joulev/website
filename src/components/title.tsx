export function Title({
  title,
  titleLabel,
  subtitle,
}: {
  title: React.ReactNode;
  titleLabel?: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex flex-row items-baseline gap-3">
        <span className="text-3xl font-medium">{title}</span>
        {titleLabel}
      </h1>
      <div className="text-lg text-text-secondary">{subtitle}</div>
    </div>
  );
}
