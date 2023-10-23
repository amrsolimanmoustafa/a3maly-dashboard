import { TemplateScheme, TypeOptionsTemplateField, TypeTemplateField, TypeTextTemplateField } from '@/@types/scheme';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Box, TextField, Tooltip, IconButton, InputBase, Card, Button, Autocomplete, Menu, MenuItem, Divider, Typography, Stack } from "@mui/material"
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form"
import Tabs from './Tabs';

const Scheme = ({
  data,
}: {
  data: TemplateScheme | null;
}) => {
  const { register, unregister, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
    // resolver: zodResolver(zodValidationSchema),
  });
  console.log("column", data);

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

  // data?.map((scheme: { ar: string }, index: number) => (
  //                 <Box marginY={3} key={index}>
  //                   <Controller
  //                     name={`schemes[${index}].ar`}
  //                     control={control}
  //                     defaultValue={scheme.ar}
  //                     render={({ field }) => (
  //                       <TextField
  //                         {...field}
  //                         label={`Arabic Scheme ${index + 1}`}
  //                         fullWidth
  //                         multiline
  //                         minRows={3}
  //                       />
  //                     )}
  //                   />
  //                 </Box>
  //               ))
  // const textTemplate = new TextTemplateField(
  //   'Product Name', // label_en
  //   'اسم المنتج', // label_ar
  //   'product_name', // name
  //   'Product Name', // placeholder_en
  //   'اسم المنتج', // placeholder_ar
  //   {
  //     required: true,
  //     minLength: 3,
  //     maxLength: 8,
  //     minRows: 0, // You can adjust this value
  //   }
  // );
  //
  // const [templateFields, setTemplateFields] = useState<{
  //   type: "text" | "options";
  // }[]>([]);
  //
  // useEffect(() => {
  //   setTemplateFields(data?.fields || [])
  // }, [data])
  //
  // const { state, render } = useTemplateField(data?.fields || [])
  // console.log("data?.fields", data?.fields)
  //
  // console.log("data", data)
  const [anchorEl, setAnchorEl] = useState<any>(null);
  // const [fields, setFields] = useState<(typeof availableFields | TextTemplateField | OptionsTemplateField)[] | []>([]);
  const [fields, setFields] = useState<(TextTemplateField | OptionsTemplateField | typeof availableFields[number])[] | []>([]);

  useEffect(() => {
    // @ts-ignore
    setFields(data?.fields || [])
  }, [data])

  const availableFields = [{
    type: "small_text",
    label: dictionary("Small Text Field"),
  },
  {
    type: "large_text",
    label: dictionary("Large Text Field"),
  },
  {
    type: "options",
    label: dictionary("Options"),
  }] as const

  const addNewField = (field: typeof availableFields[number]) => {
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
            <MenuItem key={index} onClick={() => addNewField(field)}>
              {field.label}
            </MenuItem>
          ))
          }
        </Menu>
        <Stack spacing={2} marginY={3}>
          {fields.map((field, index: number) => {
            return (
              <Grid item xs={12} key={index}>
                {field.type === "small_text" && controlledTextField({ field, control })}
                {field.type === "large_text" && controlledTextField({ field, control })}
                {field.type === "options" && controlledOptionsField({ field, control })}
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

const TemplateFieldComponentWrapper = ({ children, label }: { children: JSX.Element, label: TranslatedWord }) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        padding: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        {dictionary(label)}
      </Typography>
      {children}
    </Card>
  )
}


function controlledTextField({ field, control }: any) {
  return (
    <TemplateFieldComponentWrapper
      label={field.label}
    >
      <Controller
        name={"Label name"}
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 8,
        }}
        render={({ field, fieldState }) => (
          <Grid item xs={12}
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
            }}

          >
            <TextField
              {...field}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.invalid
                ? dictionary("Minimum 8 characters")
                : ""}
              required
              label={dictionary("Field Name")}
            />
            <TextField
              {...field}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.invalid
                ? dictionary("Minimum 8 characters")
                : ""}
              required
              label={dictionary("Field Description")}
            />
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