import React from "react";
import styles from "./index.module.css";
import InputHandler from "./handlers/InputHandler";
import SelectHandler from "./handlers/SelectHandler";
import { ImageHandler } from "./handlers/ImageHandler";
import ImagesArrayHandler from "./handlers/ImagesArrayHandler";
import StatusHandler from "./handlers/StatusHandler";
import { SxProps } from "@mui/material/styles";
import { TInput } from "@/@inputs/ConfigDialogInputs";
import MultipleSelect from "./MultipleSelect";

interface CreateElementFromTypeProps {
  input: TInput | null;
  handleFileSelect?: (event: any) => void;
  handleChange: (event: any) => void;
  handleOnSubmit?: (event: any) => void;
  handleOnClose?: (event: any) => void;
  isFormDate?: boolean;
  formData?: FormData | {};
  selectedFile?: string | Blob;
  sx?: SxProps;
}
//
function CreateElementFromType({
  input,
  handleChange,
  handleFileSelect,
  handleOnSubmit,
  handleOnClose,
  isFormDate,
  formData,
  selectedFile,
  sx,
}: CreateElementFromTypeProps) {
  return (
    input && (
      <>
        {input.type === "status" && (
          <StatusHandler input={input} styles={styles} handleChange={handleChange} />
        )}
        {input.type === "imagesArray" && (
          <ImagesArrayHandler input={input} handleChange={handleChange} />
        )}
        {input.type === "input" && (
          <InputHandler formData={formData} input={input} styles={styles} handleChange={handleChange} />
        )}
        {input.type === "email" && (
          <InputHandler  input={input} styles={styles} handleChange={handleChange} />
        )}
        {input.type === "select" && (
          <SelectHandler input={input} styles={styles} handleChange={handleChange} />
        )}
        {input.type === "image" && (
          <ImageHandler
            input={input}
            styles={styles}
            handleFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        )}
        {input.type === "chip-select" && <MultipleSelect label={input.label} styles={styles} name={input.name} handleChange={handleChange} formData={formData ? formData : []} />}
      </>
    )
  );
}

export { CreateElementFromType };