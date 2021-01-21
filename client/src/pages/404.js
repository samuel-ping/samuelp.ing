import Error from "next/error";

export default function Custom404() {
  return (
    <Error statusCode="404" />
    // <h3>
    //   Well this is awkward... but I couldn't find what you were looking for...
    //   so here's an status code... 404.
    // </h3>
  );
}
