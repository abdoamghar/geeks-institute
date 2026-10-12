import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedStory from "../components/FeaturedStory";
import StoryList from "../components/StoryList";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedStory />
      <StoryList />
      <Footer />
    </>
  )
}

export default Home