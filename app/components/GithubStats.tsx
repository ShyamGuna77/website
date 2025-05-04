


import GitHubCalendar from "react-github-calendar";

const GithubGraph = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      
      <GitHubCalendar
        username="ShyamGuna77"
        colorScheme="light"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
        transformData={(data) =>
          data.filter((day) => new Date(day.date) >= new Date("2025-01-01"))
        }
        theme={{
          light: ["#ebedf0", "#c6e4ff", "#7dc4ff", "#2196f3", "#0d47a1"],
        }}
      />
    </div>
  );
};

export default GithubGraph;
