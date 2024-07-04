import { coords } from "../assets/types"

export default function Input(  ) {

  //Get functions from lon and lat inputs after submit
  //use input values within setfunctions

  return (
    <form action="submit" className="p-2 flex flex-row justify-evenly w-full">
      <input placeholder="Latitude" className='w-32 px-2 p-1 rounded-md border' type="number"/>
      <input placeholder="Longitude" className='w-32 px-2 p-1 rounded-md border' type="number"/>
    </form>
  )
}
