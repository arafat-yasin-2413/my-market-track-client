import React from 'react';
import AdsBanner from '../../../components/AdsBanner/AdsBanner';
import Banner from '../Banner/Banner';
import ProductSection from '../../../components/ProductSection/ProductSection';
import MarketTips from '../../../components/MarketTips/MarketTips';
import SocialProof from '../../../components/SocialProof/SocialProof';


const Home = () => {




    return (
        <div>
            
            <Banner></Banner>
            

            <AdsBanner></AdsBanner>


            <ProductSection></ProductSection>

            <MarketTips></MarketTips>

            <SocialProof></SocialProof>
            
        </div>
    );
};

export default Home;