import {React,useState} from 'react'

const Death = () => {
    const[files,setFiles]=useState([])
    const[toText,setToText]=useState("")
    const[showModal,setShowModal]=useState(false)
    const [currentText, setCurrentText] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const filesHandle = (e) =>{
        setFiles((prevFiles)=>[...prevFiles,...Array.from(e.target.files)])
    }

    const handleAddTextClick = () => {
        setCurrentText("");
        setEditIndex(null);
        setShowModal(true);
      };
    
      const handleSaveText = () => {
        if (!currentText.trim()) return;
        if (editIndex !== null) {
          // Edit existing text
          const updated = [...files];
          updated[editIndex] = { isText: true, content: currentText };
          setFiles(updated);
        } else {
          // Add new text
          setFiles((prevFiles) => [
            ...prevFiles,
            { isText: true, content: currentText },
          ]);
        }
        setShowModal(false);
        setCurrentText("");
        setEditIndex(null);
      };
    
      const handleEditText = (index) => {
        setCurrentText(files[index].content);
        setEditIndex(index);
        setShowModal(true);
      };

  return (
    <div className="h-screen flex flex-col">

      <div className="flex justify-between h-32 mt-6">

        <div className="border-2 border-dashed border-gray-600 rounded-lg w-80 h-20 ml-12 mt-6 bg-gray-50 px-3 py-3 ">
            <span className="font-bold text-xl text-black-600 mr-2">To:</span>
            <input type="text"  
                className=" bg-transparent outline-none text-red-800 font-bold text-xl"
                value={toText}
                onChange={(e)=>setToText(e.target.value)}
            />
        </div>

        <div className="flex justify-start items-center gap-6 flex-1 ml-16">
            <label className="cursor-pointer border-2 border-dashed border-green-400 text-green-600 bg-green-50 rounded-xl w-40 h-20 p-5 hover:bg-green-100 flex items-center flex-col justify-center transition">
                <span className="font-medium">Upload Image</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={filesHandle}/>
            </label>

            <label className="border-2 border-dashed border-gray-400 rounded-lg text-gray-600 w-40 h-20 p-5 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                <span className="font-medium">Upload Video</span>
                <input type="file" accept="video/*" multiple className="hidden" onChange={filesHandle}/>
            </label>

            <button
                onClick={handleAddTextClick}
                className="cursor-pointer border-2 border-dashed border-green-400 text-green-600 bg-green-50 rounded-xl w-40 h-20 p-5 hover:bg-green-100 flex items-center flex-col justify-center transition">
                <span className="font-medium">Text</span>
            </button>

            <button
                className="cursor-pointer border-2 border-dashed border-purple-400 text-purple-600 bg-green-50 rounded-xl w-32 h-20 p-5 ml-8 hover:bg-purple-100 flex items-center flex-col justify-center transition">
            <span className="font-medium text-xl">+</span>
          </button>
        </div>

      </div>



      <div className="flex-2 p-2 grid grid-cols-4 gap-2 ml-10 rounded-lg overflow-y-auto mt-4">

        {files.map((file,index)=>{
            if (file.isText) {
                return (
                  <div
                    key={index}
                    onClick={() => handleEditText(index)}
                    className="w-full h-40 flex items-center justify-center bg-white rounded-lg shadow cursor-pointer p-2 text-center border-2"
                  >
                    <p className="text-gray-700">{file.content}</p>
                  </div>
                );
              }

            const fileURL = URL.createObjectURL(file);
            return file.type.startsWith("image/")?
            
            (
                <img key={index} src={fileURL} alt="preview" className="w-full h-40 object-cover rounded-lg shadow"/>
            )
            :
            (
                <video src={fileURL} alt="preview" key={index} controls className="w-full h-40 object-cover rounded-lg shadow"></video>
            );
        })}
        

        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Edit Text" : "Add Text"}
            </h2>

            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type something..."
            />

            {/* Buttons Row */}
            <div className="flex gap-3">
              {/* Back Button */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setCurrentText("");
                  setEditIndex(null);
                }}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>

              {/* Add / Update Button */}
              <button
                onClick={handleSaveText}
                disabled={!currentText.trim()}
                className={`flex-1 py-2 rounded-lg transition ${
                  currentText.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
        )}






      </div>
    </div>
  )
}

export default Death
