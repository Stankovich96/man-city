import React from 'react';
import Stripes from './stripe';
import Text from './text';

 const Featured = (props) =>{
    return(
      <div className="featured_wrapper">
          <Stripes />
          <Text />
      </div>
    );
 };

export default Featured;