import React, { useEffect, useState } from 'react'

const DateTime = () => {
     const [datetime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();

    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    setDateTime(` ${formattedDate}- ${formattedTime}`);
  }, []);
  return (
    <>
    
    <h2 className="text-sm text-bold text-[#0edada77]">{datetime}</h2>
    </>
  )
}

export default DateTime