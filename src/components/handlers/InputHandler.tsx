import { TInput } from "@/@inputs/ConfigDialogInputs";
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Box,
  Grid

} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface InputHandlerProps {
  input: TInput;
  handleChange: any;
  styles: any;
  formData?: any;
}

const InputHandler = ({
  input,
  handleChange,
  styles,
  formData
}: InputHandlerProps) => {
  const { t } = useTranslation();
  const getRenderedInput = () => {
    switch (input.label) {
      case "Amount":
      case "Total":
        return (
          <Grid sx={{ width: '100%' }}>
            <OutlinedInput
              id={input.name}
              placeholder={input.placeholder}
              onChange={handleChange}
              name={input.name}
              className={styles.inputInput}
              required={input.required}
              value={formData?.amount}
              type="text"
              inputProps={{
                pattern: "^\\d+(\\.\\d+)?$", // Enforce numbers only pattern
                inputMode: 'numeric', // Show numeric keyboard on mobile devices
              }}
              sx={{ width: '70%',appearance:"textfield"}}

            />
          </Grid>
        )
        break
      case "Date":
        return (
          <OutlinedInput
            multiline={input.multiline}
            rows={input.rows}
            id={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
            name={input.name}
            type={input.inputType}
            fullWidth
            className={styles.inputInput}
            required={input.required}
            style={{ height: '100%' }}
            defaultValue={input.value || ""}
            startAdornment={
              <InputAdornment position="start" >
                {input.prependIcon}
              </InputAdornment>
            }
          />
        )
        break
      case "Email" :
        return (
          <OutlinedInput
            multiline={input.multiline}
            rows={input.rows}
            id={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
            name={input.name}
            disabled={input?.disabled}
            type='email'
            fullWidth
            className={styles.inputInput}
            required={input.required}
            defaultValue={input.value || ""}
            style={{ height: '100%' }}
            startAdornment={
              <InputAdornment position="start" >
                {input && input.prependIcon}
              </InputAdornment>
            }
          />
        )
        break
      default:
        return (
          <OutlinedInput
            multiline={input.multiline}
            rows={input.rows}
            id={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
            name={input.name}
            type={input.inputType}
            fullWidth
            className={styles.inputInput}
            required={input.required}
            defaultValue={input.value || ""}
            style={{ height: '100%' }}
            startAdornment={
              <InputAdornment position="start" >
                {input && input.prependIcon}
              </InputAdornment>
            }
          />
        )
        break
    }
  }

  return (
    <Box>
      {input.label && (
        <InputLabel className={styles.inputLabel} id={input.name}>
          {t(input.label)}
        </InputLabel>
      )}
      {getRenderedInput()}
    </Box>

  )
}

export default InputHandler