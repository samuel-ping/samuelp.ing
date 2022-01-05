import Head from 'next/head';

import Navbar from '@components/Navbar';
import NavbarButtons from '@config/NavbarButtons.config';
import Footer from '@components/Footer';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        {/* Used https://devhints.io/html-meta for the following tags */}
        {/* Title */}
        <title>
          Samuel Ping
          {title}
        </title>
        <meta property="og:title" content="Samuel Ping" />
        <meta name="twitter:title" content="Samuel Ping" />

        {/* URL */}
        <link rel="canonical" href="https://samuelping.me" />
        <meta property="og:url" content="https://samuelping.me" />
        <meta name="twitter:url" content="https://samuelping.me" />

        {/* Description */}
        <meta name="description" content="Sam's personal website!" />
        <meta property="og:description" content="Sam's personal website!" />
        <meta name="twitter:description" content="Sam's personal website!" />

        {/* Image */}
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/URobdVrz7X-3M0EgSDXSKrbsMBeseSB601139hlVzPPCZ5kWjGK9M4h_XZM07XKlPBfmn9rBoOq4ubtZH5kU_dIJkvKLrQq-QQ68t3D3biTHSFyf_WV3tzadawj7xNGXj1gQ8dWKco4VGgBB6FRjiRKF2d3iH0PIIdZ-d7MQ-u4TfZF9SpAzJXDJLy701VLoTIcwRuTMBUQKwAA3gjFROqwO0LytX9fZFHifncPnjjfMIFif1Hm0AMVeqFd1kGYligkvv5z9TJsxk1piyB_nS-Je8YhnZMjnassaB6TjQB9TZpuZeaNftVGrBNvdfLqGo7Q5RB4sTyLq8gmYgDv5Oce2_85jKsk3ISlZ1F4FQE3pPWJXxkUZoFuvjMgXjYakH-nupXNTvYXq0FrybNYKmYV6zsmKc5C18U7xz2dgXINf325liX5sKbKJXgfb_ljKziPoabGTGXGRHB05PHMzYyzasgL7u3jf6Dkv_j2f2V6tdnLc6JlY3HaSI1jQavjF3Y8fMF5EXqLf2mVlF9ibZtvVd80vPh1zWzLksd0jebzvz5EL93cezOihovMhUCohIqfeEA59MO2VSbmPNNZFGuphSj2yIndfJo3Bx40RVwCxkEIb6jy1u5K8KC808dAeAdYDk4mFYo1mFJ44UASId__tiCaQJMzD6CElbo1v4RgeCPGhJE_JaqQg8iWK9qeKFlmFHsrU_HmTL4MqK2kw2Mj0=w711-h947-no?authuser=0"
        />
        <meta
          name="twitter:image"
          content="https://lh3.googleusercontent.com/URobdVrz7X-3M0EgSDXSKrbsMBeseSB601139hlVzPPCZ5kWjGK9M4h_XZM07XKlPBfmn9rBoOq4ubtZH5kU_dIJkvKLrQq-QQ68t3D3biTHSFyf_WV3tzadawj7xNGXj1gQ8dWKco4VGgBB6FRjiRKF2d3iH0PIIdZ-d7MQ-u4TfZF9SpAzJXDJLy701VLoTIcwRuTMBUQKwAA3gjFROqwO0LytX9fZFHifncPnjjfMIFif1Hm0AMVeqFd1kGYligkvv5z9TJsxk1piyB_nS-Je8YhnZMjnassaB6TjQB9TZpuZeaNftVGrBNvdfLqGo7Q5RB4sTyLq8gmYgDv5Oce2_85jKsk3ISlZ1F4FQE3pPWJXxkUZoFuvjMgXjYakH-nupXNTvYXq0FrybNYKmYV6zsmKc5C18U7xz2dgXINf325liX5sKbKJXgfb_ljKziPoabGTGXGRHB05PHMzYyzasgL7u3jf6Dkv_j2f2V6tdnLc6JlY3HaSI1jQavjF3Y8fMF5EXqLf2mVlF9ibZtvVd80vPh1zWzLksd0jebzvz5EL93cezOihovMhUCohIqfeEA59MO2VSbmPNNZFGuphSj2yIndfJo3Bx40RVwCxkEIb6jy1u5K8KC808dAeAdYDk4mFYo1mFJ44UASId__tiCaQJMzD6CElbo1v4RgeCPGhJE_JaqQg8iWK9qeKFlmFHsrU_HmTL4MqK2kw2Mj0=w711-h947-no?authuser=0"
        />

        {/* UA */}
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="width=1024" />

        {/* More Open Graph */}
        <meta property="og:site_name" content="Samuel Ping" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
      </Head>
      <div className="flex flex-col min-h-screen items-center justify-between bg-green-50">
        <Navbar navbarButtons={NavbarButtons} />

        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
}
