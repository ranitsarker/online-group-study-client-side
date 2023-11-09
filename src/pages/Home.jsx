import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import DifficultyLevelOfAssignment from '../components/DifficultyLevelOfAssignment';
import Faq from '../components/Faq';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // data fetching with a setTimeout
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <Banner />
          <DifficultyLevelOfAssignment />
          <Faq />
        </>
      )}
    </div>
  );
};
export default Home;
