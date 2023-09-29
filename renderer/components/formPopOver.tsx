import { Button } from './ui/button';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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
        <button
          className={
            'text-left text-sm py-[8px] px-[12px] text-gray-700/80 w-[80%] m-auto' +
            ' ' +
            className
          }
        >
          {type == 'address'
            ? values?.address && values?.city && values?.zipCode
              ? values.address + ', ' + values.city + ', ' + values.zipCode
              : 'No Address Selected'
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
              : 'No Rooms Numbers Selected'
            : ''}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">{children}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
