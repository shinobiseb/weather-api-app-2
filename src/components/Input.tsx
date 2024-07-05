import { useState, ChangeEvent, useRef } from 'react'





export default function Input() {

  const handleChange = (setState: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
  
    const value = event.target.value
    const number = parseInt(value)

    setState(number);
  };

  function getCoords() {

    let lat = latRef.current
    let lon = lonRef.current

    console.log(lat, lon)
  }

  const latRef = useRef(null)
  const lonRef = useRef(null)
  const [latInput, setLatInput] = useState(0)
  const [lonInput, setLonInput] = useState(0)

  return (
    <div className='w-full flex flex-row justify-center'>
      <input 
        onChange={handleChange(setLatInput)}
        value={latInput}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        ref={latRef}
        placeholder='Latitude'
      />
      <input 
        onChange={handleChange(setLonInput)}
        value={lonInput}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        ref={lonRef}
        placeholder='Latitude'
      />
      <button onClick={getCoords} className="confirm bg-white px-2 p-1 rounded-md text-black">Confirm</button>
    </div>
  )
}
