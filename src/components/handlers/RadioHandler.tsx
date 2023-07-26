import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { SxProps } from '@mui/material';
import {
  Typography
} from "@mui/material";
import { TInput } from '@/@inputs/ConfigDialogInputs';

export type TRadioButton = {
  value: string;
  label: string;
  required?: boolean;
}
type TRowRadioButtonsGroupProps = {
  input: TInput | undefined;
  sx?: SxProps;
  handleChange: (event: any) => void;
  label:any
  value: any;
  required?: boolean;
}
export default function RowRadioButtonsGroup({ input, sx, handleChange,label,value,required }: TRowRadioButtonsGroupProps) {
  return (
    input?.radioButtons ?
      <FormControl>
        <Typography color="textPrimary" variant="subtitle1">
          {label}
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={input.name}
          onChange={handleChange}
          sx={sx}
          defaultValue={value}
        >
          {input?.radioButtons.map(({ value, label }, index) => (
            <FormControlLabel
              key={index}
              value={value}
              control={<Radio required={required}/>}
              label={label}
              sx={{
                mr:10,
                '.MuiFormControlLabel-asterisk':{
                  display: 'none !important'
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      :
      null
  );
}