import { useCallback, useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";

export default function RefImageUpload() {
  const [paths, setPaths] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <Dropzone
        onDrop={(acceptedFiles: File[]) => {
          setPaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
        }}
      >
        {(dropzone: DropzoneState) => (
          <div className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-lg">
            {dropzone.isDragAccept ? (
              <div className="text-sm font-medium">Бросьте генплан сюда</div>
            ) : (
              <div className="flex items-center flex-col gap-1.5">
                <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
                  Нажмите чтобы загрузить или перетащите генплан
                </div>
              </div>
            )}
            <div className="text-xs text-gray-400 font-medium">
              {/* {paths.length === 0
                ? "Генплан не загружен"
                : "Генплан успешно загружен"} */}
              Генплан не загружен
            </div>
          </div>
        )}
      </Dropzone>
      {paths.map((path) => (
        <img key={path} src={path} alt="" />
      ))}
    </div>
  );
}
