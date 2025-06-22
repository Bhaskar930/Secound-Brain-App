import { useNavigate, useLocation } from "react-router-dom";
import { SidebarItem } from "./Sidebar-Item";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { Logo } from "../Icons/Logo";
import { AllIcon } from "../Icons/AllIcons";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function setFilter(filter: string | null) {
    const url = new URL(window.location.href);
    if (filter) {
      url.searchParams.set("filter", filter);
    } else {
      url.searchParams.delete("filter");
    }
    navigate(`${location.pathname}?${url.searchParams.toString()}`);
  }

  return (
    <div className="h-screen bg-white pl-4 border-r w-72 fixed left-0 top-0 overflow-y-auto">
      <div className="text-2xl pt-8 text-purple-600 flex items-center">
        <div className="pr-2">
          <Logo />
        </div>
        Second Brain
      </div>

      <div className="pt-6">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
        <SidebarItem text="All" icon={<AllIcon/>} onClick={() => setFilter(null)} />
      </div>
    </div>
  );
}
