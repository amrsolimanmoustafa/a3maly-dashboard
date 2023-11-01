import { TemplateScheme, TypeOptionsTemplateField, TypeTextTemplateField } from '@/@types/scheme';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { Control, Controller, ControllerRenderProps, FieldValues, RegisterOptions, useForm, UseFormUnregister } from "react-hook-form";
import Tabs from './Tabs';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const Scheme = ({
  parentField,
  parentControl,
  unregister,
}: {
  // data: TemplateScheme | null;
  parentField: ControllerRenderProps<FieldValues, string>;
  parentControl: Control<FieldValues, any>;
  unregister: UseFormUnregister<FieldValues>;
}) => {
  // const { register, unregister, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
  //   // resolver: zodResolver(zodValidationSchema),
  // });

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
      required: number;
      minLength?: number;
      maxLength?: number;
      minRows?: number;
    };
  }

  interface OptionsTemplateField extends TemplateField {
    type: "options";
    validation: {
      required: number;
    };
    options: string[];
  }

  type TemplateTextVariant = {
    id: string;
    ar: string;
    en: string;
  }

  type TemplateScheme = {
    template_text_variants: TemplateTextVariant[];
    fields: (TextTemplateField | OptionsTemplateField)[];
  }

  // const templateScheme: TemplateScheme = {
  //   template_text_variants: [
  //     {
  //       ar: "هذا المنتج يسمى {{product_name}} وهو {{product_description}} وهو لـ {{target_audience}}",
  //       en: "this product is called {{product_name}} and it is {{product_description}} and it is for {{target_audience}}",
  //     },
  //   ],
  //   fields: [
  //     {
  //       type: "small_text",
  //       label_en: "Product Name",
  //       label_ar: "اسم المنتج",
  //       name: "product_name",
  //       placeholder_ar: "اسم المنتج",
  //       placeholder_en: "Product Name",
  //       validation: {
  //         required: true,
  //         minLength: 3,
  //         maxLength: 8,
  //       },
  //     },
  //     {
  //       type: "large_text",
  //       label_en: "Product Description",
  //       label_ar: "وصف المنتج",
  //       name: "product_name",
  //       placeholder_ar: "وصف المنتج",
  //       placeholder_en: "Product Description",
  //       validation: {
  //         required: true,
  //         minLength: 24,
  //         maxLength: 300,
  //       },
  //     },
  //     {
  //       type: "options",
  //       label_en: "Target Audience",
  //       label_ar: "الجمهور المستهدف",
  //       name: "target_audience",
  //       placeholder_ar: "الجمهور المستهدف",
  //       placeholder_en: "Target Audience",
  //       validation: {
  //         required: false,
  //       },
  //       options: ["Option 1", "Option 2"],
  //     },
  //   ],
  // };
  //
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
      // validation: {
      //   required: 1,
      //   minLength: 3,
      //   maxLength: 8,
      // },
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
    // setFields([...fields, field])
    parentField.onChange({
      ...parentField.value,
      fields: [...parentField.value?.fields ?? [], field]
    })

    setAnchorEl(null);
  }

  const [textVariants, setTextVariants] = useState<TemplateTextVariant[]>([])
  const removeTextVariant = (id: string) => {
    parentField.onChange({
      ...parentField.value,
      template_text_variants: [...parentField.value?.template_text_variants ?? []].filter((variant) => variant.id !== id)
    })
  }

  const addNewTextVariant = () => {
    // setTextVariants([...textVariants, {
    //   ar: "",
    //   en: "",
    // }])
    // parentField.onChange({
    //   ...parentField.value,
    //   template_text_variants: [...parentField.value?.template_text_variants ?? [], {
    //     ar: "",
    //     en: "",
    //   }]
    // })
    const newVariants = [...textVariants, {
      id: uuidv4(),
      ar: "",
      en: "",
    }]
    parentField.onChange({
      ...parentField.value,
      template_text_variants: newVariants
    })

  }

  useEffect(() => {
    // @ts-ignore
    setFields(parentField?.value?.fields ?? [])
    setTextVariants(parentField?.value?.template_text_variants ?? [])
  }, [parentField?.value])

  // const schemes = getValues()
  // console.log(schemes)


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
            const onClose = () => {
              parentField.onChange({
                ...parentField.value,
                fields: [...parentField.value?.fields ?? []].filter((_, i) => i !== index)
              })
            }
            const props = {
              name: `${parentField.name}.fields[${index}]`,
              control: parentControl,
              onChange: parentField.onChange,
              onBlur: parentField.onBlur,
              ref: parentField.ref,
              onClose,
              type: field.type,
              defaultValue: field,
              codeBlock: field.name,
            }

            return (
              <Grid item xs={12} key={index}>
                {
                  // @ts-ignore
                  field.type === "small_text" && controlledTextField(props)
                }
                {
                  // @ts-ignore
                  field.type === "large_text" && controlledTextField(props)
                }
                {
                  // @ts-ignore
                  field.type === "options" && controlledOptionsField(props)
                }
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
                        customLabel={`${dictionary("Scheme")} ${1 + index}`}
                        onClose={() => removeTextVariant(variant.id)}
                      >
                        {
                          createTextInput({
                            name: `${parentField.name}.template_text_variants[${index}].ar`,
                            onChange: parentField.onChange,
                            onBlur: parentField.onBlur,
                            ref: parentField.ref,
                            defaultValue: variant.ar,
                            control: parentControl,
                            minRows: 3,
                            multiline: true,
                            rules: {
                              required: true,
                              minLength: 8,
                              maxLength: 500,
                            },
                          })
                        }
                      </TemplateFieldComponentWrapper>
                    </Box>
                  ))}
                </>
              // <Controller
              //   name={`${parentField.name}.template_text_variants`}
              //   control={parentControl}
              //   defaultValue={textVariants}
              //   render={({ field }) => (
              //     <>
              //       {textVariants.map((variant, index) => (
              //         <Box key={index} marginY={3}>
              //           <TemplateFieldComponentWrapper
              //             customLabel={`${dictionary("Scheme")} ${1 + index}`}
              //             onClose={() => removeTextVariant(index)}
              //             codeBlock={false}
              //           >
              //             {
              //               createTextInput({
              //                 name: `${field.name}[${index}].ar`,
              //                 defaultValue: variant.ar,
              //                 onChange: field.onChange,
              //                 onBlur: field.onBlur,
              //                 ref: field.ref,
              //                 control: parentControl,
              //                 minRows: 3,
              //                 multiline: true,
              //                 rules: {
              //                   required: true,
              //                   minLength: 8,
              //                   maxLength: 500,
              //                 },
              //               })
              //             }
              //           </TemplateFieldComponentWrapper>
              //         </Box>
              //       ))}
              //     </>
              //   )}
              // />

            },
            {
              id: "en",
              label: "English",
              value: "en",
              content:
                <>
                  {textVariants.map((variant, index) => (
                    <Box key={index} marginY={3}>
                      <TemplateFieldComponentWrapper
                        customLabel={`${dictionary("Scheme")} ${1 + index}`}
                        onClose={() => removeTextVariant(variant.id)}
                      >
                        {
                          createTextInput({
                            name: `${parentField.name}.template_text_variants[${index}].en`,
                            onChange: parentField.onChange,
                            onBlur: parentField.onBlur,
                            ref: parentField.ref,
                            defaultValue: variant.en,
                            control: parentControl,
                            minRows: 3,
                            multiline: true,
                            rules: {
                              required: true,
                              minLength: 8,
                              maxLength: 500,
                            },
                          })
                        }
                      </TemplateFieldComponentWrapper>
                    </Box>
                  ))}
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
import { stringNumberToBoolean } from './SharedTable/utils';

const TemplateFieldComponentWrapper = ({ children, label = "Small Text Field", onClose, name, codeBlock, customLabel }: {
  children: JSX.Element,
  label?: TranslatedWord,
  customLabel?: string,
  name?: string,
  onClose?: () => void,
  codeBlock?: string,
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
        {customLabel || dictionary(label)}
      </Typography>
      {children}
      {
        codeBlock && (
          <StyledCodeBlock
            code={`{{${codeBlock}}}`}
          />

        )
      }
    </Card>
  );
};

function createTextInput({
  name, label, defaultValue, inputType = "text", minRows = 3, multiline = false, control, rules = {
    required: true,
    minLength: 3,
    maxLength: 28,
  }, onChange, onBlur, ref, invalidHelperText = `Minimum ${rules.minLength}, Maximum ${rules.maxLength} characters`
}: {
  name: string;
  label?: TranslatedWord;
  inputType?: "text" | "number";
  defaultValue?: string | number;
  required?: boolean;
  minRows?: number;
  multiline?: boolean;
  control: Control<FieldValues, any>;
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
  invalidHelperText?: string;
  onChange: ControllerRenderProps<FieldValues, string>["onChange"];
  onBlur: ControllerRenderProps<FieldValues, string>["onBlur"];
  ref?: ControllerRenderProps<FieldValues, string>["ref"];
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      {...{ rules }}
      {...{ onChange, onBlur, ref }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          type={inputType}
          error={fieldState.invalid}
          helperText={fieldState.invalid ? invalidHelperText : ""}
          multiline={multiline}
          label={label ? dictionary(label) : ""}
          minRows={minRows} />
      )} />
  );
}

const createCheckbox = ({
  name,
  label,
  defaultValue,
  control,
  onChange,
  onBlur,
  ref,
}: {
  name: string;
  label: TranslatedWord;
  defaultValue?: boolean | number;
  control: Control<FieldValues, any>;
  onChange: ControllerRenderProps<FieldValues, string>["onChange"],
  onBlur: ControllerRenderProps<FieldValues, string>["onBlur"],
  ref?: ControllerRenderProps<FieldValues, string>["ref"],
}) => {
  console.log(defaultValue, name, "defaultValue")
  return <Controller
    {...{ onChange, onBlur, ref }}
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        {...field}
        label={dictionary(label)}
        control={<Checkbox
          {...field}
          checked={field.value === "1" || field.value === 1}
          // checked={defaultValue === "1"}
          onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
        />}
      />
    )}
  />
}


function controlledTextField({
  name,
  onChange,
  onBlur,
  ref,
  onClose,
  defaultValue,
  type = "small_text",
  control,
  codeBlock,
}: {
  onChange: ControllerRenderProps<FieldValues, string>["onChange"],
  onBlur: ControllerRenderProps<FieldValues, string>["onBlur"],
  ref?: ControllerRenderProps<FieldValues, string>["ref"],
  name: string,
  defaultValue?: TypeTextTemplateField,
  type?: TemplateScheme["fields"][0]["type"],
  control: Control<FieldValues, any>
  codeBlock?: string,
  // control: any,
  onClose?: () => void,
  // largeText?: boolean,
}) {
  const baseTextField = {
    label_ar: createTextInput({
      name: name + ".label_ar",
      label: "Name in Arabic",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.label_ar
    }),
    label_en: createTextInput({
      name: name + ".label_en",
      label: "Name in English",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.label_en
    }),
    placeholder_ar: createTextInput({
      name: name + ".placeholder_ar",
      label: "Placeholder in Arabic",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.placeholder_ar
    }),
    placeholder_en: createTextInput({
      name: name + ".placeholder_en",
      label: "Placeholder in English",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.placeholder_en
    }),
  }

  const validationTextField = ({
    required = 1,
    minLength,
    maxLength,
  }: {
    required: number,
    minLength?: number,
    maxLength?: number,
  }) => ({
    validation: {
      required: createCheckbox({
        name: name + ".validation.required",
        onChange,
        onBlur,
        ref,
        control,
        label: "Is Required",
        defaultValue: stringNumberToBoolean(defaultValue?.validation?.required) ?? required,
      }),
      minLength: createTextInput({
        name: name + ".validation.minLength",
        label: "Minimum Characters",
        control,
        onChange,
        onBlur,
        ref,
        defaultValue: defaultValue?.validation?.minLength ?? minLength,
        inputType: "number",
        rules: {
          required: true,
          minLength: 1,
          maxLength: 8,
        },
      }),
      maxLength: createTextInput({
        name: name + ".validation.maxLength",
        label: "Maximum Characters",
        control,
        onChange,
        onBlur,
        ref,
        defaultValue: defaultValue?.validation?.maxLength ?? maxLength,
        inputType: "number",
        rules: {
          required: true,
          minLength: 1,
          maxLength: 8,
        },
      }),
    }
  })

  const smallTextField = {
    ...baseTextField,
    ...validationTextField({
      required: 1,
      minLength: 3,
      maxLength: 8,
    })
  }

  const largeTextField = {
    ...baseTextField,
    ...validationTextField({
      required: 1,
      minLength: 24,
      maxLength: 300,
    })
  }

  const isSmallTextField = type === "small_text"
  const choosenTextField = isSmallTextField ? smallTextField : largeTextField

  return (
    <TemplateFieldComponentWrapper
      label={isSmallTextField ? "Small Text Field" : "Large Text Field"}
      name={name}
      onClose={onClose}
      codeBlock={codeBlock}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
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

function controlledOptionsField({
  name,
  onChange,
  onBlur,
  ref,
  onClose,
  defaultValue,
  control,
  codeBlock,
}: {
  onChange: ControllerRenderProps<FieldValues, string>["onChange"],
  onBlur: ControllerRenderProps<FieldValues, string>["onBlur"],
  ref?: ControllerRenderProps<FieldValues, string>["ref"],
  name: string,
  defaultValue?: TypeOptionsTemplateField,
  type?: TemplateScheme["fields"][0]["type"],
  control: Control<FieldValues, any>
  codeBlock?: string,
  onClose?: () => void,
}) {
  const prevValue = defaultValue

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
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: controlField, fieldState }) => (
        <Stack spacing={2}>
          {controlField.value.map((option: string, index: number) => (
            createTextInput({
              name: `${controlField.name}[${index}]`,
              label: "Option",
              defaultValue: option,
              required: false,
              control,
              onChange,
              onBlur,
              ref,
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
      name: name + ".label_ar",
      label: "Name in Arabic",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.label_ar
    }),
    label_en: createTextInput({
      name: name + ".label_en",
      label: "Name in English",
      control,
      onChange,
      onBlur,
      ref,
      defaultValue: defaultValue?.label_en
    }),
    options: createOptionsInput({
      name: name + ".options",
      label: "Options",
      defaultValue: prevValue?.options || [],
    }),
  };

  return (
    <TemplateFieldComponentWrapper
      label="Options"
      onClose={onClose}
      codeBlock={codeBlock}
    >
      <Controller
        name={name}
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