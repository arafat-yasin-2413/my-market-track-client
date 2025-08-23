import React from 'react';

const Container = ({children}) => {
    return (
        <div className='my-10 w-10/12 mx-auto'>
            {children}
        </div>
    );
};

export default Container;