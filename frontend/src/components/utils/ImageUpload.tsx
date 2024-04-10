import React, { useState } from "react";
import Loader from "./Loader";

interface DragAndDropImageUploadProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const DragAndDropImageUpload: React.FC<DragAndDropImageUploadProps> = ({
  setImage,
}) => {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file size is under 1 MB
    if (file.size > 1 * 1024 * 1024) {
      setError("Image size should be under 1 MB.");
      return;
    }

    setLoading(true); // Set loading state to true while uploading
    setError(undefined); // Clear any previous error
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      setUploaded(true);
      setPreviewUrl(result);
      setLoading(false); // Set loading state to false after upload completes
    };
    reader.readAsDataURL(file); // Read the file as a data URL (base64)
  };

  return (
    <div
      className={`border border-dashed border-gray-300 hover:border-rooster-accent animate h-32 flex items-center justify-center p-4 text-center cursor-pointer text-sm ${
        dragging ? "bg-gray-50" : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
        id="file-input"
      />
      <div>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Uploaded"
            className={`mb-4 mx-auto w-12 h-auto ${uploaded ? "" : "hidden"}`}
          />
        )}
        <label htmlFor="file-input">
          {loading ? (
            <Loader />
          ) : uploaded ? (
            <p>
              Image uploaded successfully.{" "}
              <span className="text-rooster-accent border-b cursor-pointer border-rooster-accent">
                Click to upload
              </span>{" "}
            </p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : dragging ? (
            <p>Drop to upload image</p>
          ) : (
            <p>
              <span className="text-rooster-accent border-b border-rooster-accent cursor-pointer">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
          )}
        </label>
      </div>
    </div>
  );
};

export default DragAndDropImageUpload;
