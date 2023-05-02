import {
    Dropdown,
    DropdownProps,
    Label,
    Option,
    useId,
} from "@fluentui/react-components";
import { FC, useCallback } from "react";
import { FlexColumn } from "../flex";

interface IDropdownInputProps extends Partial<DropdownProps> {
    id: string;
    value: string | undefined;
    options: {
        id: string;
        displayText: string;
    }[];
    label?: string;
    onDidSelect: (id: string) => void;
}

export const DropdownInput: FC<IDropdownInputProps> = ({
    id,
    value,
    options,
    label,
    onDidSelect,
    ...props
}) => {
    const dropdownId = useId(id);
    const _onOptionSelect: (typeof props)["onOptionSelect"] = (_, data) => {
        if (typeof data.optionValue !== "string") return;
        const id = options.find(
            (option) => option.displayText === data.optionValue
        )?.id;
        if (!id) return;
        console.log(id);
        onDidSelect(id);
    };
    const selectedOption = options.find((option) => option.id === value);
    const selectedOptionValue = selectedOption?.displayText ?? "";
    return (
        <FlexColumn>
            {label && (
                <Label id={dropdownId}>{label}</Label>
            )}
            <Dropdown
                {...props}
                aria-labelledby={dropdownId}
                value={selectedOptionValue}
                onOptionSelect={_onOptionSelect}
            >
                {options.map((option) => (
                    <Option
                        key={option.id}
                        value={option.displayText}
                        text={option.displayText}
                    >
                        {option.displayText}
                    </Option>
                ))}
            </Dropdown>
        </FlexColumn>
    );
};
