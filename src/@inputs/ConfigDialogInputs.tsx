import React, {ReactElement, useState} from 'react';
import SegmentIcon from '@mui/icons-material/Segment';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import {SxProps} from '@mui/material/styles';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export type IFormTitle =
  | 'Filter'
  | 'Filter Accounting'
  | 'Cash in/out'
  | 'Add Category'
  | 'Add Department'
  | 'Export'
  | 'Edit Category'
  | 'Edit Department'
  | 'AccountFilter'
  | 'Edit Employee'
  | "Add Employee"
  | "Add Cost Center"
  | "Edit Cost"

export type TInput = {
  name?: string;
  label?: string;
  type: string;
  inputType?: string;
  appendList?: any;
  placeholder?: string | undefined;
  value?: any;
  required?: boolean;
  multiline?: boolean | undefined;
  rows?: number | undefined;
  prependIcon?: JSX.Element | undefined;
  options?: any;
  show?: boolean;
  children?: ReactElement | undefined;
  selectIcon?: React.ElementType | undefined;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  onBlur?: (event: any) => void;
  sx?: SxProps;
  disabled?: boolean;
};

export const CreateCategoryInputs = (inputsFor: IFormTitle): TInput[] => {

  const [currencies, setCurrencies] = React.useState([]);
  const [users, setUsers] = React.useState();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [categories, setCategories] = useState<any>();
  const [departments, setDepartments] = useState<any>();
  const [employees, setEmployees] = useState<any>();

  //AccountFilter
  const AccountFilterEpenses = [
    // {
    //   name: 'Status',
    //   label: 'Image',
    //   placeholder: 'Image',
    //   type: 'status',
    //   required: true,
    //   value: null,
    //   prependIcon: <SegmentIcon/>,
    //   statuses: [
    //     {
    //       id: '',
    //       name: 'All'
    //     },
    //     {
    //       id: 0,
    //       name: 'Pending'
    //     },
    //     {
    //       id: 1,
    //       name: 'Reviewed'
    //     },
    //     {
    //       id: 2,
    //       name: 'Approved'
    //     },
    //     {
    //       id: 3,
    //       name: 'Rejected'
    //     },
    //     {
    //       id: 4,
    //       name: 'Exported'
    //     }
    //   ]
    // },
    {
      name: 'FromDate',
      label: 'From',
      type: 'input',
      inputType: 'datetime-local',
      required: false,
      value: '',
      prependIcon: <DateRangeOutlinedIcon/>
    },
    {
      name: 'ToDate',
      label: 'To',
      type: 'input',
      inputType: 'datetime-local',
      required: false,
      value: '',
      prependIcon: <DateRangeOutlinedIcon/>
    },
    {
      name: 'CategoryID',
      label: 'Category',
      type: 'select',
      placeholder: 'Select',
      required: false,
      value: null,
      selectIcon: () => (
        <ContentCopyOutlinedIcon
          style={{
            position: 'absolute',
            color: 'grey',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      ),
      appendList: categories
    },
    {
      name: 'DepartmentID',
      label: 'Department',
      type: 'select',
      placeholder: 'Select',
      required: false,
      selectIcon: () => (
        <ContentCopyOutlinedIcon
          style={{
            position: 'absolute',
            color: 'grey',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      ),
      appendList: departments
    },
    {
      name: 'EmployeeID',
      label: 'Employee Name',
      type: 'select',
      placeholder: 'Select',
      required: false,
      value: null,
      selectIcon: () => (
        <PersonRoundedIcon
          style={{
            position: 'absolute',
            color: 'grey',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      ),
      appendList: employees
    },
    {
      name: 'MissingInfo',
      label: 'Missing Receipt',
      type: 'switch',
      required: false,
      value: false
    }
  ];
  const cashInOut = [
    {
      name: 'userID',
      label: 'Employee',
      type: 'select',
      placeholder: 'Select',
      required: true,
      options: [
        {id: 1, name: 'Ahmed'},
        {id: 2, name: 'Mohamed'}
      ],
      selectIcon: () => (
        <PersonRoundedIcon
          style={{
            position: 'absolute',
            color: 'grey',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      ),
      children: <></>,
      appendList: users
    },
    {
      name: 'transactionType',
      type: 'radio',
      required: true,
      radioButtons: [
        {
          label: 'Cash in',
          value: 'CASH_IN'
        },
        {
          label: 'Cash out',
          value: 'CASH_OUT'
        }
      ],
      sx: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      } as SxProps
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'input',
      required: true,
      value: '',
      prependIcon: <SegmentIcon/>,
      appendList: currencies
    },
    {
      name: 'date',
      label: 'Date',
      type: 'input',
      inputType: 'datetime-local',
      required: true,
      prependIcon: <DateRangeOutlinedIcon/>
    }
  ];

  switch (inputsFor) {
    case 'Filter':
      return AccountFilterEpenses;
    case 'Filter Accounting':
      return AccountFilterEpenses;
    case 'Cash in/out':
      return cashInOut;
    default:
      return cashInOut;
  }
};