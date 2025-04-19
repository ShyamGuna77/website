type CalloutProps = {
  type?: "info" | "danger" | "warning" | "tip";
  title: string;
  children: React.ReactNode;
};

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-title">
        {type === "danger" && "❗"}
        {type === "warning" && "⚠️"}
        {type === "tip" && "💡"}
        {type === "info" && "ℹ️"}
        <span>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
