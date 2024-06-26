import { AllProducts } from '@/components/AllProducts';
import { NavBar } from '@/components/NavBar';

export default function Home() {
  return (
    <main>
      <NavBar hideCartButton={true} blockCallLogoFunction={false} />
      <AllProducts />
    </main>
  );
}
