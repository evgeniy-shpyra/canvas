import React, { useState } from "react"
import { Stage, Layer, Line, Circle } from "react-konva"

function DrawingApp() {
    const [lines, setLines] = useState([])
    const [cursorPosition, setCursorLines] = useState()
    const [isDrawing, setIsDrawing] = useState(false)

    const handleMouseDown = (e) => {
        setIsDrawing(true)
        const pos = e.target.getStage().getPointerPosition()

        setLines([...lines, { points: [pos.x, pos.y] }])
     
    }

    const handleMouseMove = (e) => {
        const pos = e.target.getStage().getPointerPosition()
        // setCursorLines({ points: [pos.x, pos.y] })
        setCursorLines({ x: pos.x, y: pos.y })
       
        if (!isDrawing) return

        const stage = e.target.getStage()
        const point = stage.getPointerPosition()
        let lastLine = lines[lines.length - 1]

        if (lastLine) {
            lastLine.points = lastLine.points.concat([point.x, point.y])
            lines.splice(-1, 1, lastLine)
            setLines([...lines])
        }
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    return (
        // <div style={{cursor: 'default'}}>
            <Stage
            style={{cursor: 'none'}}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke='black'
                            strokeWidth={2}
                            tension={0.5}
                            lineCap='round'
                            globalCompositeOperation={
                                line.tool === "eraser"
                                    ? "destination-out"
                                    : "source-over"
                            }
                        />
                    ))}
                    {cursorPosition && (
                        <Circle
                            x={cursorPosition.x}
                            y={cursorPosition.y}
                            radius={4}
                            fill='green'
                        />
                    )}
                </Layer>
            </Stage>
        // </div>
    )
}

export default DrawingApp
