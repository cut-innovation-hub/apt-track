import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp } from "../../utils/firebase-config";
import { useToast } from "@chakra-ui/react";
import UploadProgress from "../../components/UploadProgress//UploadProgress";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/solid";

type Props = {
  multiple?: any;
  setPictureForUpload?: any;
  folder_name:string,
  bg_color?: string
};

function UploadImage({ multiple, setPictureForUpload, folder_name, bg_color }: Props) {
  const [pictureAsset, setPictureAsset] = useState<any>(null);
  const [picture_loading, setPictureLoading] = useState(false);
  const [progress, setProgress] = useState(1);
  const toast = useToast();

  const storage = getStorage(firebaseApp);

  const upload_picture_Handler = async (e: any) => {
    setPictureLoading(true);
    const pictureFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${folder_name}/${Date.now()}-${pictureFile.name}`
    );
    try {
      const uploadTask = uploadBytesResumable(storageRef, pictureFile);
      //@ts-ignore
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(uploadProgress);
        },
        (error) => {
          console.log(error);
          setPictureLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPictureAsset(downloadURL);
            setPictureForUpload(downloadURL);
            setPictureLoading(false);
            toast({
              title: "Upload Finished.",
              status: "success",
              position: "top-right",
              duration: 5000,
              isClosable: true,
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
      setPictureLoading(false);
    }
  };

  const deletePicture = () => {
    const deleteRef = ref(storage, pictureAsset);
    deleteObject(deleteRef)
      .then(() => {
        setPictureAsset(null);
        setPictureForUpload('')
        toast({
          title: "Picture Removed.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-group w-full">
      {picture_loading ? (
        <>
          <UploadProgress progress={progress} />
        </>
      ) : (
        <>
          {pictureAsset ? (
            <div className={`${bg_color ? 'bg-white ' : "bg-gray-100 " } flex flex-col items-center relative rounded-lg p-1 `}>
              <div
                onClick={deletePicture}
                className="span absolute top-5 rounded-lg right-5 text-red-600 cursor-pointer hover:text-red-700"
              >
                <TrashIcon height={24} width={24} className="" />
              </div>
              <Image
                height={300}
                width={300}
                src={pictureAsset}
                objectFit="contain"
                className="rounded"
              />
            </div>
          ) : (
            <>
              <div className={`${bg_color ? bg_color : "bg-gray-100 "} px-4 py-5  rounded shadow w-full`}>
                <div className="mx-auto rounded-lg overflow-hidden max-w-xl">
                  <div className="md:flex">
                    <div className="w-full p-3">
                      <div
                        className={` cursor-pointer relative h-20 rounded-lg border-dashed border-2 border-gray-300 flex justify-center items-center `}
                      >
                        <div className="absolute">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex flex-col items-center">
                            <span className="block text-gray-400 font-normal">
                              Select Picture
                            </span>{" "}
                          </div>
                        </div>
                        {multiple ? (
                          <input
                            onChange={upload_picture_Handler}
                            type="file"
                            className="h-full w-full opacity-0"
                            name=""
                            multiple
                          />
                        ) : (
                          <input
                            onChange={upload_picture_Handler}
                            type="file"
                            className="h-full w-full opacity-0"
                            name=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default UploadImage;
