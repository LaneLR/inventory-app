import React, { useContext, useState } from "react";
import styled from "styled-components";
import apiURL from "../api";
import Card from "./Card";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { AllStatesContext } from "./App";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 10px;
  justify-content: space-around;
  width: 70%;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-start;
  flex-flow: column nowrap;
  margin-top: 20px;
  gap: 5px;
  width: 300px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  width: 200px;
`;

const Preview = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
`;

const StyledInput = styled.input`
  width: 100%;
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

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 60px;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #888;
    outline: none;
    background: #f8f8f8;
  }
`;

function AddForm() {
  const { handleItemAdded } = useContext(AllStatesContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(formData.price);
    const parsedQuantity = parseInt(formData.quantity);

    const payload = {
      ...formData,
      price: isNaN(parsedPrice) ? 0 : parsedPrice,
      quantity: isNaN(parsedQuantity) ? 0 : parsedQuantity,
    };

    try {
      const res = await fetch(`${apiURL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), //
      });
      const data = await res.json();
      if (res.ok) {
        handleItemAdded(data);
        alert(`Your item "${formData.name}" added successfully!`);
        setFormData({
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          category: "",
          image: "",
        });
        navigate("/");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Title>Add New Item</Title>
            <StyledInput
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <StyledInput
              step={0.01}
              name="price"
              min={0}
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <StyledInput
              name="quantity"
              min={0}
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <StyledTextarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <StyledInput
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <StyledInput
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
            <Button type="submit">Add Item</Button>
          </FormWrapper>
        </form>
        <Preview>
          <Title> Preview: </Title>
          <Card
            item={{
              name: formData.name,
              price: formData.price,
              quantity: formData.quantity,
              description: formData.description,
              category: formData.category,
              image: formData.image,
            }}
          />
        </Preview>
      </Wrapper>
    </>
  );
}

export default AddForm;
