import { isEmpty } from 'lodash'
import React, {useState} from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  
  const addTask = (e)=> {

    e.preventDefault() 
    
    if(isEmpty(task)){
      
      console.log("Task vacio")
      return
    }
    
    const newTask ={
      id: shortid.generate(),
      name: task
    }

    setTasks([...tasks, newTask])

    setTask("")
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">

            {
              tasks.map((task)=>(

              <li className="list-group-item" key={task.id}>

              <span className="lead">{task.name}</span>
              <button className="btn btn-danger btn-sm float-right mx-1">Eliminar</button>
              <button className="btn btn-warning btn-sm float-right mx-1">Editar</button>
              
              </li>
              ))
            }
          </ul>
          
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>

            <form onSubmit={addTask}>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tarea</label>
                <input type="text" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Agregar nueva tarea" 
                onChange={(text) => setTask(text.target.value)}
                value = {task}/>
              </div>

              <button type="submit" className="btn btn-dark btn-block">Agregar</button>

            </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
