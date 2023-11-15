import React from 'react';

import TopSection from '../Components/TopSection/TopSection';
import TopSlider from '../Components/TopSlider/TopSlider';
import Trending from '../Components/Trending/Trending';

const Home = () => {
    return (
        <React.Fragment>
            <TopSection />
            <TopSlider />

            <Trending />
        </React.Fragment>
    )
}

export default Home