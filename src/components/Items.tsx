import { Reorder, useDragControls } from "framer-motion";
import { Item } from "../interfaces/Item";
import { useState } from "react";

const Items: React.FC<{items: Item[], setItems: React.Dispatch<React.SetStateAction<Item[]>>}> = ({items, setItems}) => {
  // !done
  const handleDone = (id:number) => {
    const index = items.findIndex(item => item.id == id);
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  }
  
  // !drag - workaround for the dragging handle bug: https://github.com/framer/motion/issues/1518
  const controls = useDragControls();
  const [draggable, setDraggable] = useState(false);
  
  return (
    <Reorder.Group values={items} onReorder={setItems} className="pl-0 flex flex-col list-none font-size-5 relative my-9 color-black">
      { items?.map((item) => (
        <Reorder.Item key={item.id} value={item} dragListener={draggable} onDragEnd={() => setDraggable(false)} dragControls={controls}>
          <div className={
            "flex justify-center items-center my-1 p-1 b-(1 solid stone-2) shadow-md op-100 transition-(500 delay-200) "+
            "[&_button]:(size-7 bg-stone-500) [&_button:hover]:bg-black "+
            (item.done ? "op-30 " : " ")
            }>
            <hr className={"-left-3 -right-3 absolute my-2 mt-1 b-0 h-1 bg-gradient-to-r from-(black 50%) to-(transparent 50%) bg-[length:200%] transition-(300 all) pointer-events-none z-1"+
              (item.done ? " bg-left" : " bg-right")}/>
            <button className="i-mdi-check" onClick={() => handleDone(item.id)} />
            <span className="p-1 grow-1 text-5">{item.name}</span>
            <div className='flex'>
              <button className="i-mdi-close" onClick={() => setItems(items.filter(i => i.id != item.id))} />
              <button key={"X"+item.id} className="i-mdi-drag" 
              onTouchStart={() => setDraggable(true)} 
              onMouseEnter={() => setDraggable(true)}
              onMouseLeave={() => setDraggable(false)} 
            />
            </div>
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
export default Items;