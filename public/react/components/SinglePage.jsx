import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import apiURL from "../api";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import Button from "./Button";
import AddToCartButton from "./AddToCartButton";
import { AllStatesContext } from "./App";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  margin-top: 25px;
  gap: 50px;
`;

const CardStyle = styled.div`
  background-color: lightgray;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  box-shadow: 0px 0px 20px black;
  border-radius: 10px;
  padding: ${({ padding }) => padding || "0"};
`;

const ItemImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: scale-down;
  background-color: white;
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ImageAndInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  align-items: center;
  flex-flow: row nowrap;
  gap: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: auto;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  flex-flow: column nowrap;
  padding: 15px 38px;
`;

const TitleAndPart = styled.div`
  padding: 0px 0 5px 5px;
  width: 100%;
  height: 100px;
`;

const TitleFont = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;

const PartFont = styled.div`
  font-weight: 400;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  gap: 100px;
  flex-flow: row nowrap;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: #333333;
  }
`;

export default function SinglePage({ 
  // handleItemDeleted, 
  // currentUser, 
  // handleAddToCart 
}) {
  const {handleAddToCart, currentUser, handleItemDeleted} = useContext(AllStatesContext)

  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`${apiURL}/items/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    fetchItem();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${apiURL}:3000/api/items/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        handleItemDeleted(parseInt(id));
        alert(`Item #${id} deleted successfully`);
        navigate("/");
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    setShowModal(false);
    handleItemDeleted(id);
  };

  if (!item) return <div>Loading item</div>;

  return (
    <>
      <Wrapper>
        {showModal && (
          <DeleteModal
            confirmDelete={confirmDelete}
            handleCancelClick={handleCancelClick}
            handleDelete={handleDelete}
          />
        )}
        <ImageAndInfo>
          {" "}
          {/* This is first element in the column*/}
          <CardStyle>
            {" "}
            {/* This is the card with image and name + part*/}
            <ItemImage src={item.image} alt={item.title} />
            <TitleAndPart>
              {" "}
              {/*This is for info under the picture*/}
              <TitleFont>{item.name}</TitleFont>
              <PartFont>Part #{item.id}</PartFont>
            </TitleAndPart>
          </CardStyle>
          <InfoWrapper>
            {" "}
            {/* This is for info on the right side of the image*/}
            <h1>${item.price.toFixed(2)}</h1>
            <p>Amount in stock: {item.quantity}</p>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
          </InfoWrapper>
        </ImageAndInfo>

        <CardStyle padding="10px">
          {" "}
          {/* This is the card with description and categories*/}
          <p>{item.description}</p> <br />
          <p>
            <strong>Item Updated at : </strong> {item.updatedAt.slice(0, 10)}{" "}
          </p>{" "}
          <br />
          <p>
            <strong>Categories:</strong>
            <br /> {item.category}
          </p>
        </CardStyle>
        {!currentUser || currentUser.role !== "admin" ? (
          <ButtonWrapper>
            <ButtonWrapper style={{ visibility: "hidden" }}>
              <StyledLink to={`/edit-item/${item.id}`}>
                <Button>Edit Item</Button>
              </StyledLink>
            </ButtonWrapper>
              <StyledLink to={`/`}>
                <Button>Back to List</Button>
              </StyledLink>
            <ButtonWrapper style={{ visibility: "hidden" }}>
              <Button onClick={handleDeleteClick}>Delete Item</Button>
            </ButtonWrapper>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <StyledLink to={`/edit-item/${item.id}`}>
              <Button>Edit Item</Button>
            </StyledLink>
            <StyledLink to={`/`}>
              <Button>Back to List</Button>
            </StyledLink>
            <Button onClick={handleDeleteClick}>Delete Item</Button>
          </ButtonWrapper>
        )}
      </Wrapper>
    </>
  );
}
