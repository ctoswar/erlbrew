import { BADGE_LABELS } from "../data/index.js";

export default function DietaryBadge({ code }) {
  const label = BADGE_LABELS[code] || code;
  const colorMap = {
    V: "bg-green/12 text-green border-green/20",
    GF: "bg-caramel/10 text-roast border-caramel/20",
    Vg: "bg-green/8 text-green border-green/15",
    SP: "bg-[#b42814]/10 text-[#b42814] border-[#b42814]/20",
  };

  return (
    <span
      className={`font-body text-[9px] font-medium tracking-[0.06em] px-2 py-0.5 rounded-sm uppercase leading-none border ${colorMap[code] || "bg-steam/10 text-steam border-steam/20"}`}
      title={label}
    >
      {code}
    </span>
  );
}