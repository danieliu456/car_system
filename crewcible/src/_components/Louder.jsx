import React from 'react';
import ReactLoading from 'react-loading';
 
const Louder = ({ type, color }) => (
    <ReactLoading  type={'spin'} color={"#333"} height={'40%'} width={'40%'} />
);
 
export default Louder;