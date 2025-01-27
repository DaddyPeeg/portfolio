import { BiLoader } from "react-icons/bi";
import "./animated_btn.css";

type Props = {
  isLoading?: boolean;
};

const AnimatedButton = ({ isLoading }: Props) => {
  return (
    <button
      type="submit"
      className="animated-btn disabled:pointer-events-none pointer-events-auto disabled:cursor-default"
      disabled={isLoading}
    >
      <strong className="animated-btn-strong">
        {!isLoading ? (
          "SEND"
        ) : (
          <BiLoader className="shrink-0 size-6 animate-spin" />
        )}
      </strong>
      <div id="animated-btn-container-stars">
        <div id="animated-btn-stars" />
      </div>

      <div id="animated-btn-glow">
        <div className="animated-btn-circle" />
        <div className="animated-btn-circle" />
      </div>
    </button>
  );
};

export default AnimatedButton;
