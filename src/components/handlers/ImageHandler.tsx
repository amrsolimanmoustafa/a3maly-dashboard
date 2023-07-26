import { TInput } from "@/@inputs/ConfigDialogInputs";
import {
  FilledInput,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ImageHandlerProps {
  input: TInput;
  handleFileSelect: any;
  styles: any;
  selectedFile?: string | Blob;
}

export const ImageHandler: React.FC<ImageHandlerProps> = ({
  input,
  handleFileSelect,
  styles,
  selectedFile
}) => {
  const { t } = useTranslation();
  return (
    <>
      {input.label && (
        <InputLabel className={styles.inputLabel} id={input.name}>
          {t(input.label)}
        </InputLabel>
      )}
      <FilledInput
        type="file"
        inputProps={{ accept: "image/*" }} // optional: specify accepted file types
        onChange={handleFileSelect}
        hiddenLabel
        name={input.name}
        fullWidth
        required={input.required}
      />
    </>

  )
}