import { useEffect, useState, createContext } from "react";
import styled from "styled-components";
import Header from "./Header";
import CardsList from "./CardsList";
import SinglePage from "./SinglePage";
import AddForm from "./AddForm";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";
import CreateUserMenu from "./CreateUserMenu";
import SideBar from "./SideBar";
import CheckoutCart from "./CheckoutCart";
import apiURL from "../api"; //import host/api/...

const BodyStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "sidebar",
})`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left: ${(props) =>
    props.sidebar ? "204px" : "0"}; // Adjusted to account for the sidebar width
`;

export const AllStatesContext = createContext(null);

export default function App() {
  const location = useLocation();
  const isSinglePage = matchPath("/item/:id", location.pathname);
  const showSidebar = !isSinglePage;
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const [cart, setCart] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
      setFilteredItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setFilteredItems((prevFiltered) => [...prevFiltered, newItem]);
  };

  const handleItemDeleted = (deletedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
    setFilteredItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedId)
    );
  };

  const handleItemUpdated = async (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleUserAdded = (newUser) => {
    setItems((prevUsers) =>
      prevUsers.map((user) => (user.id === newUser.id ? newUser : user))
    );
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) return;
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    if (!isLoggedIn) return;
    let removed = false;
    setCart((prevCart) =>
      //remove item
      prevCart.filter((item) => {
        //if more than 1 of same item is in the cart, remove only one
        if (!removed && item.id === itemToRemove.id) {
          removed = true;
          return false;
        }
        return true;
      })
    );
  };

  return (
    <>
      <AllStatesContext.Provider
        value={{
          items,
          setItems,
          cart,
          setCart,
          isLoggedIn,
          setIsLoggedIn,
          filteredItems,
          setFilteredItems,
          currentUser,
          setCurrentUser,
          handleAddToCart,
          handleItemAdded,
          handleItemDeleted,
          handleItemUpdated,
          handleRemoveFromCart,
          handleUserAdded,
        }}
      >
        <Header />

        <BodyStyle sidebar={showSidebar}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SideBar />
                  <CardsList />
                </>
              }
            />
            <Route path="/item/:id" element={<SinglePage />} />
            <Route path="/create-item" element={<AddForm />} />
            <Route path="/delete-items" element={<DeleteForm />} />
            <Route path="/edit-item/:id" element={<UpdateForm />} />
            <Route path="/login-form" element={<CreateUserMenu />} />
            <Route path="/checkout-cart" element={<CheckoutCart />} />
          </Routes>
        </BodyStyle>
      </AllStatesContext.Provider>
    </>
  );
}
