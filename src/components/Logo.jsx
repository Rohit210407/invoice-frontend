import { assets } from "../assets/assets.js";

const Logo = ({ height = 48, width = 48, className = "logo", style }) => {
  return (
    <img 
      className={className} 
      src={assets.logo} 
      alt="SmartInvoice logo" 
      height={height} 
      width={width} 
      style={style}
    />
  );
};

export default Logo;
