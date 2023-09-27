import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';

export default function Create() {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/home');
  };
  return (
    <div className="w-full flex-col gap-10 justify-center">
      <Button className="w-[90px] h-[50px]" onClick={handleHomeClick}>
        Home
      </Button>
      <div className="">Hello</div>
    </div>
  );
}
