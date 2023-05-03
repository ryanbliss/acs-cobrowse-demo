import { FC, useCallback } from "react";
import { FlexColumn } from "../flex";
import { Input, InputProps, Label, useId} from "@fluentui/react-components";

interface ITextInputProps extends Partial<InputProps> {
    id: string;
    label: string;
    value?: string;
    setValue?: (newValue: string) => void;
}

export const TextInput: FC<ITextInputProps> = ({ id, label, placeholder, value, setValue }) => {
    const idVal = useId(id);
    const onChange: InputProps["onChange"] = useCallback((_, data) => {
        setValue?.(data.value);
    }, [setValue]);
    return (
        <FlexColumn>
            <Label htmlFor={idVal}>{label}</Label>
            <Input
                id={idVal}
                placeholder={placeholder}
                value={value}
                onChange={!!setValue ? onChange : undefined}
            />
        </FlexColumn>
    )
}
