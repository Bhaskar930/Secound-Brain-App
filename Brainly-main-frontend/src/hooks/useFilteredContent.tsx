import { useState } from "react";
import { useContent } from "./useContent";

export function Filtered(){
     const contents = useContent();
    
      const [filteredContent, setFilteredContent] = useState<any[]>([]);
    
      // ✅ Filter Twitter or X.com
      function filterTweet() {
        const filtered = contents.filter((item: any) =>
          item.link.includes("x.com") || item.link.includes("twitter.com")
        );
        setFilteredContent(filtered);
        console.log("Twitter content:", filtered);
      }
    
      // ✅ Filter YouTube
      function filterYoutube() {
        const filtered = contents.filter((item: any) =>
          item.link.includes("youtube.com")
        );
        setFilteredContent(filtered);
        console.log("YouTube content:", filtered);
      }
      return <div>
        
      </div>

}