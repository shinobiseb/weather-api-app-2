import { useState, ChangeEvent } from 'react'

const handleChange = (setState: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
  
  const value = event.target.value
  const number = parseInt(value)

  setState(number);
};

export default function Input() {

  const [latInput, setLatInput] = useState(0)
  const [lonInput, setLonInput] = useState(0)

  

  return (
    <div className='w-full flex flex-row justify-center'>
      <input 
        onChange={handleChange(setLatInput)}
        value={latInput}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        placeholder='Latitude'
      />
      <input 
        onChange={handleChange(setLonInput)}
        value={lonInput}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        placeholder='Latitude'
      />
      <button className="confirm bg-white px-2 p-1 rounded-md text-black">Confirm</button>
    </div>
  )
}
