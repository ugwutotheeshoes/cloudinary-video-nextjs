"use client"
import React, { useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('inputFile', file);
    console.log(formData);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success, such as updating UI or showing a success message
        const data = await response.json();
        setUrl(data.url)
        console.log('File uploaded successfully:', data.url);
      } else {
        // Handle error, such as displaying an error message to the user
        console.error('Upload failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error uploading file:', error);
    }
  };
  return (
    <main className='min-h-screen flex-col items-center justify-between p-10'>
      <h1 className='text-xl font-bold text-center pb-10'>How to upload a video to Cloudinary in Next.js App Router</h1>
      <div className="flex justify-center mt-10 items-center">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button className='bg-blue-800 text-white p-2 rounded-md' onClick={handleUpload}>Upload</button>
      </div>
      <div>
        {url && <CldVideoPlayer width="860" height="470" src={url} />}
      </div>
    </main>
  );
}
