type RatingStarsProps = {
  value?: number;
  tone?: "gold" | "red";
};

export function RatingStars({ value = 0, tone = "gold" }: RatingStarsProps) {
  return (
    <span
      aria-label={`${value} / 5`}
      className={tone === "red" ? "text-red-600" : "text-amber-500"}
    >
      {"★".repeat(value)}
      <span className="text-slate-300">{"★".repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}
