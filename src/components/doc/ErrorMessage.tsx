import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center max-w-md mx-auto mt-6 p-4 bg-red-50 border border-red-300 rounded-lg shadow-sm animate-fadeIn">
      <div className="shrink-0">
        <FaExclamationTriangle className="text-red-600 w-6 h-6" />
      </div>
      <p className="ml-3 text-red-700 font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;
