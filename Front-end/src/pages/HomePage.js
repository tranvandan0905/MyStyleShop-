import React from "react";
import Banner from "../components/Banner";
import CategoryGrid from "../components/CategoryGrid";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import DiscountCategory from "../components/discountProducts";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`
const HomePage = () => {
    return (

        <Container>
            <PageWrapper>
                <Banner />
                <CategoryGrid />
                <DiscountCategory/>
            </PageWrapper>
        </Container>

    );
};

export default HomePage;
