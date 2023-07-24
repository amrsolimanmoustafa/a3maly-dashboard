import React from 'react'
import { format } from 'date-fns';
import {
    Avatar,
    Checkbox,
    Stack,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { MenuButton } from '@/components/button-menu';
import { useRouter } from 'next/router';
import { IUser } from '@/@types/user';


const ClientRow = (
    {
        user,
        selected,
        onSelectOne,
        onDeselectOne,
        handleSuspend,
    }: {
        user: IUser;
        selected: string[];
        onSelectOne?: (id: string) => void;
        onDeselectOne?: (id: string) => void;
        handleSuspend: (id: string) => void;
    }
) => {
    const router = useRouter();
    const isSelected = selected.includes(user.id);
    const created_at = format(Date.parse(user.created_at), "dd/MM/yyyy");
    const deleted_at = user.deleted_at
        ? format(Date.parse(user.deleted_at), "dd/MM/yyyy")
        : null;
    // const [checked, setChecked] = useState(user.deleted_at);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
        handleSuspend(user.id);
    };

    const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
        router.push(`/users-management/users/${user.account}`);
    };

    return (
        <TableRow hover key={user.id} selected={isSelected}>
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isSelected}
                    onChange={(event) => {
                        if (event.target.checked) {
                            onSelectOne?.(user.id);
                        } else {
                            onDeselectOne?.(user.id);
                        }
                    }}
                />
            </TableCell>
            <TableCell>
                <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar src={user.avatar}>{getInitials(user.name)}</Avatar>
                    <Typography variant="subtitle2">{user.name}</Typography>
                </Stack>
            </TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{created_at}</TableCell>
            <TableCell>
                <MenuButton
                    items={[
                        { label: "View", onClick: handleRoute },
                        // { label: "Edit", onClick: handleRoute },
                        // { label: "Delete", onClick: handleRoute },
                    ]}
                />
            </TableCell>
        </TableRow>
    );

}

export default ClientRow