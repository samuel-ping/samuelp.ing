export default function WorkCard({ title, company, dates, location, tags }) {
  return (
    <>
      <button
        type="button"
        className="flex flex-row justify-between px-10 py-6 rounded-3xl border-2 border-green-500"
      >
        <div className="flex flex-col">
          <span>{title}</span>
          <span>{company}</span>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-col">
            <span>{dates}</span>
            <span>{location}</span>
          </div>
          <span>-&gt;</span>
        </div>
      </button>
    </>
  );
}
