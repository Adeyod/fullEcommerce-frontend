import axios from 'axios';
import { UseSelector } from 'react-redux/es/hooks/useSelector';

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    console.log(cartItems);
  };
  return (
    <div>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </div>
  );
};

export default PayButton;
