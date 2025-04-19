import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faLightbulb,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface CalloutProps {
  type: "danger" | "tip" | "warning";
  title: string;
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const getStyles = () => {
    switch (type) {
      case "danger":
        return "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 border-l-4 border-red-500 dark:border-red-400";
      case "tip":
        return "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-l-4 border-green-500 dark:border-green-400";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 border-l-4 border-yellow-500 dark:border-yellow-400";
      default:
        return "";
    }
  };

  const renderIcon = () => {
    if (type === "danger") {
      return (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="h-5 w-5 text-red-600 dark:text-red-300"
        />
      );
    }
    if (type === "tip") {
      return (
        <FontAwesomeIcon
          icon={faLightbulb}
          className="h-5 w-5 text-green-600 dark:text-green-300"
        />
      );
    }
    if (type === "warning") {
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="h-5 w-5 text-yellow-600 dark:text-yellow-300"
        />
      );
    }
  };

  return (
    <div className={`flex p-4 my-6 rounded-lg ${getStyles()} border-l-4`}>
      <div className="mr-3">{renderIcon()}</div>
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Callout;
