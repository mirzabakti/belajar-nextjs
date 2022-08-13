import Layout from "../../widget/Layout";

export async function getStaticPaths() {
  let result = await fetch("https://backendexample.sanbercloud.com/api/student-scores");
  let data = await result.json();

  const paths = data.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let result = await fetch(`https://backendexample.sanbercloud.com/api/student-scores/${params.id}`);
  let data = await result.json();

  return {
    props: { data },
  };
}

const DetailStatic = ({ data }) => {
  console.log(data);

  return (
    <div>
      <Layout />
      <h1 className="mt-5 text-2xl font-bold">ini adalah detail data</h1>
      <hr className="my-5" />
      <p>{data.name}</p>
      <ul>
        <li>
          <p>Mata kuliah: {data.course}</p>
        </li>
        <li>
          <p>Nilai: {data.score}</p>
        </li>
        <li>
          <p>Indeks nilainya: {data.score >= 80 && data.score <= 100 ? "A" : data.score >= 70 && data.score < 80 ? "B" : data.score >= 60 && data.score < 60 ? "D" : data.score < 50 && data.score >= 0 ? E : "Nilai tidak valid"}</p>
        </li>
      </ul>
    </div>
  );
};

export default DetailStatic;
