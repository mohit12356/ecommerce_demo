import { Link } from "react-router-dom";

const CartPage = ({ cartItems, onDeleteItem }) => {
  return (
    <div className="p-4">
      {cartItems.length === 0 ? (
        <div>
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <Link to="/shop" className="text-blue-500">
            Go back to Shop
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <div>
            {cartItems.map((item, index) => (
              <div key={item.id || index} className="flex justify-between py-2">
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.title}</p>
                  <p>Price: Rs {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: Rs {item.price * item.quantity}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => onDeleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <p className="font-bold">
              Total: Rs{" "}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
            <Link to="/checkout">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
