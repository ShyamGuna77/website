import GitHubCalendar from "react-github-calendar";

const GithubGraph = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[300px] max-w-4xl mx-auto">
        <GitHubCalendar
          username="ShyamGuna77"
          colorScheme="light"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          transformData={(data) =>
            data.filter((day) => new Date(day.date) >= new Date("2025-01-01"))
          }
          theme={{
            light: ["#ebedf0", "#c6e4ff", "#7dc4ff", "#2196f3", "#0d47a1"],
          }}
        />
      </div>
    </div>
  );
};

export default GithubGraph;
