import { useEffect } from 'react';
import ComingSoon from './ComingSoon';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Coming Soon | TravelWorld';
  }, []);

  return <ComingSoon />;
}
