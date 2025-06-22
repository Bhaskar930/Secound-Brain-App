import { useState } from "react";
import { AddContentModel } from "../Components/AddContentModel";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { Sidebar } from "../Components/Sidebar";
import { useContent } from "../hooks/useContent";
import { useNavigate, useLocation } from "react-router-dom";
import { Share } from "../Components/Share";
import { CopyIcon } from "../Icons/CopyIcon";

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modelopen, setModelOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const contents = useContent();

  function LogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  function seeBrain() {
    navigate("/seebrain");
  }

  // Read filter from URL
  const query = new URLSearchParams(location.search);
  const filter = query.get("filter");

  // Filter content based on filter query param
  const filteredContent = filter
    ? contents.filter((item: any) =>
        filter === "twitter"
          ? item.link.includes("x.com") || item.link.includes("twitter.com")
          : item.link.includes("youtube.com")
      )
    : contents;

  return (
    <div>
      {/* Sidebar stays fixed */}
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <AddContentModel open={modelopen} onClose={() => setModelOpen(false)} />

        {/* Dashboard Buttons - remain unaffected */}
        <div className="flex justify-end gap-4">
          <Button
            variant="secoundary"
            text="See Brain"
            startIcon={<CopyIcon />}
            onClick={seeBrain}
          />
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secoundary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            onClick={() => setShowShare((prev) => !prev)}
          />
          <Button
            variant="secoundary"
            text="LogOut"
            startIcon={<ShareIcon />}
            onClick={LogOut}
          />
        </div>

        {showShare && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <Share />
          </div>
        )}

        {/* Render filtered content cards */}
        <div className="flex gap-4 flex-wrap mt-4">
          {filteredContent.length > 0 ? (
            filteredContent.map(({ type, link, title }) => (
              <Card key={link} type={type} link={link} title={title} />
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </div>
  );
}
