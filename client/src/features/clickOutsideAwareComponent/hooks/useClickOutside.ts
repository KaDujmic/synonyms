import { useRef } from 'react';
import { useEventListener } from '../../../hooks/listeners/useEventListener';

export const useClickOutside = (onOutsideClick: () => void) => {
  const ref = useRef<any>(null);

  const handleClick = ({target}: {target: any}) => {
    if (!ref.current.contains(target)) {      
      onOutsideClick()
    }
  }

  useEventListener('mousedown', handleClick)

  return ref
}; 