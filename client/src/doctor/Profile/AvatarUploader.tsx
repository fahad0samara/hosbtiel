import React, { useEffect, useState } from 'react'
import { useLogIN } from '../../../ContextLog'
import { AiFillCamera } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import avatar from '../../assets/avatar.png'

function AvatarUploader() {
 const { Doctor, setDoctor } = useLogIN()
 const [selectedFile, setSelectedFile] = useState(null)
 const [isUploading, setIsUploading] = useState(false)
 const [uploadMessage, setUploadMessage] = useState('')
 const [uploadSuccess, setUploadSuccess] = useState(false)

 const [imageLoaded, setImageLoaded] = useState(false)

 async function handleUpload() {
  if (!selectedFile) {
   return
  }

  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(selectedFile.type, selectedFile.name.split('.').pop())) {
   setUploadMessage('Invalid file type. Only "jpg" and "png" files are allowed.')
   return
  }
  setIsUploading(true)

  const formData = new FormData()
  formData.append('avatar', selectedFile)

  try {
   setIsUploading(true)
   const response = await fetch(`http://localhost:3000/doctor/avatar/${Doctor._id}`, {
    method: 'POST',
    body: formData,
   })
   const data = await response.json()
   console.log('data', data)

   // Update the Doctor object with the new avatar URL
   setDoctor((prevDoctor) => ({
    ...prevDoctor,
    avatar: data.avatar,
   }))

   // Update the upload success state to true and clear the selected file
   setUploadSuccess(true)
   setSelectedFile(null)

   setUploadMessage('Avatar uploaded successfully.')
   setTimeout(() => {
    setUploadMessage('')
   }, 3000)
  } catch (error) {
   console.error(error)
   setUploadMessage('An error occurred while uploading the avatar.', error)
  } finally {
   setIsUploading(false)
  }
 }

 function handleFileChange(event) {
  const file = event.target.files[0]

  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
   alert('Invalid file type. Only "jpg" and "png" files are allowed.')
   return
  }

  setSelectedFile(file)

  // Reset the upload success state to false when a new file is selected
  setUploadSuccess(false)

  // Set the avatar image to the selected file using URL.createObjectURL
  const imageUrl = URL.createObjectURL(file)
  setDoctor((prevDoctor) => ({
   ...prevDoctor,
   avatar: imageUrl,
  }))

  // Set a timer to release the URL when the component unmounts
  setTimeout(() => {
   URL.revokeObjectURL(imageUrl)
  }, 10000)

  // Check if the user has not yet clicked the upload button
  // and display the upload button
  if (!uploadSuccess) {
   setUploadMessage('Click the upload button to save the avatar.')
  }

  // Reset the upload message after 3 seconds
  setTimeout(() => {
   setUploadMessage('')
  }, 3000)
 }

 useEffect(() => {
  // set imageLoaded to true when the image has finished loading
  if (Doctor.avatar) {
   const img = new Image()
   img.src = Doctor.avatar
   img.onload = () => {
    setImageLoaded(true)
   }
  }
 }, [Doctor.avatar, Doctor])

 return (
  <div className="flex flex-col items-center justify-center">
   <div className="mt-4">
    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="avatar-input" />
   </div>
   <div className="relative ">
    <div className="md:w-48 md:h-48 sm:h-36 sm:w-36 h-28 w-28  mx-auto rounded-full shadow-2xl overflow-hidden">
     {
      // display the default avatar image if no image is selected or loaded
      !imageLoaded || !Doctor.avatar ? (
       <div className="flex justify-center items-center h-full">
        <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
       </div>
      ) : (
       // display the actual image when it has loaded
       <img
        src={selectedFile ? URL.createObjectURL(selectedFile) : Doctor.avatar}
        alt="avatar"
        className="object-cover w-full h-full"
       />
      )
     }
    </div>
    <label
     htmlFor="avatar-input"
     className="cursor-pointer
          hover:bg-cyan-100
          hover:text-black
           absolute bottom-0 right-0 bg-cyan-300 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2"
    >
     <AiFillCamera />
    </label>
    {selectedFile && !uploadSuccess && (
     <button
      onClick={handleUpload}
      className="cursor-pointer absolute bottom-0 right-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2"
     >
      {isUploading ? <FaSpinner className="animate-spin" /> : 'Upload'}
     </button>
    )}
   </div>
   {isUploading && <p className="text-blue-500 font-bold ">Uploading avatar...</p>}
   {uploadSuccess && ( // render the success message only when the upload was successful
    <p className="text-green-500 font-bold">{uploadMessage}</p>
   )}

   {!uploadSuccess &&
    uploadMessage && ( // render the error message only if upload was not successful
     <p className="text-red-500 font-bold">{uploadMessage}</p>
    )}
  </div>
 )
}

export default AvatarUploader
