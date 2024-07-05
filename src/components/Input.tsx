import { useState } from 'react'

export default function Input() {

  const [latinput, setLatInput] = useState('')

  const handleChange = (event : any) => {
    setLatInput(event.target.value)
  }

  return (
    <div className='w-full flex flex-row justify-center'>
      <input 
        onChange={handleChange}
        value={latinput}
        className='px-2 border-black border w-20 rounded-md text-black' 
        type="number"
        placeholder='Latitude'
      />
      <button className="confirm bg-white px-2 p-1 rounded-md text-black">Confirm</button>
    </div>
  )
}
