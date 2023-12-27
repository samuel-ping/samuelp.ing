import Link from 'next/link';

function ContactBarButton({ text, url }) {
  return (
    <>
      <Link href={url} className="w-fit">
        <button className="py-2 px-4 border-2 rounded text-xl font-medium transition-colors bg-transparent hover:bg-green-500 text-green-500 hover:text-white border-green-500 hover:border-transparent">
          {text}
        </button>
      </Link>
    </>
  );
}

export default ContactBarButton;
