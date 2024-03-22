import { useEffect, useState } from "react"
import { Button, Container } from "@radix-ui/themes";
import Status from "./components/Status";
import { Item } from "./interfaces/Item";
import { StatusMessage } from "./interfaces/StatusMessage";
import NewItem from "./components/NewItem";
import Items from "./components/Items";

let initializing = true;
export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [db, setDb] = useState("https://react-test-97247-default-rtdb.firebaseio.com/items.json");
  const [status, setStatus] = useState<StatusMessage | null>(null);
  
  // !read from database
  const dbRead = async () => {
    const response = await fetch(db);
    if (!response.ok) {
      setStatus({ type: "error", message: "Error connecting to the database" });
      return;
    }
    setTimeout(() => { initializing = false; }, 1000);
    const data = await response.json();
    if (!data) {
      setStatus({ type: "info", message: "The list is empty." });
      return;
    }
    setItems(data);
    setStatus({ type: "info", message: "List fetched." });
  }
  useEffect(() => {
    dbRead();
  }, [])
  
  // !write to database
  const dbWrite = async () => {
    const response = await fetch(db, { method: "PUT", body: JSON.stringify(items) } );
    if (!response.ok) {
      setStatus({ type: "error", message: "Error connecting to the database." });
      return;
    }
    setStatus({ type: "info", message: "Saved successfully." });
  }
  useEffect(() => {
    if (initializing) {
      return;
    }
    dbWrite(); 
  }, [items]);

  return (
    <main className="font-sans [&_button]:cursor-pointer">
      <header className="flex items-center bg-stone-200 shadow-md border-b-(1 solid stone-300) mb-10 px-3">
        <div className="w-8"/>
        <h1 className="text-(5 center stone-500) tracking-wide grow-1">TODO LIST</h1>
        { status && <Status type={status.type} message={status.message}/> }
      </header>
      <Container className="max-w-md mx-auto">
        <NewItem items={items} setItems={setItems} />
        <Items items={items} setItems={setItems} />
        <div className="mx-auto my-30 text-center">
          <Button variant="outline" onClick={ () => { setDb(""); dbRead(); } }>Test Bad DB Connection</Button>
        </div>
      </Container>
    </main>
  )
}