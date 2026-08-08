import React, { useState } from 'react'

const Calculator = () => {
  const [input, setInput] = useState('')

  const handleClick = (value) => {
    setInput(input + value)
  }

  const calculate = () => {
    try {
      setInput(eval(input).toString())
    } catch {
      setInput('Error')
    }
  }

  const clear = () => setInput('')

  return (
    <div className="bg-white p-4 rounded-xl shadow w-60">
      <input
        type="text"
        value={input}
        readOnly
        className="w-full mb-2 p-2 border rounded text-right"
      />

      <div className="grid grid-cols-4 gap-2">
        {[7,8,9,'/'].map((btn,i) => (
          <button key={i} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">{btn}</button>
        ))}
        {[4,5,6,'*'].map((btn,i) => (
          <button key={i} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">{btn}</button>
        ))}
        {[1,2,3,'-'].map((btn,i) => (
          <button key={i} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">{btn}</button>
        ))}
        {[0,'.','=','+'].map((btn,i) => (
          <button
            key={i}
            onClick={() => btn === '=' ? calculate() : handleClick(btn)}
            className="p-2 bg-blue-200 rounded"
          >
            {btn}
          </button>
        ))}

        <button
          onClick={clear}
          className="col-span-4 bg-red-400 text-white p-2 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Calculator