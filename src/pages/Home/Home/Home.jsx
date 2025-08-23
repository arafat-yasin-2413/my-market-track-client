import React from 'react';
import AdsBanner from '../../../components/AdsBanner/AdsBanner';
import Banner from '../Banner/Banner';
import ProductSection from '../../../components/ProductSection/ProductSection';
import MarketTips from '../../../components/MarketTips/MarketTips';
import SocialProof from '../../../components/SocialProof/SocialProof';
import HowItWorks from '../HowItWorks/HowItWorks';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Newsletter from '../NewsLetter/NewsLetter';


const Home = () => {




    return (
        <div>
            
            <Banner></Banner>
            

            <AdsBanner></AdsBanner>


            <ProductSection></ProductSection>


            <HowItWorks></HowItWorks>

            <WhyChooseUs></WhyChooseUs>

            <MarketTips></MarketTips>

            <SocialProof></SocialProof>
            
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;