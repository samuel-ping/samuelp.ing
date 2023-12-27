import Image from 'next/image';

// import mdToReact from 'utils/MarkdownProcessor';
import profilePic from '@public/assets/sam.jpg';

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl">About Me</span>
      <Image
        src={profilePic}
        alt="Photo of Sam"
        width="200"
        height="200"
        priority
        placeholder="blur"
        className="rounded-full object-cover"
      />
      <article className="prose prose-md mx-5 lg:prose-lg">
        {'hello world'}
      </article>
    </div>
  );
}
