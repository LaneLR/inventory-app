import styled from "styled-components";
import Button from "./Button";
import React, { useState, useEffect, useContext } from "react";
import { AllStatesContext } from "./App";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  width: 220px;
  height: 85vh;
  background: #dd2a3b;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  padding: 16px;
  position: fixed;
  top: 1;
  left: 0;
  margin-left: 15px;
  color: white;
`;

const TitleFont = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PartFont = styled.div`
  font-weight: 400;
  font-size: 1rem;
`;

const QuantityNumber = styled.div`
  padding: 0px 0 5px 5px;
  width: 50%;
  height: 100%;
  border-left: 1px solid black;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 40%;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #888;
    outline: none;
    background: #f8f8f8;
  }
`;

export default function SideBar() {
  const { items, setFilteredItems } = useContext(AllStatesContext);

  const [maxPrice, setMaxPrice] = useState(0); //These are the filters that will be applied to the items
  const [mens, setMens] = useState(false);
  const [womens, setWomens] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [jewelery, setJewelery] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [descending, setDescending] = useState(false);

  const maxPriceNum = Number(maxPrice);

  function handleFilter() {
    let newItems = items;

    // Filter by max price
    if (maxPriceNum > 0) {
      newItems = newItems.filter((item) => item.price < maxPriceNum);
    }

    // Filter by categories (allow multiple selections)
    const selectedCategories = [];
    if (mens) selectedCategories.push("men's clothing");
    if (womens) selectedCategories.push("women's clothing");
    if (electronics) selectedCategories.push("electronics");
    if (jewelery) selectedCategories.push("jewelery");

    if (selectedCategories.length > 0) {
      newItems = newItems.filter((item) =>
        selectedCategories.includes(item.category),
      );
    }

    // Sort by price
    if (ascending) {
      newItems = [...newItems].sort((a, b) => a.price - b.price);
    } else if (descending) {
      newItems = [...newItems].sort((a, b) => b.price - a.price);
    }

    console.log("Filtered items:", newItems);
    setFilteredItems(newItems);
  }

  async function removeFilters() {
    setFilteredItems(items);
    //setMaxPriceFilter(false);
    setMaxPrice(0);
    setMens(false);
    setWomens(false);
    setElectronics(false);
    setJewelery(false);
    setAscending(false);
    setDescending(false);
  }

  return (
    <>
      <Wrapper>
        <h2>Multistore</h2>
        <br />
        <span
          style={{
            gap: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          Max Price:
          <StyledInput
            type="number"
            step="10"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          ></StyledInput>
        </span>
        <TitleFont>Categories</TitleFont>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={mens}
              onChange={() => setMens(!mens)}
            />
            Mens
          </label>
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={womens}
              onChange={() => setWomens(!womens)}
            />
            Womens
          </label>
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={electronics}
              onChange={() => setElectronics(!electronics)}
            />
            Electronics
          </label>
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={jewelery}
              onChange={() => setJewelery(!jewelery)}
            />
            Jewelery
          </label>
        </div>
        <br />
        <TitleFont>Sort</TitleFont>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              checked={ascending}
              onChange={() => {
                setAscending(true);
                setDescending(false);
              }}
            />
            Ascending Price
          </label>
          <label
            style={{
              gap: "5px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              checked={descending}
              onChange={() => {
                setAscending(false);
                setDescending(true);
              }}
            />
            Descending Price
          </label>
        </div>
        <br />
        <Button
          style={{
            width: "180px",
            boxShadow: "none",
            border: "solid",
            borderColor: "white",
          }}
          onClick={handleFilter}
        >
          Apply Filters
        </Button>
        <Button
          style={{
            width: "180px",
            boxShadow: "none",
            border: "solid",
            borderColor: "white",
          }}
          onClick={removeFilters}
        >
          Reset Filters
        </Button>
      </Wrapper>
    </>
  );
}
