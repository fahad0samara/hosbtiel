import React from 'react'

const age = (dateString: string) => {
 const today = new Date()
 const birthDate = new Date(dateString)
 let age = today.getFullYear() - birthDate.getFullYear()
 const m = today.getMonth() - birthDate.getMonth()
 if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  age--
 }
 return age
}

interface AgeDisplayProps {
 date: string
}

const AgeDisplay: React.FC<AgeDisplayProps> = ({ date }) => {
 return (
  <div className="mb-4">
   <label className="block font-bold text-lg mb-2">Age</label>
   <span className="w-full py-2 px-3 text-gray-700 leading-tight rounded-md">{age(date)}</span>
  </div>
 )
}

export default AgeDisplay
