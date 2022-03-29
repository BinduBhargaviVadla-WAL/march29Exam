import { useState, useEffect } from "react";
import axios from "axios";
const Todo = () => {
  let [state, setState] = useState(false);
  let [data, setData] = useState({});
  let [todos, setTodos] = useState([
    { item: "Cook Breakfast", status: "complete" },
    { item: "Do Coding", status: "incomplete" },
  ]);
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    axios
      .get("/todos")
      .then((res) => {
        console.log(res.data.results);
        setTodos(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addTodo = (event) => {
    event.preventDefault();
    let todoObject = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    console.log(todoObject);
    axios
      .post("/todos", todoObject)
      .then((res) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteTodo = (index) => {
    console.log(index);
    axios
      .delete("/todos/" + index)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTodos();
  };
  const deleteAll = () => {
    axios
      .delete("/todos")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTodos();
  };

  const editTodo = (value) => {
    setState(true);
    setData(value);
  };
  const updateTodo = (event) => {
    event.preventDefault();
    const obj = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios.put(`/todos/${data.id}`, obj).then((res) => {
      getTodos();
      setState(false);
      console.log(res.data);
    });
  };
  return (
    <div className='todo'>
      {state ? (
        <form onSubmit={updateTodo}>
          <input type='text' name='item' placeholder={data.item} />
          <select name='status'>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
          </select>
          <button>Add</button>
        </form>
      ) : (
        <form onSubmit={addTodo}>
          <input type='text' name='item' placeholder='Enter Todo' />
          <select name='status'>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
          </select>
          <button>Add</button>
        </form>
      )}

      <h5>
        Delete All Todos, Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>Item</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>

        {todos.length != 0 ? (
          todos.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.item}</td>
                <td>{val.status}</td>
                <td>
                  <button onClick={() => deleteTodo(val.id)} className='delBtn'>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => editTodo(val)} className='delBtn'>
                    Update
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
export default Todo;
