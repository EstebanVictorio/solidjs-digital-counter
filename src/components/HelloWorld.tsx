import { createSignal, createEffect } from "solid-js"
import StateWorker from "workers/state.ts?worker"


const stateWorker = new StateWorker()



const HelloWorld = () => {
  const [counter, setCounter] = createSignal(0)

  const handleMessage = () => {
    stateWorker.postMessage("Message sent!")
  }

  const handleStopMessage = () => {
    stateWorker.postMessage("STOP")
  }
  
  createEffect(() => {
    stateWorker.onmessage = (event) => {
      console.log("Received new value: ", event.data)
      setCounter(_ => event.data)
    }
  })

  return (
    <div>
        {counter}
      <div>
        <button onClick={handleMessage}>Toggle worker</button>
        <button onClick={handleStopMessage}>Stop worker</button>
      </div>
    </div>
  )
}

export default HelloWorld