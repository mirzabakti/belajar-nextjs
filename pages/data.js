import Link from "next/link";
import Layout from "../widget/Layout";

const data = () => {
  return (
    <div>
      <Layout />
      <Link href="/static">
        <a className="h-screen text-blue-500 text-2xl underline place-content-center grid">Static</a>
      </Link>
    </div>
  );
};

export default data;
