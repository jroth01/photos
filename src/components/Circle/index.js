import React, { Component } from 'react';
import styled from "styled-components";

const Btn = styled.div`
  display: inline-block;
  cursor: pointer;
  height: 8px;
  width: 8px;
  margin: 24px 4px;
  background-color: #e8eaed;
  border-radius: 50%;
  transition: background-color .3s;
`;

const Circle = () => (
  <Btn></Btn>
);

export default Circle;