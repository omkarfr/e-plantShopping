import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  { category: 'Air Purifying Plants', plants: [
    { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
    { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3529186_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
    { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
    { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity and removes toxins.', cost: '$20' },
    { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy-care plant that absorbs toxins.', cost: '$17' },
    { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies air and soothes burns.', cost: '$14' },
  ]},
  { category: 'Aromatic Fragrant Plants', plants: [
    { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400', description: 'Calming scent, used in aromatherapy.', cost: '$20' },
    { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400', description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
    { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Invigorating scent, also a cooking herb.', cost: '$15' },
    { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma, repels pests.', cost: '$12' },
    { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent that reduces stress.', cost: '$14' },
    { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Beautiful, sweet-scented spring flower.', cost: '$22' },
  ]},
  { category: 'Insect Repellent Plants', plants: [
    { name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'Natural insect repellent, also a herb.', cost: '$10' },
    { name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'Repels mosquitoes and pests.', cost: '$8' },
    { name: 'Geraniums', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', description: 'Fragrant leaves keep insects away.', cost: '$20' },
    { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'Repels flies and mosquitoes.', cost: '$9' },
    { name: 'Citronella', image: 'https://cdn.pixabay.com/photo/2015/10/09/16/40/lemon-grass-979339_1280.jpg', description: 'Classic mosquito repellent scent.', cost: '$16' },
    { name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2016/09/16/16/23/catmint-1674821_1280.jpg', description: 'Repels mosquitoes and attracts cats.', cost: '$13' },
  ]},
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar">
        <div><strong>Paradise Nursery</strong></div>
        <div>
          <a onClick={() => setShowCart(false)}>Plants</a>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
          🛒<span className="cart-quantity">{totalQuantity}</span>
        </div>
      </div>

      {!showCart ? (
        <div>
          {plantsArray.map((cat) => (
            <div key={cat.category}>
              <h2 style={{ padding: '0 20px' }}>{cat.category}</h2>
              <div className="product-grid">
                {cat.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                      disabled={!!addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
