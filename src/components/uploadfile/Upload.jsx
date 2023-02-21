import { useRef, useState } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

const Upload = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const filesRef = useRef();

  const uploadFiles = async () => {
    if (!uploadFile) return;
    const fileRef = ref(storage, `projectFiles/${uploadFile.name}`);
    filesRef.current.value = "";
    try {
      return await uploadBytes(fileRef, uploadFile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-upload">
        <input
          ref={filesRef}
          className="form-control input"
          id="file"
          type="file"
          placeholder="Realese Date..."
          onChange={() => {
            setUploadFile(filesRef.current.files[0]);
          }}
        />
        <button
          onClick={uploadFiles}
          type="button"
          className="btn btn-primary btn-submit"
        >
          Upload File
        </button>
      </div>
    </>
  );
};

export default Upload;
