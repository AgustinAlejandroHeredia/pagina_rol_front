import dice_image_web_icon from "../assets/dice_image_web_icon_empty.svg"

export default function Loading() {
  return (
    <div className="loader-overlay">
      <img
        src={dice_image_web_icon}
        alt="Loading"
        className="loading-dice"
      />
      <span className="loading-text">Rolling the dice...</span>
    </div>
  );
}