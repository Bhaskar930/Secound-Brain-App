import { useRef, useState } from "react";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";

interface ContentItem {
  type: "twitter" | "youtube";
  link: string;
  title: string;
}

interface BrainResponse {
  username: string;
  content: ContentItem[];
}

export function SeeOthersBrain() {
  const linkRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<BrainResponse | null>(null);

  async function Link() {
    const sharelink = linkRef.current?.value.trim();
    if (!sharelink) {
      alert("Please enter a link");
      return;
    }

    try {
      const response = await axios.post<BrainResponse>(
        `${BACKEND_URL}/api/v1/breain/share/${sharelink}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setResult(response.data);
      console.log("Full response data:", response.data);

    } catch (error) {
      alert("Link is Not Valid");
      setResult(null);
    }
  }
    const contentArray = Array.isArray(result?.content)
    ? result?.content
    : typeof result?.content === "object" && result.content !== null
      ? [result?.content]
      : [];

  return (
  <div>
    <Input ref={linkRef} placeholder="Copy Link" />
    <Button variant="primary" text="Submit" onClick={Link} />
    {result && (
      <div>
        <h2>Shared by: {result.username}</h2>
        <div className="flex gap-4 flex-wrap">
          {contentArray.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    )}
  </div>
)}
