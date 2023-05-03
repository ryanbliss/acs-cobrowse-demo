import { FC } from "react";
import { TextInput } from "../common";
import { useLiveState } from "@microsoft/live-share-react";
import { InputProps } from "@fluentui/react-components";

interface ITextInputProps extends Partial<InputProps> {
    uniqueKey: string;
    label: string;
    placeholder: string;
    initialValue?: string;
}

export const LiveTextInput: FC<ITextInputProps> = ({
    uniqueKey,
    initialValue,
    ...props
}) => {
    const [value, setValue] = useLiveState<string>(
        uniqueKey,
        initialValue || ""
    );
    return (
        <TextInput
            id={uniqueKey}
            value={value}
            setValue={setValue}
            {...props}
        />
    );
};
