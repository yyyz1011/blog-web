import React from "react";
import "./index.less";

interface AboutTravelProps {
  className?: string;
}
const AboutTravel: React.FC<AboutTravelProps> = (props: AboutTravelProps) => {
  const { className = "" } = props;

  return <div className={`travel ${className}`}>hello</div>;
};

export default AboutTravel;
