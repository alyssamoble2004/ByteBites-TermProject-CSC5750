import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

import OrderSummary from "../../components/OrderSummary/OrderSummary";

import burger from "../../assets/images/burger.jpg";
import chicken from "../../assets/images/chicken.jpg";
import bbqBurger from "../../assets/images/bbq-burger.jpg";
import pepperoniPizza from "../../assets/images/pepperoni-pizza.jpg";
import margheritaPizza from "../../assets/images/margherita-pizza.jpg";
import veggiePizza from "../../assets/images/veggie-pizza.jpg";
import meatLovers from "../../assets/images/meat-lovers.jpg";
import caesarSalad from "../../assets/images/ceasar-salad.jpg";
import greekSalad from "../../assets/images/greek-salad.jpg";
import gardenSalad from "../../assets/images/garden-salad.jpg";
import fries from "../../assets/images/fries.jpg";
import mozzarellaSticks from "../../assets/images/mozzarella-sticks.jpg";
import onionRings from "../../assets/images/onion-rings.jpg";
import garlicBread from "../../assets/images/garlic-bread.jpg";
import chocolateCake from "../../assets/images/chocolate-cake.jpg";
import cheesecake from "../../assets/images/cheesecake.jpg";
import brownie from "../../assets/images/brownie.jpg";
import sundae from "../../assets/images/sundae.jpg";
import lemonade from "../../assets/images/lemonade.jpg";
import icedTea from "../../assets/images/iced-tea.jpg";
import soda from "../../assets/images/soda.jpg";
import milkshake from "../../assets/images/milkshake.jpg";

const menuItems = [
  { id: 1, name: "Classic Burger", category: "Burgers", price: 10.99, image: burger, description: "Beef patty, cheddar cheese, lettuce, tomato, and sauce." },
  { id: 2, name: "Chicken Sandwich", category: "Burgers", price: 9.99, image: chicken, description: "Crispy chicken with lettuce, pickles, and sauce." },
  { id: 3, name: "BBQ Bacon Burger", category: "Burgers", price: 12.99, image: bbqBurger, description: "Beef burger with bacon, cheddar, and BBQ sauce." },

  { id: 4, name: "Pepperoni Pizza", category: "Pizza", price: 15.99, image: pepperoniPizza, description: "Pepperoni, mozzarella cheese, and tomato sauce." },
  { id: 5, name: "Margherita Pizza", category: "Pizza", price: 13.99, image: margheritaPizza, description: "Fresh mozzarella, basil, and tomato sauce." },
  { id: 6, name: "Veggie Pizza", category: "Pizza", price: 14.99, image: veggiePizza, description: "Mushrooms, olives, onions, peppers, and cheese." },
  { id: 7, name: "Meat Lovers Pizza", category: "Pizza", price: 17.99, image: meatLovers, description: "Pepperoni, sausage, bacon, beef, and mozzarella." },

  { id: 8, name: "Caesar Salad", category: "Salads", price: 8.99, image: caesarSalad, description: "Romaine lettuce, parmesan, croutons, and Caesar dressing." },
  { id: 9, name: "Greek Salad", category: "Salads", price: 9.49, image: greekSalad, description: "Feta, cucumbers, tomatoes, olives, and onions." },
  { id: 10, name: "Garden Salad", category: "Salads", price: 7.99, image: gardenSalad, description: "Fresh greens, cucumbers, tomatoes, and carrots." },

  { id: 11, name: "Loaded Fries", category: "Sides", price: 6.99, image: fries, description: "Crispy fries with cheddar cheese and green onions." },
  { id: 12, name: "Mozzarella Sticks", category: "Sides", price: 7.49, image: mozzarellaSticks, description: "Golden mozzarella sticks with marinara sauce." },
  { id: 13, name: "Onion Rings", category: "Sides", price: 5.99, image: onionRings, description: "Crispy golden onion rings." },
  { id: 14, name: "Garlic Bread", category: "Sides", price: 4.99, image: garlicBread, description: "Toasted garlic bread with herbs and butter." },

  { id: 15, name: "Chocolate Cake", category: "Desserts", price: 7.49, image: chocolateCake, description: "Rich layered chocolate cake with ganache." },
  { id: 16, name: "Cheesecake", category: "Desserts", price: 6.99, image: cheesecake, description: "Classic New York cheesecake." },
  { id: 17, name: "Brownie", category: "Desserts", price: 4.99, image: brownie, description: "Warm chocolate brownie with drizzle." },
  { id: 18, name: "Ice Cream Sundae", category: "Desserts", price: 5.99, image: sundae, description: "Vanilla ice cream with syrup and whipped cream." },

  { id: 19, name: "Fresh Lemonade", category: "Drinks", price: 3.99, image: lemonade, description: "Fresh homemade lemonade served cold." },
  { id: 20, name: "Iced Tea", category: "Drinks", price: 2.99, image: icedTea, description: "Fresh brewed iced tea with lemon." },
  { id: 21, name: "Soft Drink", category: "Drinks", price: 2.49, image: soda, description: "Choose Coke, Sprite, or Fanta." },
  { id: 22, name: "Vanilla Milkshake", category: "Drinks", price: 5.49, image: milkshake, description: "Creamy vanilla milkshake with whipped cream." },
];

const categories = ["All", "Burgers", "Pizza", "Salads", "Sides", "Desserts", "Drinks"];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});

  const [orderItems, setOrderItems] = useState([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const getQuantity = (id) => quantities[id] || 1;

  const increaseQuantity = (id) => {
    setQuantities({ ...quantities, [id]: getQuantity(id) + 1 });
  };

  const decreaseQuantity = (id) => {
    if (getQuantity(id) > 1) {
      setQuantities({ ...quantities, [id]: getQuantity(id) - 1 });
    }
  };

  const addItem = (item) => {
    const quantity = getQuantity(item.id);

    alert(`${getQuantity(item.id)} ${item.name}(s) added to order.`);

    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeItem = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems.flatMap((item) => {
        if (item.id !== itemId) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  };

  return (
    <div className="menu-page">
      <header className="top-section">
        <h1>ByteBites Menu</h1>
        <p>Choose your meal and add it to your order.</p>
      </header>

      <div className="profile-menu">        
        <img
          src="/profile-icon.jpg"
          alt="Profile"
          className="profile-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        />

        {showDropdown && (
          <div className="profile-dropdown">
            <p
              onClick={() => {
                setShowDropdown(false);
                navigate("/order-history");
              }}
            >
              Order History
            </p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>

      <div className="category-section">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active-category" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    
      <button
        className="summary-link-section"
        onClick={() => setShowOrderSummary(true)}
        type="button"
      >
        <span className="summary-link">View Order Summary</span>
      </button>

      {showOrderSummary && (
        <OrderSummary
          orderItems={orderItems}
          onClose={() => setShowOrderSummary(false)}
          onRemoveItem={removeItem}
          onPlaceOrder={() => {
            setShowOrderSummary(false);
            setOrderItems([]);
          }}
        />
      )}

      <section className="food-grid">
        {filteredItems.map((item) => (
          <div className="food-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="food-info">
              <p className="food-category">{item.category}</p>
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>

              <div className="food-bottom">
                <span>${item.price.toFixed(2)}</span>

                <div className="quantity-box">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{getQuantity(item.id)}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <button className="add-btn" onClick={() => addItem(item)}>
                Add
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Menu;