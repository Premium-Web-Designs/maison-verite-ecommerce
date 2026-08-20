import HeroGrid from '../components/HeroGrid';
import CollectionGrid from '../components/CollectionGrid';
import EditorialSlider from '../components/EditorialSlider';
import Footer from '../components/Footer';

export default function CollectionPage() {
  return (
    <main className="min-h-screen pt-20">
      <HeroGrid />

      {/* Section Divider */}
      <div className="flex items-center justify-center px-6 md:px-12 mt-14">
        <div className="flex-1 h-px bg-maison-border" />
        <span className="px-6 text-[11px] font-medium tracking-[4px] uppercase text-maison-dim">
          Selected Works
        </span>
        <div className="flex-1 h-px bg-maison-border" />
      </div>

      <CollectionGrid />

      {/* Section Divider */}
      <div className="flex items-center justify-center px-6 md:px-12 my-4">
        
      </div>

      <EditorialSlider />
      <Footer />
    </main>
  );
}
