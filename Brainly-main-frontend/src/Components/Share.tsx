import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../Config";

export function Share() {
  const ShareLink = useRef("");
  const [linkGenerated, setLinkGenerated] = useState(false);

  useEffect(() => {
    async function sharelink() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/breain/share`,
          { share: true },
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        const { msg, hash } = response.data;
        if (msg?.startsWith("/share/")) {
          ShareLink.current = `${msg}`;
        } else if (hash) {
          ShareLink.current = `${hash}`;
        } else {
          ShareLink.current = "Something went wrong!";
        }
      } catch (error) {
        console.log("Failed to generate Link", error);
        ShareLink.current = "Failed to generate link.";
      } finally {
        setLinkGenerated(true);
      }
    }

    sharelink();
  }, []); // empty dependency array so it runs once on mount

  return (
    <div>
      {linkGenerated && <div>{ShareLink.current}</div>}
    </div>
  );
}
