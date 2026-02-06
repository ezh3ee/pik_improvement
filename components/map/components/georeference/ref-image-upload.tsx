import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";

export default function RefImageUpload() {
  // const [paths, setPaths] = useState<string[]>([]);
  const [errorUploading, setErrorUploading] = useState<boolean | string>(false);
  const setImagePath = useGeoreferenceStore((state) => state.setImagePath);

  console.log("vercel ENV: ", process.env.NEXT_PUBLIC_VERCEL_ENV);

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   console.log();
  // }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      // throw new Error("Ошибка загрузки генплана");
      throw new Error(res.statusText);
    }

    if (errorUploading) setErrorUploading(false);

    console.log("res before extract json ", res);

    return res.json();
  };

  const handleUpload = async (files: File[]) => {
    try {
      const [url] = await Promise.all(files.map((file) => uploadImage(file)));
      setImagePath(url);
    } catch (error) {
      // setErrorUploading(true);
      if (error instanceof Error) {
        console.error(error.message);
        setErrorUploading(error.message);
      } else {
        console.error(error);
        setErrorUploading(true);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <Dropzone onDrop={handleUpload} maxFiles={1}>
        {(dropzone: DropzoneState) => (
          <div className="flex flex-col  h-full items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-lg">
            {dropzone.isDragAccept ? (
              <div className="text-sm font-medium h-full">
                Бросьте генплан сюда
              </div>
            ) : (
              <div className="flex items-center flex-col gap-1.5 h-full">
                <div className="flex items-center flex-row gap-0.5 text-sm font-medium h-full">
                  Нажмите чтобы загрузить или перетащите генплан
                </div>
              </div>
            )}
            <div className="text-xs text-gray-400 font-medium ">
              Генплан не загружен
            </div>
          </div>
        )}
      </Dropzone>
      {errorUploading && "Ошибка загрузки генплана: " + errorUploading}
    </div>
  );
}
