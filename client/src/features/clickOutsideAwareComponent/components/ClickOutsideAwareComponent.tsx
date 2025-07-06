import type { ReactNode } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

interface ClickOutsideAwareComponentProps {
    className?: string,
    children: ReactNode,
    onOutsideClick: () => void,
}

function ClickOutsideAwareComponent({children, onOutsideClick, className}: ClickOutsideAwareComponentProps) {
    const ref = useClickOutside(onOutsideClick)

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export { ClickOutsideAwareComponent };