
import React from 'react';
import styled from 'styled-components';
import DetailsBar from '../components/DetailsBar';
import InputSide from '../components/InputSide';
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`;

const PageHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const FormContainer = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  height: 70vh;
  display: flex; /* Đặt flexbox để các phần tử con nằm ngang */
  flex-direction: row; /* Sắp xếp theo chiều ngang */
  justify-content: space-between; /* Giữ khoảng cách giữa các phần tử */
  gap: 20px; /* Tạo khoảng cách giữa hai phần */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Trở lại dọc trên màn hình nhỏ */
    width: 90%;
    height: auto;
  }
`;


const TextOne = styled.b`
  font-size: 30px;
  color: rgb(4, 4, 59);
  text-align: center;
`;

const TextTwo = styled.p`
  color: rgb(4, 4, 34);
  font-size: 15px;
  text-align: center;
`;

const Contact = () => {
  return (
    <PageWrapper>
      <PageHeadingWrapper>
        <TextOne>Contact US</TextOne>
        <TextTwo>Any Question or remarks? Just write us a message</TextTwo>
      </PageHeadingWrapper>
      <FormContainer>
        <DetailsBar />
        <InputSide />
      </FormContainer>
    </PageWrapper>
  );
};

export default Contact;
