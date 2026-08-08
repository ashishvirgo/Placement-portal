import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Instructions = () => {
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Exam Instructions
        </h1>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>The exam duration is limited. Timer will start once you begin.</li>
          <li>Each question carries equal marks.</li>
          <li>Do not refresh or close the browser during the test.</li>
          <li>Use the question palette to navigate between questions.</li>
          <li>Green indicates attempted, red indicates not attempted.</li>
          <li>Calculator is available for calculations.</li>
          <li>Once submitted, you cannot change answers.</li>
        </ul>

        {/* Agree Checkbox */}
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label>I have read and understood the instructions</label>
        </div>

        {/* Start Button */}
        <button
          disabled={!agreed}
          onClick={() => navigate('/exam')}
          className={`w-full mt-4 py-2 rounded ${
            agreed
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Start Test
        </button>
      </div>

    </div>
  )
}

export default Instructions