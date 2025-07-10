import type { ReactNode } from "react";
import '../styles/homepage.less';

interface HomePageSectionProps {
  title: string;
  description: string;
  Icon: ReactNode;
}


export const HomePageSection = ({ title, description, Icon }: HomePageSectionProps) => {
  return (
    <div className="feature">
      <h3>
        {title}
        {Icon && Icon}
      </h3>
      <p>{description}</p>
    </div>
  )
}