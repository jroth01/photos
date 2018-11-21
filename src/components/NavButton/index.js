import React, { Component } from 'react';
import styled from "styled-components";

const opacity = 0.8;
const disabledOpacity = opacity * .38;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  text-align: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: rgba(34,34,34,${props => !props.disabled ? opacity: disabledOpacity });
  background-size: cover;
`;

const PrevSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
  </svg>
);

const NextSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
  </svg>
);

const NavButton = props => (
  <Btn {...props}>{props.prev ? <PrevSVG/>: props.next ? <NextSVG/> : props.children} </Btn>
);

export default NavButton;