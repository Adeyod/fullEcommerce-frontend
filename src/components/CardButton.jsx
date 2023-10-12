import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getTotal } from '../redux/cartSlice';
import { useEffect } from 'react';
import axios from 'axios';
// import PayButton from './PayButton';

const CardButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartTotalAmount, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state?.user);

  const handleCheckout = () => {
    axios
      .post(
        'https://fullecommerce-backend.onrender.com/api/stripe/create-checkout-session',
        {
          cartItems,
          userId: currentUser?.user?._id,
        }
      )
      .then((res) => {
        if (res.data.url) {
          console.log(res.data.url);
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
    // console.log(userId);
    // console.log(cartItems);
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, cartItems]);

  return (
    <div>
      <div className="">
        <div className="mb-10">
          <p className="text-2xl">
            <span className="uppercase font-bold">Sum Total:</span> $
            <span className="uppercase font-bold">{cartTotalAmount}</span>
          </p>

          <button
            onClick={() => dispatch(clearCart())}
            className="uppercase font-bold border-2 bg-red-500 p-2 rounded text-white"
          >
            empty cart
          </button>
          <button
            onClick={() => handleCheckout()}
            className="uppercase font-bold border-2 bg-green-500 p-2 rounded text-white"
          >
            checkout
          </button>
          {/* <PayButton /> */}
        </div>
      </div>
    </div>
  );
};

export default CardButton;
