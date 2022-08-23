import Layout from "../../widget/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

export async function getServerSideProps() {
  let result = await fetch("https://backendexample.sanbercloud.com/api/student-scores");
  let data = await result.json();

  return {
    props: {
      data,
    },
  };
}

export default function Server({ data }) {
  //state data
  const [dataStudents, setDataStudents] = useState(data);
  const [input, setInput] = useState({
    name: "",
    course: "",
    score: "",
  });

  // indikator
  const [fetchStatus, setFetchStatus] = useState(false);
  const [currentId, setCurrentId] = useState(-1);

  let fetchData = async () => {
    let res = await axios.get("https://backendexample.sanbercloud.com/api/student-scores");
    let result = res.data;

    setDataStudents([...result]);
  };

  useEffect(() => {
    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let { name, course, score } = input;

    if (currentId === -1) {
      axios.post(`https://backendexample.sanbercloud.com/api/student-scores`, { name, course, score }).then((res) => {
        setFetchStatus(true);
      });
    } else {
      axios.put(`https://backendexample.sanbercloud.com/api/student-scores/${currentId}`, { name, course, score }).then((res) => {
        setFetchStatus(true);
      });
    }

    setInput({
      name: "",
      course: "",
      score: "",
    });

    setCurrentId(-1);
  };

  const handleDelete = (e) => {
    let idData = e.target.value;

    axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`).then((res) => {
      console.log(res);
      setFetchStatus(true);
    });
  };

  const handleEdit = (e) => {
    let idData = e.target.value;

    axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`).then((res) => {
      console.log(res);
      setCurrentId(res.data.id);

      setInput({
        name: res.data.name,
        course: res.data.course,
        score: res.data.score,
      });
    });
  };

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

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
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {dataStudents.length !== 0 &&
              dataStudents.map((res, index) => {
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
                    <td className="py-4 px-6">
                      <button value={res.id} onClick={handleDelete} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5">
                        Delete
                      </button>
                      <button value={res.id} onClick={handleEdit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit} classNameName="w-1/2 mx-auto mt-5">
        <div className="mb-6">
          <label className="block mb-2 text-white text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input
            value={input.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="input name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-white text-sm font-medium text-gray-900 dark:text-gray-300">Course</label>
          <input
            value={input.course}
            onChange={handleChange}
            name="course"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="input course"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm text-white font-medium text-gray-900 dark:text-gray-300">Score</label>
          <input
            value={input.score}
            onChange={handleChange}
            name="score"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="input score"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
