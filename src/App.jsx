import { useEffect, useState } from "react"
import Status from "./components/Status";

let initializing = true;
export default function App() {
  const [items, setItems] = useState([]);
  const [db, setDb] = useState("https://react-test-97247-default-rtdb.firebaseio.com/items.json");
  
  // !read from database
  const dbRead = async () => {
    const response = await fetch(db);
    if (!response.ok) {
      setStatus({ type: "error", message: "Error connecting to the database..." });
      console.log("Error reading database...");
      return;
    }
    const data = await response.json();
    if (!data) {
      setStatus({ type: "error", message: "Error reading data..." });
      console.log("Error reading data...");
      return;
    }
    setItems(data);
    setTimeout(() => { initializing = false; }, 1000);
    setStatus({ type: "info", message: "✔️" });
  }
  useEffect(() => {
    dbRead();
  }, [])
  
  // !write to database
  const dbWrite = async () => {
    const response = await fetch(db, { method: "PUT", body: JSON.stringify(items) } );
      
    if (!response.ok) {
      setStatus({ type: "error", message: "Error connecting to the database..." });
      console.log("Error writing to database");
      return;
    }
    setStatus({ type: "info", message: "✔️" });
    console.log("Written to database...");
  }
  useEffect(() => {
    if (initializing) {
      return;
    }
    dbWrite(); 
  }, [items]);
  
  // !new item
  const [newItemText, setNewItemText] = useState("");
  const handleNewItemText = (e) => {
    setNewItemText(e.target.value);
  }
  const handleAddNewItem = () => {
    const nextId = items.reduce((a,b) => a.id > b.id ? a.id : b.id, 0) + 1;
    setItems([...items, { id: nextId, name: newItemText, done: false }]);
    setNewItemText("");
  }
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleAddNewItem();
    }
  }
  
  // !move up
  const handleMoveUp = (id) => {
    const index = items.findIndex(item => item.id == id);
    if (index > 0) {
      const newItems = [...items];
      [newItems[index], newItems[index-1]] = [newItems[index-1], newItems[index]]
      setItems(newItems);
    }
  }
  
  // !move down
  const handleMoveDown = (id) => {
    const index = items.findIndex(item => item.id == id);
    if (index < items.length-1) {
      const newItems = [...items];
      [newItems[index], newItems[index+1]] = [newItems[index+1], newItems[index]]
      setItems(newItems);
    }
  }
  
  // !done
  const handleDone = (id) => {
    const index = items.findIndex(item => item.id == id);
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  }
  
  // !status
  const [status, setStatus] = useState(null);

  return (
    <main className="max-w-md mx-auto [&_button]:cursor-pointer">
      { status && <Status type={status.type} message={status.message} closeStatus={() => { setStatus(null) }}/> }
      <h1>TODO List</h1>
      <div className="flex">
        <input className="text-5 grow-1 p-2 shadow-md b-1 b-solid b-gray-300 b-r-none outline-none" onChange={handleNewItemText} value={newItemText} onKeyDown={handleKeyDown} />
        <button className="text-4 shadow-md b-1 b-solid b-gray-300 px-8 hover:b-gray-400" onClick={handleAddNewItem}>Add</button> 
      </div>
      <ul className="pl-0 flex flex-col list-none font-size-5 relative my-9 color-black">
        { items.map((item, index) => <li key={index} className={
          "flex justify-center items-center my-1 p-1 b-1 b-solid b-gray-2 shadow-md op-100 transition-500 transition-delay-200 "+
          "[&_button]:rounded-sm [&_button]:mx-0.5 [&_button]:w-7.5 [&_button]:h-7.5 [&_button]:b-1 [&_button]:b-gray-300 [&_button:hover]:b-gray-400"+
          (item.done && "op-30 ")
          }>
          <hr className={"-left-1 -right-1 absolute my-2 b-0 h-1 bg-gradient-to-r from-black from-50% to-transparent to-50% bg-[length:200%] transition-300 transition-all pointer-events-none"+
            (item.done ? " bg-left" : " bg-right")}/>
          <button className="done" onClick={() => handleDone(item.id)}>✔️</button>
          <span className="p-1 grow-1">{item.name}</span>
          <div className='actions'>
            <button className="move" onClick={() => handleMoveUp(item.id)}>⬆</button>
            <button className="move" onClick={() => handleMoveDown(item.id)}>⬇</button>
            <button className="delete" onClick={() => setItems(items.filter(i => i.id != item.id))}>X</button>
          </div>
          </li>) }
      </ul>
      <div className="mx-auto my-40 text-center">
        <button className="mx-1 h-10 px-5 color-gray-500 bg-white b-1 b-solid b-gray-200 rounded-1 hover:bg-gray-50 hover:color-gray-800" onClick={ () => { setDb(""); dbRead(); } }>Test Bad DB Connection</button>
      </div>
    </main>
  )
}

