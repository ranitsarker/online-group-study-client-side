import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import DifficultyLevelOfAssignment from '../components/DifficultyLevelOfAssignment';
import Faq from '../components/Faq';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an async operation (e.g., fetching data) with a setTimeout
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulating a 2-second delay for loading
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        // Show a loading spinner while content is being loaded
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        // Display the content when loading is complete
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
