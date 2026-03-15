import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import apiURL from "../api";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: #333333;
  }
`;

function UpdateByIdForm() {
  const {handleItemUpdated} = useContext(AllStatesContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`http://${apiURL}:3000/api/items/${id}`)
        const data = await res.json();
        setFormData({
          name: data?.name,
          price: data?.price,
          quantity: data?.quantity,
          description: data?.description,
          category: data?.category,
          image: data?.image,
        })
      } catch (err) {
        console.error("Error occurred: ", err)
      }
    }

    if (id) fetchItem()
  }, [id])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiURL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        handleItemUpdated(data);
        alert(`Item ${id} updated successfully`);
        navigate(`/item/${id}`)
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  return (

    <Wrapper>
      <form onSubmit={handleUpdate}>
        <FormWrapper>
          <Title>Update Item</Title>
          {/* <input
            name="id"
            type="number"
            placeholder="Enter Item ID"
            value={id}
            required
          /> */}
          <StyledInput
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <StyledInput
            name="price"
            type="number"
            step="0.01"
            min={0.01}
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <StyledInput
            name="quantity"
            type="number"
            step="1"
            min={0}
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
          <StyledLink to={`/item/${id}`}> <Button> Back</Button> </StyledLink>
          <Button type="submit">Update Item</Button>
        </FormWrapper>
      </form>
      <Preview>
              <Title> Preview: </Title>
              <Card item={{
                name: formData.name,
                price: formData.price,
                description: formData.description,
                category: formData.category,
                image: formData.image
              }} />
      </Preview>
    </Wrapper>


  );
}

export default UpdateByIdForm;
