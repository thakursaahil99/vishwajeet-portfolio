export default function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`px-6 md:px-10 ${i % 2 ? "italic" : ""}`}>{item}</span>
          <span className="text-[0.45em] text-accent">✺</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
