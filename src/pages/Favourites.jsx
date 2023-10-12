import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favourLists } = useSelector((state) => state.favour);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate('/cart');
  };

  return (
    <div className="mx-10">
      <p>Favourites</p>
      {favourLists && favourLists.length > 0 ? (
        <div className="border-slate-600">
          {favourLists.map((item) => (
            <div
              className="border-slate-600 border-2 rounded-2xl p-4 flex flex-col md:flex-row gap-y-5 text-center items-center md:justify-between lg:justify-around my-[50px]"
              key={item._id}
            >
              <div className="">
                <img
                  src={item.images.url ? item.images.url : item.images}
                  alt={item.title}
                />
              </div>
              <div className="gap-y-3 flex flex-col ml-10 mt-5 items-start">
                <p>
                  <span className="font-bold uppercase mr-3">Name:</span>
                  <span className="">{item.title}</span>
                </p>

                <p>
                  <span className="font-bold uppercase mr-3">brand:</span>
                  <span className="">{item.brand}</span>
                </p>

                <p>
                  <span className="font-bold uppercase mr-3">price:</span>
                  <span className="">{item.price}</span>
                </p>

                <p>
                  <span className="font-bold uppercase mr-3">category:</span>
                  <span className="">{item.category}</span>
                </p>

                <p className="flex flex-wrap">
                  <span className="font-bold uppercase mr-3">description:</span>
                  <span className="">{item.description}</span>
                </p>
              </div>
              <button
                className="uppercase"
                onClick={() => handleAddToCart(item)}
              >
                add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center my-[180px] text-xl flex-wrap">
          Favourites is empty. {''}
          <Link to="/" className="mx-2 text-accent font-bold italic uppercase">
            Click Me
          </Link>
          to add products to Favourites
        </p>
      )}
    </div>
  );
};

export default Favourites;
