import { HeroSection } from '../../components/home/HeroSection';
import { CategoryGrid } from '../../components/home/CategoryGrid';
import { FeaturedCollection } from '../../components/home/FeaturedCollection';
import { NewArrivals } from '../../components/home/NewArrivals';
import { CollectionsGrid } from '../../components/home/CollectionsGrid';
import { Bestsellers } from '../../components/home/Bestsellers';
import { BudgetSection } from '../../components/home/BudgetSection';
import { BrandStory } from '../../components/home/BrandStory';
import { TrustSection } from '../../components/home/TrustSection';
import { ReviewsSection } from '../../components/home/ReviewsSection';
import { InstagramSection } from '../../components/home/InstagramSection';
import { NewsletterSection } from '../../components/home/NewsletterSection';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedCollection />
      <NewArrivals />
      <CollectionsGrid />
      <Bestsellers />
      <BudgetSection />
      <BrandStory />
      <TrustSection />
      <ReviewsSection />
      <InstagramSection />
      <NewsletterSection />
    </div>
  );
}
