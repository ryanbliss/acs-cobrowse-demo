import { DropdownProps } from "@fluentui/react-components";
import { FC } from "react";
import { DropdownInput } from "../common";
import { useLiveState } from "@microsoft/live-share-react";

interface ILiveDropdownMenuProps extends Partial<DropdownProps> {
    uniqueKey: string;
    initialValue?: string;
    options: {
        id: string;
        displayText: string;
    }[];
    label?: string;
}

export const LiveDropdownMenu: FC<ILiveDropdownMenuProps> = ({
    uniqueKey,
    initialValue,
    ...props
}) => {
    const [value, setValue] = useLiveState<string>(
        uniqueKey,
        initialValue || ""
    );
    return (
        <DropdownInput
            id={uniqueKey}
            onDidSelect={setValue}
            value={value}
            {...props}
        />
    );
}
