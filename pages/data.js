import Link from "next/link";
import Layout from "../widget/Layout";

const data = () => {
  return (
    <div>
      <Layout />
      <div className="grid grid-cols-2">
        <Link href="/static" className="">
          <a className="bg-red-500 h-screen text-black text-2xl underline place-content-center grid">Static</a>
        </Link>
        <Link href="/server-side">
          <a className="bg-blue-500 h-screen text-black text-2xl underline place-content-center grid">Server</a>
        </Link>
      </div>
    </div>
  );
};

export default data;
