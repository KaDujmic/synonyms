import { useRef } from 'react';
import { useEventListener } from '../../../hooks/listeners/useEventListener';

export const useClickOutside = (onOutsideClick: () => void) => {
  const ref = useRef<any>(null);

  const handleClick = ({target}: {target: any}) => {
    console.log('target', target);
    console.log('ref.current', ref.current);
    console.log('ref.current.contains(target)', ref.current.contains(target));
    if (!ref.current.contains(target)) {      
      onOutsideClick()
    }
  }

  useEventListener('mousedown', handleClick)

  return ref
}; 