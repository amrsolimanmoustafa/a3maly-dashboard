import { TemplateScheme, TypeOptionsTemplateField, TypeTemplateField, TypeTextTemplateField } from '@/@types/scheme';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Box, TextField, Tooltip, IconButton, InputBase, Card, Button, Autocomplete, Menu, MenuItem, Divider, Typography, Stack, Switch, Checkbox, FormControlLabel } from "@mui/material"
import { useEffect, useState } from 'react';
import { Controller, Field, useForm } from "react-hook-form"
import Tabs from './Tabs';

// export type TypeField = {
//   type: "small_text" | "large_text" | "options";
//   label: TranslatedWord;
//   name: string;
// }

const Scheme = ({
  data,
}: {
  data: TemplateScheme | null;
}) => {
  const { register, unregister, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
    // resolver: zodResolver(zodValidationSchema),
  });

  interface TemplateField {
    label_ar: string;
    label_en: string;
    name: string;
    placeholder_ar: string;
    placeholder_en: string;
  }

  interface TextTemplateField extends TemplateField {
    type: "small_text" | "large_text";
    validation: {
      required: boolean;
      minLength?: number;
      maxLength?: number;
      minRows?: number;
    };
  }

  interface OptionsTemplateField extends TemplateField {
    type: "options";
    validation: {
      required: boolean;
    };
    options: string[];
  }

  type TemplateTextVariant = {
    ar: string;
    en: string;
  }

  type TemplateScheme = {
    template_text_variants: TemplateTextVariant[];
    fields: (TextTemplateField | OptionsTemplateField)[];
  }

  const templateScheme: TemplateScheme = {
    template_text_variants: [
      {
        ar: "هذا المنتج يسمى {{product_name}} وهو {{product_description}} وهو لـ {{target_audience}}",
        en: "this product is called {{product_name}} and it is {{product_description}} and it is for {{target_audience}}",
      },
    ],
    fields: [
      {
        type: "small_text",
        label_en: "Product Name",
        label_ar: "اسم المنتج",
        name: "product_name",
        placeholder_ar: "اسم المنتج",
        placeholder_en: "Product Name",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 8,
        },
      },
      {
        type: "large_text",
        label_en: "Product Description",
        label_ar: "وصف المنتج",
        name: "product_name",
        placeholder_ar: "وصف المنتج",
        placeholder_en: "Product Description",
        validation: {
          required: true,
          minLength: 24,
          maxLength: 300,
        },
      },
      {
        type: "options",
        label_en: "Target Audience",
        label_ar: "الجمهور المستهدف",
        name: "target_audience",
        placeholder_ar: "الجمهور المستهدف",
        placeholder_en: "Target Audience",
        validation: {
          required: false,
        },
        options: ["Option 1", "Option 2"],
      },
    ],
  };

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [fields, setFields] = useState<TemplateScheme["fields"] | []>([]);

  useEffect(() => {
    // @ts-ignore
    setFields(data?.fields || [])
  }, [data])


  const getCountOfElements = (type: TemplateScheme["fields"][number]["type"]) => {
    const count = fields.filter((field) => field.type === type).length
    return count
  }


  const availableFields: {
    type: TemplateScheme["fields"][number]["type"],
    label: TranslatedWord,
    name: string,
  }[] =
    [{
      type: "small_text",
      label: "Small Text Field",
      name: "small_text_" + getCountOfElements("small_text"),
    },
    {
      type: "large_text",
      label: "Large Text Field",
      name: "large_text_" + getCountOfElements("large_text"),
    },
    {
      type: "options",
      label: "Options",
      name: "options_" + getCountOfElements("options"),
    }]

  const addNewField = (field: TemplateScheme["fields"][0]) => {
    setFields([...fields, field])
    setAnchorEl(null);
  }

  return (
    <>
      <Grid item xs={12} marginBottom={1}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ borderRadius: 0.5 }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {dictionary("Add") + " " + dictionary("Field")}
        </Button>
        <Menu
          id="simple-menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {availableFields.map((field, index: number) => (
            // @ts-ignore
            <MenuItem key={index} onClick={() => addNewField(field)}>
              {dictionary(field.label)}
            </MenuItem>
          ))
          }
        </Menu>
        <Stack spacing={2} marginY={3}>
          {fields.map((field, index: number) => {
            const onClose = () => setFields(fields.filter((_, i) => i !== index))
            return (
              <Grid item xs={12} key={index}>
                {field.type === "small_text" && controlledTextField({ field, control, onClose })}
                {field.type === "large_text" && controlledTextField({ field, control, onClose })}
                {field.type === "options" && controlledOptionsField({ field, control, onClose })}
              </Grid>
            )
          })}
        </Stack>
        <Tabs
          tabs={[
            {
              id: "ar",
              label: "Arabic",
              value: "ar",
              content: <></>
            },
            {
              id: "en",
              label: "English",
              value: "en",
              content: <>
                <Box marginY={3}>
                  asd
                </Box>
              </>
            },
          ]}
          sideButtons={[
            {
              button: (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Tooltip
                      sx={{
                        borderRadius: "50%",
                      }}
                      arrow
                      title="Add Scheme"
                    >
                      <IconButton onClick={() => { }}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ),
            }
          ]}
        />
      </Grid>
    </>

  )
}

export default Scheme

import CloseIcon from '@mui/icons-material/Close'; // Import the "X" icon
import CopyToClipboardButton from './CopyToClipboardButton';
import StyledCodeBlock from './CodeBlock';

const TemplateFieldComponentWrapper = ({ children, label, onClose, name }: {
  children: JSX.Element,
  label: TranslatedWord,
  name: string,
  onClose?: () => void
}) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        padding: 2,
        border: "1px solid #e0e0e0",
        position: 'relative',
      }}
    >
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          background: '#fff',
          padding: 1,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        <CloseIcon sx={{ fontSize: 16 }} color="primary" />
      </Box>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        {dictionary(label)}
      </Typography>
      {children}
      <StyledCodeBlock
        code={`{{${name}}}`}
      />
    </Card>
  );
};

function controlledTextField({ field, control, onClose }: {
  field: TypeTextTemplateField,
  control: any,
  onClose?: () => void,
  largeText?: boolean,
}) {
  const prevValue = field

  const createTextInput = ({
    name,
    label,
    defaultValue,
    inputType = "text",
    required = true,
  }: {
    name: string,
    label: TranslatedWord,
    inputType?: "text" | "number",
    defaultValue?: string | number,
    required?: boolean,
  }) =>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required,
        minLength: 3,
        maxLength: 12,
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          required={required}
          type={inputType}
          error={fieldState.invalid}
          helperText={fieldState.invalid
            ? dictionary("Minimum 8 characters")
            : ""}
          label={dictionary(label)}
        />
      )}
    />

  const baseTextField = {
    label_ar: createTextInput({
      name: field.name + "_label_ar",
      label: "Name in Arabic",
      defaultValue: prevValue?.label_ar ?? "",
    }),
    label_en: createTextInput({
      name: field.name + "_label_en",
      label: "Name in English",
      defaultValue: prevValue?.label_en ?? "",
    }),
    placeholder_ar: createTextInput({
      name: field.name + "_placeholder_ar",
      label: "Placeholder in Arabic",
      defaultValue: prevValue?.placeholder_ar ?? "",
      required: false,
    }),
    placeholder_en: createTextInput({
      name: field.name + "_placeholder_en",
      label: "Placeholder in English",
      defaultValue: prevValue?.placeholder_en ?? "",
      required: false,
    }),
  }

  const validationTextField = ({
    required,
    minLength,
    maxLength,
  }: {
    required: boolean,
    minLength?: number,
    maxLength?: number,
  }) => ({
    validation: {
      required: <Controller
        name={"required"}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            sx={{
            }}
            label={dictionary("Is Required")}
            control={<Checkbox defaultChecked />}
          />
        )}
      />,
      minLength: createTextInput({
        name: field.name + "_minLength",
        label: "Minimum Characters",
        defaultValue: prevValue?.validation?.minLength ?? minLength,
        inputType: "number",
      }),
      maxLength: createTextInput({
        name: field.name + "_maxLength",
        label: "Maximum Characters",
        defaultValue: prevValue?.validation?.maxLength ?? maxLength,
        inputType: "number",
      }),
    }
  })

  const smallTextField = {
    ...baseTextField,
    ...validationTextField({
      required: true,
      minLength: 3,
      maxLength: 8,
    })
  }

  const largeTextField = {
    ...baseTextField,
    ...validationTextField({
      required: true,
      minLength: 24,
      maxLength: 300,
    })
  }

  const isSmallTextField = field.type === "small_text"
  const chooseTextField = isSmallTextField ? smallTextField : largeTextField

  return (
    <TemplateFieldComponentWrapper
      label={isSmallTextField ? "Small Text Field" : "Large Text Field"}
      name={field.name}
      onClose={onClose}
    >
      <Controller
        name={field.name}
        control={control}
        render={({ field: fieldProps, fieldState }) => (
          <Grid item xs={12}
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
            }}
          >
            {chooseTextField.label_ar}
            {chooseTextField.label_en}
            {chooseTextField.placeholder_ar}
            {chooseTextField.placeholder_en}
            {chooseTextField.validation.minLength}
            {chooseTextField.validation.maxLength}
            {chooseTextField.validation.required}
          </Grid>
        )}
      />
    </TemplateFieldComponentWrapper>
  )
}
function controlledOptionsField(control: any) {
  return "controlledOptionsField"
}
// const CreateTextTemplateField = (props: TypeTextTemplateField) => {
//   return useTemplateField(props)
// }
//
// const CreateOptionsTemplateField = (props: TypeOptionsTemplateField) => {
//   return useTemplateField(props)
// }