import Image from 'next/image';

/**
 * The /spotted street: storefront illustrations rendered side by side,
 * bottom-aligned like buildings along a block.
 */
const BuildingScroller = ({ buildings }) => {
  return (
    <div className="flex w-max items-end">
      {buildings.map((building) => (
        <Image
          key={building.name}
          src={building.src}
          alt={building.name}
          width={building.width}
          height={building.height}
          className="h-[50vh] w-auto shrink-0 md:h-[60vh]"
        />
      ))}
    </div>
  );
};

export default BuildingScroller;
