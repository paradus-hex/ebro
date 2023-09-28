import { useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';

export function FormPopOver({
  children,
  className,
  values,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  values?: any;
  type?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Label>Address</Label> */}

        {/* <h1>hello</h1> */}
        <Button className={'text-left ' + ' ' + className} variant="outline">
          {type == 'address'
            ? values?.address && values?.city && values?.zipCode
              ? values.address + ', ' + values.city + ', ' + values.zipCode
              : 'No address selected'
            : ''}
          {type == 'roomNumbers'
            ? values?.address && values?.numberOfBathRooms
              ? 'Bedrooms X' +
                ' ' +
                values.numberOfBedRooms +
                ', ' +
                'Bathrooms X' +
                ' ' +
                values.numberOfBathRooms
              : 'No address selected'
            : ''}
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
