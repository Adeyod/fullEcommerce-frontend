import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { clearCart } from '../redux/cartSlice';
import CardButton from '../components/CardButton';
// import PayButton from '../components/PayButton';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div>
      <p className="text-3xl mb-4 underline italic text-button mt-[30px]">
        Cart
      </p>
      {cartItems && cartItems.length > 0 ? (
        <div className="">
          <div>
            {cartItems.map((item) => (
              <CartCard item={item} key={item._id} />
            ))}
          </div>
          <CardButton />
          {/* <PayButton cartItems={cart.cartItems} /> */}
        </div>
      ) : (
        <p>
          Cart is empty <Link to="/">Click Me</Link> to add products to cart
        </p>
      )}
    </div>
  );
};

export default Cart;
