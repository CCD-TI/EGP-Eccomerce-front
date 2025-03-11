import React from "react";
import { Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";

interface Props {

    value: any;
    onChange: (value: any) => void;
}

export default function CheckboxGroupComponent({

    value,
    onChange,
}: Props) {

    return (
        <div className="flex w-full flex-col gap-2">
            <CheckboxGroup
                onChange={(keys) => onChange(Array.from(keys))}
                value={value}
                label="Selecciona las acreditaciones"
                color="warning"
            >

                <Checkbox value="1">CIP - Colegio de Ingenieros del Perú Consejo departamental del Callao</Checkbox>
                <Checkbox value="2">CEL - Colegio de Economistas de Lima</Checkbox>
                <Checkbox value="3">CEP - Colegio de Economistas de Piura</Checkbox>
                <Checkbox value="4">CAL - Colegio de Abogados de Lima</Checkbox>


            </CheckboxGroup>
        </div>
    );
}
