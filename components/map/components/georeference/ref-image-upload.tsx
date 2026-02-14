import useGeorefImageUpload from "@/components/map/hooks/use-georef-image-upload";
import Dropzone, { DropzoneState } from "shadcn-dropzone";

export default function RefImageUpload() {
  const { handleUpload, isUploadingError } = useGeorefImageUpload();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <Dropzone onDrop={handleUpload} maxFiles={1}>
        {(dropzone: DropzoneState) => (
          <div className="flex flex-col  h-full items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-lg">
            {dropzone.isDragAccept ? (
              <div className="flex items-center flex-col gap-1.5 h-full">
                <div className="flex items-center text-sm font-medium h-[30vh]">
                  Бросьте генплан сюда
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-col gap-1.5 h-full">
                <div className="flex items-center flex-row gap-0.5 text-sm font-medium h-[30vh]">
                  Нажмите, чтобы загрузить генплан или перетащите его сюда
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {/* TODO: нужна нормальная обработка ошибок  */}
      {isUploadingError && "Ошибка загрузки генплана: " + isUploadingError}
    </div>
  );
}
