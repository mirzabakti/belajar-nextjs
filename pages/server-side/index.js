import Layout from "../../widget/Layout";

export async function getServerSideProps() {
  let result = await fetch("https://backendexample.sanbercloud.com/api/student-scores");
  let data = await result.json();

  return {
    props: {
      data,
    },
  };
}

const ServerSide = ({ data }) => {
  console.log(data);

  return (
    <>
      <Layout />

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#7E3AF2] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                NO
              </th>
              <th scope="col" className="py-3 px-6">
                NAMA
              </th>
              <th scope="col" className="py-3 px-6">
                MATA KULIAH
              </th>
              <th scope="col" className="py-3 px-6">
                NILAI
              </th>
              <th scope="col" className="py-3 px-6">
                INDEX NILAI
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data.map((res, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="py-4 px-6">{res.name}</td>
                    <td className="py-4 px-6">{res.course}</td>
                    <td className="py-4 px-6">{res.score}</td>
                    <td className="py-4 px-6">
                      {res.score >= 80 && res.score <= 100
                        ? "A"
                        : res.score >= 70 && res.score < 80
                        ? "B"
                        : res.score >= 60 && res.score < 70
                        ? "C"
                        : res.score >= 50 && res.score < 60
                        ? "D"
                        : res.score < 50 && res.score >= 0
                        ? "E"
                        : "Nilai tidak valid"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServerSide;
