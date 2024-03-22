import { Button, TextField } from "@radix-ui/themes"
import { Item } from "../interfaces/Item";
import { useState } from "react";

const NewItem: React.FC<{items: Item[], setItems: React.Dispatch<React.SetStateAction<Item[]>>}> = (props) => {
  const [newItemText, setNewItemText] = useState("");
  const handleNewItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemText(e.target.value);
  }
  const handleAddNewItem = () => {
    const nextId = props.items.reduce((a,c) => Math.max(a, c.id), 0) + 1;
    props.setItems(s => [...s, { id: nextId, name: newItemText, done: false }]);
    setNewItemText("");
  }
  const handleKeyDown = (e:React.KeyboardEvent) => {
    if (e.key == "Enter") {
      handleAddNewItem();
    }
  }
  
  return (
    <div className="flex w-full shadow-md">
      <TextField.Root size="3" className="grow-1">
        <TextField.Input placeholder="Add item" onChange={handleNewItemText} value={newItemText} onKeyDown={handleKeyDown} />
        <TextField.Slot className="!px-0">
          <Button className="mx-2 w-80px !h-100%" onClick={handleAddNewItem}><i className="i-mdi-plus size-6"/></Button>
        </TextField.Slot>
      </TextField.Root>
    </div>
  )
}
export default NewItem