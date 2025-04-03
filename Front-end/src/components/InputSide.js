import React, { useState } from 'react';
import styled from 'styled-components';
import { postcontacts } from '../services/ContactService';
import { toast } from 'react-toastify';

const InputSideWrapper = styled.form`
  height: auto;
  padding-bottom: 100px;
  position: relative;
  padding: 10px 10px 100px 10px;
`;

const InputWrapper = styled.div`
  border: 2px solid transparent;
  width: 90%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  color: #333;
  width: 100%;
  font-size: 15px;
  padding: 8px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent !important;
`;

const MessageInput = styled.textarea`
  width: 100%;
  color: #333;
  font-size: 15px;
  padding: 10px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent !important;
`;

const SubMitButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: rgb(8, 8, 63);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  cursor: pointer;
`;

const InputSide = () => {
  const [data, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); 
    try {
      const response = await postcontacts(data);
      if (response?.data) {
        toast.success("User added successfully!");
        setContact({ name: "", email: "", phone: "", message: "" }); 
      } else {
        toast.error("Failed to add Contact.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <InputSideWrapper onSubmit={handleSaveChanges}>
      <InputWrapper>
        <p>Name</p>
        <Input type="text" name="name" placeholder="Allen Jones" value={data.name} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <p>Email</p>
        <Input type="email" name="email" placeholder="dantranvan509@gmail.com" value={data.email} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <p>Phone</p>
        <Input type="number" name="phone" placeholder="+84987452905" value={data.phone} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <p>Message</p>
        <MessageInput name="message" placeholder="Write your message" value={data.message} onChange={handleChange} />
      </InputWrapper>
      <SubMitButton type="submit">Send Message</SubMitButton>
    </InputSideWrapper>
  );
};

export default InputSide;
