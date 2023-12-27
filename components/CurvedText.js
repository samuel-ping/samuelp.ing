// UNUSED, Tailwind doesn't support dynamic classes
export default function CurvedText({ text, arc, radius }) {
  const characters = text.split('');
  const degree = arc / characters.length;

  return (
    <>
      {characters.map((char, i) => (
        <span
          key={`heading-span-${i}`}
          // className={`h-52 w-5 absolute left-40 origin-bottom rotate-[${i*6}deg]`}
          // className={`h-[${radius}px] rotate-[${degree * i - arc / 2}deg] origin-[0_${radius}px_0]`}
          // style={{
          //     height: `${radius}px`,
          //     transform: `rotate(${degree * i - arc / 2}deg)`,
          //     transformOrigin: `0 ${radius}px 0`,
          // }}
        >
          {char}
        </span>
      ))}
    </>
  );
}
