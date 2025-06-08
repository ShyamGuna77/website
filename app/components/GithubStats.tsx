import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";

const GithubGraph = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 hover:scrollbar-thumb-blue-600">
      <div className="min-w-[300px] max-w-4xl mx-auto pb-2">
        <GitHubCalendar
          username="ShyamGuna77"
          colorScheme="light"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          transformData={(data) => {
            const filtered = data.filter(
              (day) => new Date(day.date) >= new Date("2025-01-01")
            );
            return filtered;
          }}
          theme={{
            light: [
              "#ebedf0", 
              "#c6e4ff",
              "#7dc4ff",
              "#2196f3", 
              "#0d47a1", 
            ],
            dark: [
              "#161b22", 
              "#0d47a1",
              "#1565c0", 
              "#1976d2",
              "#2196f3", 
            ],
          }}
          style={{
            width: "70%",
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default GithubGraph;
