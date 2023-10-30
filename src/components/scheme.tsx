import { TypeOptionsTemplateField, TypeTextTemplateField } from '@/@types/scheme';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import Tabs from './Tabs';

const Scheme = ({
  field,
}: {
  // data: TemplateScheme | null;
  field: ControllerRenderProps<FieldValues, string>;
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

  const [textVariants, setTextVariants] = useState<TemplateTextVariant[]>([])
  const removeTextVariant = (index: number) => {
    setTextVariants(textVariants.filter((_, i) => i !== index))
  }

  const addNewTextVariant = () => {
    setTextVariants([...textVariants, {
      ar: "",
      en: "",
    }])
  }

  useEffect(() => {
    // @ts-ignore
    setFields(field?.value?.fields ?? [])
    setTextVariants(field?.value?.template_text_variants ?? [])
  }, [field?.value])

  // const schemes = getValues()
  // console.log(schemes)

  const createTextInput = ({
    name,
    label,
    defaultValue,
    inputType = "text",
    required = true,
    minRows = 3,
    multiline = false
  }: {
    name: string;
    label?: TranslatedWord;
    inputType?: "text" | "number";
    defaultValue?: string | number;
    required?: boolean;
    minRows: number;
    multiline: boolean;
  }) => (
    <Controller
      name={`${name}`}
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
          helperText={fieldState.invalid ? "Minimum 3, Maximum 12 characters" : ""}
          multiline={multiline}
          label={label ? dictionary(label) : ""}
          minRows={minRows}
        />
      )}
    />
  );


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
              content:
                <>
                  {textVariants.map((variant, index) => (
                    <Box key={index} marginY={3}>
                      <TemplateFieldComponentWrapper
                        label='Scheme'
                        name={`template_text_variants[${index}].ar`}
                        onClose={() => removeTextVariant(index)}
                        codeBlock={false}
                      >
                        {
                          createTextInput({
                            name: `template_text_variants[${index}].ar`,
                            defaultValue: variant.ar,
                            required: false,
                            inputType: "text",
                            minRows: 3,
                            multiline: true
                          })
                        }
                      </TemplateFieldComponentWrapper>
                    </Box>
                  ))}
                </>
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
                      <IconButton onClick={addNewTextVariant}>
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
import StyledCodeBlock from './CodeBlock';

const TemplateFieldComponentWrapper = ({ children, label, onClose, name, codeBlock = true }: {
  children: JSX.Element,
  label: TranslatedWord,
  name: string,
  onClose?: () => void,
  codeBlock?: boolean
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
      {
        codeBlock && (
          <StyledCodeBlock
            code={`{{${name}}}`}
          />

        )
      }
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
    name: string;
    label: TranslatedWord;
    inputType?: "text" | "number";
    defaultValue?: string | number;
    required?: boolean;
  }) => (
    <Controller
      name={`${field.name}.${name}`}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required,
        minLength: 3,
        maxLength: 12, // You can adjust the maximum length as needed
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          required={required}
          type={inputType}
          error={fieldState.invalid}
          helperText={fieldState.invalid ? "Minimum 3, Maximum 12 characters" : ""}
          label={dictionary(label)}
        />
      )}
    />
  );

  const baseTextField = {
    label_ar: createTextInput({
      name: "label_ar",
      label: "Name in Arabic",
      defaultValue: prevValue?.label_ar ?? "",
    }),
    label_en: createTextInput({
      name: "label_en",
      label: "Name in English",
      defaultValue: prevValue?.label_en ?? "",
    }),
    placeholder_ar: createTextInput({
      name: "placeholder_ar",
      label: "Placeholder in Arabic",
      defaultValue: prevValue?.placeholder_ar ?? "",
      required: false,
    }),
    placeholder_en: createTextInput({
      name: "placeholder_en",
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
        defaultValue={(prevValue?.validation?.required === 1 ? true : false) ?? true}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            label={dictionary("Is Required")}
            control={<Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
            />}
          />
        )}
      />,
      minLength: createTextInput({
        name: "minLength",
        label: "Minimum Characters",
        defaultValue: prevValue?.validation?.minLength ?? minLength,
        inputType: "number",
      }),
      maxLength: createTextInput({
        name: "maxLength",
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
  const choosenTextField = isSmallTextField ? smallTextField : largeTextField

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
            {choosenTextField.label_ar}
            {choosenTextField.label_en}
            {choosenTextField.placeholder_ar}
            {choosenTextField.placeholder_en}
            {choosenTextField.validation.minLength}
            {choosenTextField.validation.maxLength}
            {choosenTextField.validation.required}
          </Grid>
        )}
      />
    </TemplateFieldComponentWrapper>
  )
}

function controlledOptionsField({ field, control, onClose }: {
  field: TypeOptionsTemplateField,
  control: any,
  onClose?: () => void,
}) {
  const prevValue = field;


  const createTextInput = ({
    name,
    label,
    defaultValue,
    inputType = "text",
    required = true,
  }: {
    name: string;
    label: TranslatedWord;
    inputType?: "text" | "number";
    defaultValue?: string | number;
    required?: boolean;
  }) => (
    <Controller
      name={`${field.name}.${name}`}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required,
        minLength: 3,
        maxLength: 12, // You can adjust the maximum length as needed
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          required={required}
          type={inputType}
          error={fieldState.invalid}
          helperText={fieldState.invalid ? "Minimum 3, Maximum 12 characters" : ""}
          label={dictionary(label)}
        />
      )}
    />
  );


  const createOptionsInput = ({
    name,
    label,
    defaultValue,
  }: {
    name: string;
    label: TranslatedWord;
    defaultValue?: string[];
  }) => (
    <Controller
      name={`${field.name}.${name}`}
      control={control}
      defaultValue={defaultValue}
      render={({ field: controlField, fieldState }) => (
        <Stack spacing={2}>
          {controlField.value.map((option: string, index: number) => (
            createTextInput({
              name: "option_" + index,
              label: "Option",
              defaultValue: option,
              required: false,
            })
          ))}
          <Button
            color="primary"
            variant="contained"
            sx={{ borderRadius: 0.5 }}
            onClick={() => controlField.onChange([...controlField.value, ""])}
          >
            {dictionary("Add") + " " + dictionary("Option")}
          </Button>
        </Stack>

      )}
    />
  );

  const baseOptionsField = {
    label_ar: createTextInput({
      name: "label_ar",
      label: "Name in Arabic",
      defaultValue: prevValue?.label_ar ?? "",
    }),
    label_en: createTextInput({
      name: "label_en",
      label: "Name in English",
      defaultValue: prevValue?.label_en ?? "",
    }),
    options: createOptionsInput({
      name: "options",
      label: "Options",
      defaultValue: prevValue?.options || [],
    }),
  };

  return (
    <TemplateFieldComponentWrapper
      label="Options"
      name={field.name}
      onClose={onClose}
    >
      <Controller
        name={field.name}
        control={control}
        render={({ field: fieldProps, fieldState }) => (
          <Stack spacing={2}>
            <Grid item xs={12}
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              {baseOptionsField.label_ar}
              {baseOptionsField.label_en}
            </Grid>
            <Divider />
            {baseOptionsField.options}
          </Stack>
        )}
      />
    </TemplateFieldComponentWrapper>
  );
}