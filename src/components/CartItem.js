import React from 'react';
import { Delete } from '@mui/icons-material';
import { remove, additem, deleteitem } from '../redux/Slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const CartItem = ({ item }) => {
  // console.log(item)
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const addItem = () => {
    dispatch(additem(item));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: 'success',
      autoHideDuration: 3000,
    });
  };
  const deleteItem = () => {
    dispatch(deleteitem(item.id));
    enqueueSnackbar(`Item is deleted successfully`, {
      variant: 'warning',
      autoHideDuration: 3000,
    });
  };
 
  const removeItemFromCart = () => {
    dispatch(remove(item.id));
    console.log(item);
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: 'warning',
      autoHideDuration: 3000,
    });
  };

  return (
    <div className='flex items-center p-5 justify-between bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 mt-2 mb-2 rounded-xl shadow-lg transition-transform transform hover:scale-105'>
      <div className='flex p-3'>
        <img
          src={item.image}
          className='h-28 rounded-lg border-2 border-purple-300 shadow-md'
          alt=''
        />
        <div className='ml-6 self-start space-y-4'>
          <h1 className='text-xl text-gray-800 font-semibold hover:text-purple-700 transition-colors duration-300'>
            {item.title}
          </h1>
          <p className='text-gray-600'>${item.price}</p>

          <div className='flex items-center justify-center'>
            <button
              onClick={addItem}
              className='w-9 h-9 m-2  bg-purple-500 hover:bg-purple-600 transition-colors duration-300 cursor-pointer rounded-lg text-xl  shadow-md '
            >
              +
            </button>
            <span className='m-2 text-xl'>{item.quantity}</span>
            <button
              onClick={deleteItem}
              className='w-9 h-9 m-2 bg-purple-500 hover:bg-purple-600 transition-colors duration-300 cursor-pointer rounded-lg text-xl shadow-md items-center justify-center'
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={removeItemFromCart}
        className='bg-purple-500 hover:bg-purple-600 transition-colors duration-300 cursor-pointer rounded-full p-3 mr-3 shadow-md'
      >
        <Delete className='text-white' />
      </div>
    </div>
  );
};

export default CartItem;
