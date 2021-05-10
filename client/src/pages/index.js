import ContactBar from '@components/ContactBar';

export default function Home() {
  return (
    <>
      <div>
        <h1 className="leading-normal text-5xl font-bold">
          Hey! I'm <span className="text-green-600">Sam Ping</span>, a...
        </h1>
        <ul>
          <li>Student Systems Programmer @ Rutgers Open Systems Solutions</li>
        </ul>
        <ContactBar />
      </div>
    </>
  );
}
