import styled from "styled-components";
import Card from "./Card";
import AddToCartButton from "./AddToCartButton";
import { useContext } from "react";
import { AllStatesContext } from "./App";

const GridWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: auto;
`;

const CardWrapperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 10px;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  margin-top: 20px;
`;

export default function CardsList() {
  const { filteredItems, handleAddToCart } = useContext(AllStatesContext);
  return (
    <GridWrapper>
      <CardWrapperGrid>
        {filteredItems.map((item, i) => {
          return (
            <div key={item.id}>
              <Wrapper>
                <Card item={item} />
                <AddToCartButton
                  handleAddToCart={handleAddToCart}
                  item={item}
                />
              </Wrapper>
            </div>
          );
        })}
      </CardWrapperGrid>
    </GridWrapper>
  );
}
