import React from 'react';

const MainTitle = ({text}) => {
    return (
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold tracking-wider my-4">{text}</h2>
    );
};

export default MainTitle;