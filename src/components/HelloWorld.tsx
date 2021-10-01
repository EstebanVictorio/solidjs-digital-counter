import { createSignal } from "solid-js"

const HelloWorld = () => {
  const [counter, setCounter] = createSignal(0)

  const handleSubClick = () => {
    setCounter(counter => counter-1)
  }

  const handleAddClick = () => {
    setCounter(counter => counter+1)
  }

  return (
    <div>
      Hello world from SolidJS!
      <div>
        <button onClick={handleSubClick}>
          -
        </button>
        {counter}
        <button onClick={handleAddClick}>
          +
        </button>
      </div>
    </div>
  )
}

export default HelloWorld