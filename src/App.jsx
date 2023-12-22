import "./App.css";
import "react-responsive-modal/styles.css";
import { PlusCircle, Edit, Trash2 } from "react-feather";
import { Modal } from 'react-responsive-modal';
import { useState } from "react";

function App() {

  const blankUser = {
    "name":"",
    "email":"",
    "role":"",
    "address":""
  }

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(blankUser);
  const [userData, setUserData] = useState([]);
  const [action, setAction] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction("Add")
  }

  const addUser = () =>{
    setUserData([...userData,user])
    setUser(blankUser)
    
    onCloseModal()
  }

  const editUser = (index) =>{
    setAction("Edit")
    const selecteduser = () => userData.find((x,i)=>i === index)
    setUser(selecteduser)
    setEditIndex(index)
    onOpenModal()
  }

  const updateUser = () =>{
      const newUser = userData.map((x,i)=>{
        if(i===editIndex){
          x = user
        }
        return x
      })
      setUserData(newUser)
      setUser(blankUser)
      setEditIndex(null)
      onCloseModal()
  }

  const deleteUser = (index) =>{
    const newUser = userData.filter((x,i)=>{
      return i!== index
    })
    setUserData(newUser)

  }
  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn" onClick={onOpenModal}>
          <PlusCircle size={16} />
          <span>Add User</span>
          
        </button>
      </div>
      <hr />
      {/*<p>{JSON.stringify(user)}</p>*/}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {userData.length > 0 && userData.map((user,index)=>{
         return  (<tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.address}</td>
            <td>
              <button className="btn" onClick={()=>editUser(index)}>
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button className="btn" onClick={()=>deleteUser(index)}>
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </td>
          </tr>)
        })}
          
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action}</h2>
        <p>{JSON.stringify(user)}</p>
        <div className="form"> 
        <label htmlFor="name">Name</label>
        <input type="text" value={user.name} onChange={(e)=>setUser({...user,"name":e.target.value})}/>
        <label htmlFor="name">Email</label>
        <input type="text" value={user.email} onChange={(e)=>setUser({...user,"email":e.target.value})}/>
        <label htmlFor="name">Role</label>
        <input type="text" value={user.role} onChange={(e)=>setUser({...user,"role":e.target.value})}/>
        <label htmlFor="">Address</label>
        <textarea name="address" value={user.address} id="" cols="30" rows="10" onChange={(e)=>setUser({...user,"address":e.target.value})}></textarea>
        {action === "Add" && (
          <button className="btn" onClick={()=>addUser()}>Submit</button>
        )}
        {action === "Edit" && (
          <button className="btn" onClick={()=>updateUser()}>Update</button>
        )}
        </div>
      </Modal>

    </div>
  );
}

export default App;
