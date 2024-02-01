import React, { useState } from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { numRows } from "./utils";

interface ExpandableInputProps extends TextareaProps {
    maxRows: number;
    isSubmitting?: boolean;
}

const ExpandableInput = ({
    isSubmitting = false,
    maxRows,
    ...props
}: ExpandableInputProps) => {
    const [height, setHeight] = useState<number>(1);
    const [value, setValue] = useState<string>("");

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        setHeight(numRows(event.target.value, maxRows));

        if (props.onChange) {
            props.onChange(event);
        }
    };

    // Submit on Enter (or Numpad Enter), but allow linebreak on Shift + Enter
    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (
            !event.shiftKey &&
            (event.key === "Enter" || event.key === "Numpad Enter")
        ) {
            event.preventDefault();
            onSubmit(event);
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (!isSubmitting && value.length > 0) {
            if (props.onSubmit) {
                props.onSubmit(event);
            }
            setValue("");
            setHeight(1);
        }
    };

    return (
        <Textarea
            {...props}
            rows={height}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onSubmit={onSubmit}
            value={value}
            resize="none"
        />
    );
};

export default ExpandableInput;
