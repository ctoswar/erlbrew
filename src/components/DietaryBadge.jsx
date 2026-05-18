import { BADGE_LABELS } from "../data/index.js";

export default function DietaryBadge({ code }) {
  const label = BADGE_LABELS[code] || code;
  const colorMap = {
    V: "bg-green/12 text-green border-green/20 dark:bg-green/20 dark:text-green dark:border-green/30",
    GF: "bg-caramel/10 text-roast border-caramel/20 dark:bg-caramel/15 dark:text-caramel dark:border-caramel/30",
    Vg: "bg-green/8 text-green border-green/15 dark:bg-green/15 dark:text-green dark:border-green/25",
    SP: "bg-[#b42814]/10 text-[#b42814] border-[#b42814]/20 dark:bg-[#b42814]/15 dark:text-[#e85d3a] dark:border-[#b42814]/30",
  };

  return (
    <span
      className={`font-body text-[9px] font-medium tracking-[0.06em] px-2 py-0.5 rounded-sm uppercase leading-none border ${colorMap[code] || "bg-steam/10 text-steam border-steam/20 dark:bg-steam/15 dark:text-dark-muted dark:border-steam/25"}`}
      title={label}
    >
      {code}
    </span>
  );
}