import Hero from '@/components/hero';
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps';

const Index = async () => (
  <>
    <Hero />
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2 className="font-medium text-xl mb-4">Next steps</h2>
      <SignUpUserSteps />
    </main>
  </>
);

export default Index;
