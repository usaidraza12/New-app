import CallToAction from "./home/call-to-action";
import FeaturedProducts from "./home/featured-products";
import Footer from "./home/footer";
import HeroSection from "./home/hero-section";
import Navbar from "./home/home";


export default function HomePage() {
  return (
 
    <div>
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CallToAction />
      </main>
    </div>
  
  );
}
