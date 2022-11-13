import React from 'react';
import { FallingLines } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';
export const Loader = () => {
  return (
    <LoaderStyled>
      <FallingLines
        color="#4338c2"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </LoaderStyled>
  );
};
