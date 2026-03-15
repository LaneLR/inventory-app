import styled from "styled-components";
import Button from "./Button";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: column nowrap;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 10;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 450px;
  height: auto;
  margin-top: 20px;
  gap: 20px;
`;

export default function DeleteModal({ handleCancelClick, handleDelete }) {
  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <p>Are you sure you want to delete this item?</p>
          <BtnContainer>
            <Button onClick={handleDelete}>Confirm Delete</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </BtnContainer>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
}
