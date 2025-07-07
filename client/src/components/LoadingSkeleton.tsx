interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  variant?: 'gray' | 'white';
  className?: string;
}

export const LoadingSkeleton = ({ 
  width = '100%', 
  height = '20px', 
  variant = 'gray',
  className = '' 
}: LoadingSkeletonProps) => {
  return (
    <div 
      className={`loading-skeleton loading-skeleton--${variant} ${className}`}
      style={{ width, height }}
    >
      <div className="loading-skeleton__shimmer"></div>
    </div>
  );
}; 