import { GPTModel } from "@/models";
import { Select, SelectProps } from "@chakra-ui/react";

interface ModelSelectProps extends Omit<SelectProps, "onChange"> {
    value: GPTModel;
    options: GPTModel[];
    onChange: (model: GPTModel) => void;
}

const ModelSelect = ({
    value,
    options,
    onChange,
    ...props
}: ModelSelectProps): JSX.Element => {
    return (
        <Select
            variant="filled"
            value={value}
            onChange={(event) => onChange(event.target.value as GPTModel)}
            {...props}
        >
            {options.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </Select>
    );
};

export default ModelSelect;
