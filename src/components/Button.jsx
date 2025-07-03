import { useState } from "react";
export default function Button() {
  const [n, setN] = useState(1);
  return (
    <>
      <p>{n}</p>
      <button onClick={() => setN(n + 1)}>+</button>
    </>
  );
}
