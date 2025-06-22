import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";

export function useContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setContents(response.data.content);
      } catch (error) {
        console.error("Failed to fetch content", error);
      }
    };

    fetchData();
  }, []);

  // ✅ You must return the state
  return contents;
}
