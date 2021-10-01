import { createMachine, interpret } from "@xstate/fsm"

let interval = null;

let digitalCounter = 0;

const counterMachine = createMachine({
  initial: 'IDLE',
  states: {
    START: { on: { TOGGLE: 'PAUSE', STOP: 'IDLE' } },
    PAUSE: { on: { TOGGLE: 'RESUME', STOP: 'IDLE' } },
    RESUME: { on: { TOGGLE: 'PAUSE', STOP: 'IDLE' } },
    IDLE: { on: { TOGGLE: 'START', STOP: 'IDLE' } },
  }
})

const counter = interpret(counterMachine)
counter.start()

counter.subscribe(({ value }) => {
  console.log("New value: ", value)

  if (['START', 'RESUME'].includes(value)) {
    interval = setInterval(() => {
      postMessage(digitalCounter++)
    }, 1000)
  }

  if(interval && ['IDLE', 'STOP', 'PAUSE'].includes(value)) {
    clearInterval(interval)
  }
})


const handleMessage: EventListener = (event: MessageEvent) => {
  if(event.data === 'STOP') {
    counter.send('STOP')
    postMessage(0)
    digitalCounter = 0
  } else {
    counter.send('TOGGLE')
  }
}

onmessage = handleMessage