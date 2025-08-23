interface LoadingComponentProps {
  className?: string;
}


/**
 * LoadingComponent is a component that displays a loading animation.
 * @param classNames - The class names for the LoadingComponent, w-X h-Y rounded etx.
 * @returns The Gradient Loading Component.
 */
export default function LoadingComponent(props: LoadingComponentProps) {
  const {
    className: classNames,
  } = props;

  return (
    <div 
      className={`${classNames || ''}`}
      style={{
        animation: 'animate-gradient 2.2s ease infinite',
        backgroundImage: 'linear-gradient(-61deg, rgb(238, 238, 238) 40%, rgb(245, 245, 245) 50%, rgb(238, 238, 238) 60%)',
        backgroundSize: '300% 300%',
      }}
    />
  );
}