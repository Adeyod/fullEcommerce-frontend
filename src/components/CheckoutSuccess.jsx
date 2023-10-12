import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  });
  return (
    <div className="flex flex-col my-[150px] text-2xl flex-wrap">
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business! If you have any questions, please email us
        on customersupport
      </p>
    </div>
  );
};

export default CheckoutSuccess;
