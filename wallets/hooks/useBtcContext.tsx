import { useContext } from 'react';
import { BtcContext } from '../context';

const useBtcContext = () => {
  const ctx = useContext(BtcContext);
  if (ctx === undefined) {
    throw new Error('useBtc must be used within a BtcProvider');
  }

  return ctx;
};
export default useBtcContext;
