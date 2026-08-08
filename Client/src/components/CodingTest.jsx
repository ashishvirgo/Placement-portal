import React, { useState } from 'react'
import axios from 'axios'

const CodingTest = () => {
const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";
  const starterCode = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,

    c: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
    return 0;
}`,

    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`,

    python: `a, b = map(int, input().split())
print(a + b)`,

    // ✅ NEW: JavaScript
    javascript: `// Node.js input handling
process.stdin.on('data', function(data) {
  const [a, b] = data.toString().trim().split(" ").map(Number);
  console.log(a + b);
});`
  }

  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(starterCode["cpp"])
  const [output, setOutput] = useState([])
  const [loading, setLoading] = useState(false)

  const testCases = [
    { input: "5 3", expected: "8" },
    { input: "15 5", expected: "20" }
  ]

  const runCode = async (input) => {
    try {
      const response = await axios.post(
        `${API}/run-code`,
        {
          code,
          language,
          input
        }
      )

      let result = response.data.output || "No Output"
      return result.trim()

    } catch (err) {
      return "Execution Error"
    }
  }

  const handleRun = async () => {
    setLoading(true)
    const results = []

    for (let tc of testCases) {
      const result = await runCode(tc.input)

      results.push({
        ...tc,
        result,
        pass: result.trim() === tc.expected.trim()
      })
    }

    setOutput(results)
    setLoading(false)
  }

  return (
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h1 className="text-xl font-bold mb-3">Coding Problem</h1>
        <p className="mb-4">
          Write a program to take two numbers as input and print their sum.
        </p>

        <h3 className="font-semibold">Sample Test Cases:</h3>
        <ul className="text-sm mt-2">
          {testCases.map((tc, i) => (
            <li key={i}>
              Input: {tc.input} → Output: {tc.expected}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 p-6 flex flex-col">

        {/* Language Select */}
        <select
          value={language}
          onChange={(e) => {
            const selectedLang = e.target.value

            if (code.trim() !== starterCode[language].trim()) {
              const confirmChange = window.confirm(
                "Your current code will be lost. Continue?"
              )
              if (!confirmChange) return
            }

            setLanguage(selectedLang)
            setCode(starterCode[selectedLang])
            setOutput([])
          }}
          className="mb-3 p-2 border rounded"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option> {/* ✅ ADDED */}
        </select>

        {/* Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 border p-3 rounded font-mono"
        />

        {/* Run Button */}
        <button
          onClick={handleRun}
          className="bg-blue-500 text-white p-2 mt-3 rounded"
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        {/* Output */}
        <div className="mt-4 bg-black text-white p-3 h-48 overflow-auto rounded">
          {output.length === 0 ? (
            <p>No output yet</p>
          ) : (
            output.map((res, i) => (
              <div key={i} className="mb-3 flex border-b pb-2">
                <p className='mr-10'>Test Case {i + 1}</p>
                <p className='mr-10'>Input: {res.input}</p>
                <p className='mr-10'>Expected: {res.expected}</p>
                <p className='mr-10'>Output: {res.result}</p>
                <p className={res.pass ? "text-green-400" : "text-red-400"}>
                  {res.pass ? "Passed" : "Failed"}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default CodingTest