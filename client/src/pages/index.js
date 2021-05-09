import ContactBar from '../components/ContactBar';

export default function Home() {
  return (
    <>
      {/* <div className="p-4 shadow rounded">
        <h1 className="text-purple-500 leading-normal">Next.js</h1>
        <p className="text-gray-500">with Tailwind CSS</p>
      </div> */}
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
