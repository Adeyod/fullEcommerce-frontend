/* eslint-disable react/prop-types */
import { GrAdd } from 'react-icons/gr';
import { AiOutlineMinus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { addToCart, deleteFromCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  console.log(item.images.url);
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div>
      <div className="border-2 p-3 my-16 rounded-lg border-slate-600 md:flex mx-4 md:mx-32 lg:mx-52 mb-4 md:justify-around items-center">
        <div className="md:w-1/3">
          <div className="flex justify-center">
            <Link to={`/product-details/${item._id}`}>
              <img
                src={item.images.url ? item.images.url : item.images}
                alt={item.title}
                loading="lazy"
                className="items-center text-center"
              />
            </Link>
          </div>
          <p>
            <span className="uppercase font-bold">Name: </span>
            {item.title}
          </p>
        </div>
        <div className="flex flex-col gap-y-6 mt-5 md:w-1/3">
          <p>
            <span className="uppercase font-bold">category:</span>{' '}
            {item.category}
          </p>
          <p>
            <span className="uppercase font-bold">Price:</span> ${item.price}
          </p>
          <div>
            <p className="uppercase font-bold">Quantity:</p>
            <div className="flex justify-center gap-x-3 text-2xl">
              <button onClick={() => handleAddToCart(item)}>
                <GrAdd />
              </button>

              <p>{item.quantity}</p>
              <button onClick={() => handleDeleteFromCart(item)}>
                <AiOutlineMinus />
              </button>
            </div>
          </div>

          <p>
            <span className="uppercase font-bold">
              Total: ${(item.quantity * item.price).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
