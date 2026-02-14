import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useState } from "react";

export default function useGeorefImageUpload() {
  const [isUploadingError, setUploadingError] = useState<boolean | string>(
    false,
  );
  const setImagePath = useGeoreferenceStore((state) => state.setImagePath);
  const setImageDimensions = useGeoreferenceStore(
    (state) => state.setImageDimensions,
  );

  const uploadImage = async (file: File) => {
    const formData = new FormData();

    const img = new Image(); // fetching image dimensions
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    if (isUploadingError) setUploadingError(false);

    return res.json();
  };

  const handleUpload = async (files: File[]) => {
    try {
      const [url] = await Promise.all(files.map((file) => uploadImage(file)));
      setImagePath(url);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setUploadingError(error.message);
      } else {
        console.error(error);
        setUploadingError(true);
      }
    }
  };

  return { handleUpload, isUploadingError };
}
