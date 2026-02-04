// import { uploadImageAction } from "@/components/map/components/georeference/action";
import Image from "next/image";
import { useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";

export default function RefImageUpload() {
  const [paths, setPaths] = useState<string[]>([]);
  const [errorUpoading, setErrorUpoading] = useState(false);

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   console.log();
  // }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <Dropzone
        onDrop={(acceptedFiles: File[]) => {
          // setPaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
          const formData = new FormData();
          acceptedFiles.forEach((file) => {
            console.log("file ", file);
            formData.append("file", file); // 'files' is the field name on your server
          });

          console.log(
            "before upload and sending formdata",
            formData.get("file"),
          );

          // Send the formData to your backend
          // fileService.uploadFiles(formData);
          // uploadImageAction(formData)
          //   .then((url: string) => {
          //     console.log(url);
          //   })
          //   .catch(() => {
          //     setErrorUpoading(true);
          //   });

          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((url) => {
              console.log(url);
            })
            .catch(() => {
              setErrorUpoading(true);
            });
        }}
        maxFiles={1}
      >
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
      {errorUpoading && "Ошибка загрузки генплана"}
      {paths.map((path) => (
        <Image key={path} src={path} alt="Генплан для синхронизации с картой" />
      ))}
    </div>
  );
}
