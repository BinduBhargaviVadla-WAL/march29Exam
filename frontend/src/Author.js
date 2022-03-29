import { useState, useEffect } from "react";
import axios from "axios";
const Author = () => {
  let [author, setAuthor] = useState([]);
  useEffect(() => {
    getAuthor();
  }, []);
  const getAuthor = () => {
    axios
      .get("/author")
      .then((res) => {
        console.log(res.data.results);
        setAuthor(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addAuthor = (event) => {
    event.preventDefault();
    let authorObject = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      dob: event.target.dob.value,
      dod: event.target.dod.value,
    };
    console.log(authorObject);
    axios
      .post("/author", authorObject)
      .then((res) => {
        getAuthor();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteAuthor = (first_name) => {
    axios
      .delete("/author/" + first_name)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAuthor();
  };
  const deleteAll = () => {
    axios
      .delete("/author")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAuthor();
  };
  const updateAuthor = (item) => {};
  return (
    <div>
      <h1>Author Form</h1>
      <form onSubmit={addAuthor}>
        <label>First Name:</label>

        <input type='text' name='first_name' placeholder='Enter First Name' />
        <br />
        <label>Last Name</label>

        <input type='text' name='last_name' placeholder='Enter Last Name' />
        <br />
        <label>Date of Birth:</label>

        <input type='date' name='dob' />
        <br />
        <label>Date of Death:</label>

        <input type='date' name='dod' />
        <br />
        <button>Add</button>
      </form>
      <h5>
        Delete all Authors Details , Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Date of Death</th>
          <th></th>
        </tr>

        {author.length != 0 ? (
          author.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.first_name}</td>
                <td>{val.last_name}</td>
                <td>{val.dob}</td>
                <td>{val.dod}</td>
                <td>
                  <button
                    onClick={deleteAuthor(val.first_name)}
                    className='delBtn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <h5>No Data Available</h5>
        )}
      </table>
    </div>
  );
};
export default Author;
