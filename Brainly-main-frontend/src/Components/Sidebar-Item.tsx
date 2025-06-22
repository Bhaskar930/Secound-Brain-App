import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer text-gray-600 hover:bg-red-200 rounded max-w-48 pl-4 transition-all duration-150"
    >
      <div className="p-2">{icon}</div>
      <div className="p-2">{text}</div>
    </div>
  );
}
