import React, {useEffect, useState} from "react";
import {useLogIN} from "../ContextLog";
import {AiFillCamera} from "react-icons/ai";

function AvatarUploader() {
  const {Patient, setPatient} = useLogIN();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  async function handleUpload() {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setIsUploading(true);
      const response = await fetch(
        `http://localhost:3000/user/avatar/${Patient._id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Uploaded avatar:", data.avatar);

      // Update the Patient object with the new avatar URL
      setPatient(prevPatient => ({
        ...prevPatient,
        avatar: data.avatar,
      }));
      setUploadMessage("Avatar uploaded successfully.");
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setUploadMessage("An error occurred while uploading the avatar.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="avatar-input"
        />
        <label
          htmlFor="avatar-input"
          className="cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
          Choose Avatar
        </label>
      </div>
      <div className="relative ">
        <div className="w-48 h-48 bg-gray-100 mx-auto rounded-full shadow-2xl overflow-hidden">
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : Patient.avatar || "/default-avatar.png"
            }
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <label
          htmlFor="avatar-input"
          className="cursor-pointer absolute bottom-0 right-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2"
        >
          <AiFillCamera />
        </label>
        {selectedFile && !uploadSuccess && (
          <button
            onClick={handleUpload}
            className="cursor-pointer absolute bottom-0 right-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2"
          >
            Upload
          </button>
        )}
      </div>
      {isUploading && (
        <p className="text-blue-500 font-bold ">Uploading avatar...</p>
      )}
      {uploadSuccess && ( // render the success message only when the upload was successful
        <p className="text-green-500 font-bold">{uploadMessage}</p>
      )}
      {!uploadSuccess &&
        uploadMessage && ( // render the error message only if upload was not successful
          <p className="text-red-500 font-bold">{uploadMessage}</p>
        )}
    </div>
  );
}

export default AvatarUploader;
