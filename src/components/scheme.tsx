import { TemplateScheme } from '@/@types/scheme';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Box, TextField, Tooltip, IconButton } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import Tabs from './Tabs';

const Scheme = ({
  data,
}: {
  data: TemplateScheme[] | null;
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
    type: "text";
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
        type: "text",
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
        type: "text",
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
  return (
    <>

      <Grid item xs={12}>
        <Tabs
          tabs={[
            {
              id: "ar",
              label: "Arabic",
              value: "ar",
              content: <>{data}</>
            },
            {
              id: "en",
              label: "English",
              value: "en",
              content: <>{data}</>
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