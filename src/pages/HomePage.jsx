import { useDispatch, useSelector } from 'react-redux';
import { productStart, productSuccess } from '../redux/productSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { GrFavorite } from 'react-icons/gr';
import { addToFavour } from '../redux/favouriteSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  // const [loading, setLoading] = useState(false);

  const keys = ['title', 'brand', 'category'];

  const { productLists, loading } = useSelector((state) => state.product);
  const { favourLists } = useSelector((state) => state.favour);

  console.log(favourLists);

  const { products } = productLists;

  const handleProductApi = async () => {
    try {
      dispatch(productStart());
      // setLoading(true);
      const apiResponse = await fetch(
        'https://fullecommerce-backend.onrender.com/api/products'
      );
      const data = await apiResponse.json();
      dispatch(productSuccess(data));
    } catch (error) {
      dispatch(productSuccess(error));
      return;
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddToFavour = (item) => {
    dispatch(addToFavour(item));
  };

  useEffect(() => {
    handleProductApi();
  }, []);

  if (loading) {
    return (
      <p className="text-2xl flex justify-center my-[50px] uppercase active:animate-bounce">
        Loading...
      </p>
    );
  }
  return (
    <div className="">
      <p className="mt-10 mb-4 uppercase text-3xl italic underline">products</p>
      <div className="flex flex-col lg:my-[50px] items-center justify-center">
        <input
          type="text"
          className="border-2 w-[70vw] h-[40px] rounded-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        {products && products.length > 0 ? (
          <div className="flex flex-wrap gap-x-10 p-10 justify-center">
            {products
              .filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(query))
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="md:w-[40%] rounded-2xl lg:w-[30%] w-full border flex flex-col p-3 my-5 bg-gray-100"
                >
                  <Link to={`/product-details/${item._id}`}>
                    <img
                      src={item.images.url ? item.images.url : item.images}
                      alt={item.title}
                      className="h-[200px] rounded-lg w-[100%] my-[20px] object-cover"
                    />
                  </Link>
                  <div>
                    <div className="border rounded-xl border-red-900 p-4 details">
                      <div className="flex items-center gap-x-1 md:gap-x-3 flex-wrap">
                        <p className="font-bold uppercase">name</p>
                        <p>{item.title}</p>
                      </div>
                      <div className="flex items-center gap-x-1 md:gap-x-3 flex-wrap">
                        <p className="font-bold uppercase">price</p>
                        <p>${item.price}</p>
                      </div>
                      <div className="flex items-center gap-x-1 md:gap-x-3 flex-wrap">
                        <p className="font-bold uppercase">brand</p>
                        <p>{item.brand}</p>
                      </div>
                      <div className="flex items-center gap-x-1 md:gap-x-3 flex-wrap">
                        <p className="font-bold uppercase">Category</p>
                        <p>{item.category}</p>
                      </div>

                      <div className="">
                        <button
                          onClick={() => {
                            handleAddToFavour(item);
                          }}
                          className="bg-accent p-4 rounded-full"
                        >
                          <GrFavorite className="" />
                        </button>
                      </div>
                    </div>
                    {/* <div className="">
                      <div className="flex gap-10"></div>
                    </div> */}
                  </div>
                  <div className="bg-white px-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-button w-full text-white p-3 my-4 rounded font-bold italic active:bg-blue-400 active:inset-4"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
