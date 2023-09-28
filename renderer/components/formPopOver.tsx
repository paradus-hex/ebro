import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function FormPopOver({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Label>Address</Label> */}

        {/* <h1>hello</h1> */}
        <Button className={className} variant="outline">
          click here
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">{children}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
