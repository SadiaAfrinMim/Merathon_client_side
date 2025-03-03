import React from 'react';
import Banner from '../Component/Banner';
import Faq from '../Component/Faq';
import Merathon from '../Component/Merathon';
import HeroSection from './HeroSection';
import ChallengeSection from './ChallangesSection';
import StatsSection from './StatsSection';
import Leaderboard from '../Component/Leaderboard';
import Timeline from '../Component/Timeline';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ChallengeSection></ChallengeSection>
          <StatsSection></StatsSection>
         
          
         <Merathon></Merathon>
         <HeroSection></HeroSection>
         <Leaderboard></Leaderboard>
        
          <Faq></Faq>
          <Timeline></Timeline>
            
        </div>
    );
};

export default Home;