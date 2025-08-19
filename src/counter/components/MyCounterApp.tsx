import { useCounter } from '../../shared/hooks'

export const MyCounterApp = () => {
  const { counter, decrement, increment, reset } = useCounter()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>counter: {counter}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
