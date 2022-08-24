import axios from "axios";
import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [input, setInput] = useState({
    name: "",
    course: "",
    score: "",
  });

  // indikator
  const [fetchStatus, setFetchStatus] = useState(false);
  const [currentId, setCurrentId] = useState(-1);

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

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

  let state = {
    input,
    setInput,
    fetchStatus,
    setFetchStatus,
    currentId,
    setCurrentId,
  };

  let handleFunction = {
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  };

    return (
        <GlobalContext.Provider value={{ state, handleFunction }}>
            {props.children}
        </GlobalContext.Provider>
    )

};

