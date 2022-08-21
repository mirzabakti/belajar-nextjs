import Layout from "../../widget/Layout";
import Link from "next/dist/client/link";

export async function getStaticProps(context) {
  let result = await fetch("https://backendexample.sanbercloud.com/api/student-scores");
  let data = await result.json();

  return {
    props: {
      data,
    },
  };
}

const Static = ({ data }) => {
  console.log(data);

  return (
    <>
      <Layout />
      {data.length !== 0 &&
        data.map((res, index) => {
          return (
            <Link href={`/static/${res.id}`} key={index} className="flex flex-row">
              <div className="block rounded-lg shadow-lg bg-white hover:bg-gray-100 max-w-sm text-center">
                <div className="py-3 px-6 border-t border-gray-300 text-gray-600">Kartu Mahasiswa</div>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{res.name}</h5>
                  <p className="text-gray-700 text-base mb-4">Klik untuk melihat detail</p>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Static;
