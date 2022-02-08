import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*{box-sizing: border-box}
input {
   all: unset;
   box-sizing: border-box;
   appearance: none;
 }

 body {
   background-color: black;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   font-size: 14px;
   color: white;
 }

 button {
   background-color: white;
   color: black;
 }

 a {
   text-decoration: none;
   color: inherit;
 }

 form {
   width: 100%;
 }
 .container{
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
 }

 .formInput {
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
 }

 .formBtn {
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
 }

 .cancelBtn {
  cursor: pointer;
  background-color: tomato;
  border-color: tomato;
 }
`;
