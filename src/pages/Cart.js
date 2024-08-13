import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [cupon, setCupon] = useState('');
  const [discount, setDiscount] = useState(10);
// cupon apply
  const applyCupon = () => {
    const cupons = {
      code20: 20,
      code30: 30,
      code40: 40,
      code50: 50,
    };

    if (cupons[cupon.toLowerCase()]) {
      setDiscount(cupons[cupon.toLowerCase()]);
    } else {
      setDiscount(10); // Default discount if the coupon doesn't match
    }
  };

  const { cart } = useSelector((state) => state);
  let quantity = 0;
  for (let item in cart) {
    quantity += cart[item].quantity;
  }
  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cart]);

  const handleCheckout=()=>{
    Swal.fire({
      title: 'Order Successful!',
      text: 'Your Order is Successfully. Thank you for your purchase!',
      icon: 'success',
      confirmButtonText: 'Go to Homepage'
  }).then((result) => {
      if (result.isConfirmed) {
          // Navigate to the homepage
          window.location.href = '/';
      }
  });
  }
  // console.log(cart);
  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className='min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto'>
            <div className='flex flex-col justify-center items-between p-2'>
              {cart.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </div>
            <div>
              <div className='flex flex-col justify-center items-end p-5 space-y-5 mt-14'>
                <p className='text-sm'>use cupon code:(code20,code30,code40,code50) for discounts</p>
                <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
                  <h2 className='text-lg font-semibold mb-4'>
                    Apply Coupon Code
                  </h2>
                  <div className='flex'>
                    <input
                      type='text'
                      value={cupon}
                      onChange={(e) => setCupon(e.target.value)}
                      placeholder='Enter coupon code'
                      className='w-full p-2 border border-gray-300 rounded-l-md'
                    />
                    <button
                      onClick={applyCupon}
                      className='bg-purple-500 text-white py-2 px-4 rounded-r-md hover:bg-purple-600 transition-colors duration-300'
                    >
                      Apply
                    </button>
                  </div>
                  <div className='mt-4'>
                    <p>Discount Applied: {discount}%</p>
                  </div>
                </div>

                <h1 className='font-semibold text-lg text-purple-800'>
                  YOUR CART SUMMARY
                </h1>
                <p>
                  <span className='text-gray-700 font-semibold'>
                    Total Items
                  </span>
                  {'  '}: {quantity}
                </p>
                <p>
                  {'  '}
                  <span className='text-gray-700 font-semibold'>
                    Total Amount
                  </span>{' '}
                  : ${totalAmount.toFixed(2)}
                </p>
                <p>
                  {'  '}
                  <span className='text-gray-700 font-semibold'>
                    discount
                  </span>{' '}
                  : {discount}%
                </p>
                <div className='h-[2px] w-[255px] bg-gray-600'></div>
                <p>
                  {'  '}
                  <span className='text-gray-700 font-semibold'>
                    subtotal
                  </span>{' '}
                  : {(totalAmount - (discount/100) * totalAmount).toFixed(2)}
                </p>
                <button onClick={handleCheckout}className='bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3'>
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='min-h-[80vh] flex flex-col items-center justify-center'>
            <h1 className='text-gray-700 font-semibold text-xl mb-2'>
              Your cart is empty!
            </h1>
            <Link to={'/'}>
              <button className='bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3'>
                SHOP NOW
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
