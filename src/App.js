import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function App() {
  // 初期データ（アイテムのリスト）
  const [items, setItems] = useState(["item0", "item1", "item2"]);

  // ドラッグ終了時の処理
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // ドロップ先がない場合は何もしない
    if (!destination) return;

    // リスト内でアイテムの順序を更新
    const updatedItems = Array.from(items);
    const [removed] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, removed);

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* ドロップエリアを画面全体に設定 */}
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              width: "100vw",
              height: "100vh",
              position: "relative",
              backgroundColor: "#f8f8f8",
              overflow: "hidden",
            }}
          >
            {/* 各アイテムを動的にレンダリング */}
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: "8px",
                      margin: "4px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      cursor: "grab",
                    }}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
