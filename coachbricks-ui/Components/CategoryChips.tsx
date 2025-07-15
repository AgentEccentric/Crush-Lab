// CoachBricks Category Buttons with Minimalist Icons, Stacked at Bottom

"use client";

import { useState } from "react";
import {
  Sparkles,
  BrainCog,
  Settings,
  Layers,
  BadgeCheck,
  MessageCircle,
  LineChart,
  Users,
  Compass,
  Rocket,
  TerminalSquare,
  BookOpen
} from "lucide-react";

const categories = [
  { label: "Onboarding", icon: Rocket },
  { label: "Field Enablement", icon: Compass },
  { label: "AI Integration", icon: BrainCog },
  { label: "GTM Strategy", icon: Users },
  { label: "Certification", icon: BadgeCheck },
  { label: "Content Architecture", icon: Layers },
  { label: "Tool Stack", icon: Settings },
  { label: "Databricks", icon: TerminalSquare },
  { label: "Community Enablement", icon: MessageCircle },
  { label: "Product Education", icon: BookOpen },
  { label: "Metrics & ROI", icon: LineChart },
  { label: "CoachBricks Tips", icon: Sparkles },
];

const CategoryChips = ({ onSelect }: { onSelect: (prompt: string) => void }) => {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setActive(label);
    onSelect(label);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 absolute bottom-10 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border text-xs transition
              ${active === label
                ? "bg-red-600 text-white border-red-600"
                : "border-[#FF3621] text-[#FF3621] hover:bg-red-600 hover:text-white hover:border-red-600"}`}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
