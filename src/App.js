import { isEmpty, size} from 'lodash'
import React, {useState} from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = ()=>{
    let isValid = true
    setError(null)

    if(isEmpty(task)){
      
      setError('Debes ingresar una tarea')
      isValid = false
    }

    return isValid
  }

  const addTask = (e)=> {

    e.preventDefault() 
    
    if(!validForm()){
      return
    }
    const newTask ={
      id: shortid.generate(),
      name: task
    }

    setTasks([...tasks, newTask])

    setTask("")
  }

  const saveTask = (e)=> {

    e.preventDefault() 
    
    if(!validForm()){
      return
    }

    console.log("Savetask");
    const editTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editTasks);
    seteditMode(false)
    setTask("")
    setId("")
    
  }

  const removeTask = (id)=>{
   const filteredTasks = tasks.filter(task => task.id !== id)
   setTasks(filteredTasks)
  }

  const editTask = (theTask)=>{
    setTask(theTask.name)
    seteditMode(true)
    setId(theTask.id)

    console.log(theTask.id);
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">

        <div className="col-8">

          <h4 className="text-center">Lista de tareas</h4>

          {
              size(tasks) === 0 ? (
                <p className="text-center mt-5">Aun no hay tareas programadas</p>
              ):(
              
                <ul className="list-group">
                {
                  tasks.map((task)=>(

                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>

                    <button 
                      className="btn btn-danger btn-sm float-right mx-1"
                      onClick={()=> removeTask(task.id)}
                    >
                      Eliminar
                    </button>

                    <button 
                      className="btn btn-warning btn-sm float-right mx-1"
                      onClick={()=> editTask(task)}
                    >
                      Editar
                    </button>
                  </li>
                    ))
                 }
                </ul>
            )
          }
          
        </div>
        <div className="col-4">
          <h4 className="text-center">{editMode ? "Modificar Tarea" : "Agregar Tarea"}</h4>

            <form onSubmit={editMode? saveTask : addTask}>

              <div className="form-group">
                <br/>
                <input type="text" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Nueva tarea" 
                onChange={(text) => setTask(text.target.value)}
                value = {task}/>
                {
                  error && <span className="text-danger">{error}</span>
                }
              </div>

              <button 
                type="submit" 
                className={editMode? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
              >
                  {editMode ? "Modificar" : "Agregar"}
              </button>

            </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
