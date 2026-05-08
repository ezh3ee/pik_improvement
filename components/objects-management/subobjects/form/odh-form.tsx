import { InputFieldError } from "@/components/errors/input-field";
import {
  fullSubObjectSchema,
  odhSchema,
} from "@/components/objects-management/subobjects/schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Control, Controller } from "react-hook-form";
import z from "zod";

type OdhFormFields = {
  name: keyof z.infer<typeof odhSchema>;
  label: string;
};

const odhFormFields: OdhFormFields[] = [
  { name: "totalArea", label: "Общая площадь" },
  { name: "manualCleaningArea", label: "Площадь ручной уборки" },
  { name: "greeningArea", label: "Площадь узеленения" },
  { name: "mechanizedCleaningArea", label: "Площадь механизированной уборки" },
  { name: "cleaningStaffCountSummer", label: "Кол-во сотрудников (лето)" },
  { name: "equipmentCountSummer", label: "Кол-во техники (лето)" },
  { name: "cleaningStaffCountWinter", label: "Кол-во сотрудников (зима)" },
  { name: "equipmentCountWinter", label: "Кол-во техники (зима)" },
];

export default function OdhForm({
  control,
}: {
  control: Control<z.infer<typeof fullSubObjectSchema>>;
}) {
  return (
    <>
      {odhFormFields.map((val, i) => {
        return (
          <Controller
            control={control}
            name={val.name}
            key={val.name + i}
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex @5xl:flex w-auto!">
                  {val.label} <span className="text-red-500">*</span>
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="number"
                    className=""
                    {...field}
                  />
                </InputGroup>

                <InputFieldError fieldState={fieldState} />
              </Field>
            )}
          />
        );
      })}

      {/* <Controller
        control={control}
        name="manualCleaningArea"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Площадь ручной уборки <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="greeningArea"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Площадь узеленения <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="mechanizedCleaningArea"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Площадь механизированной уборки
              <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="cleaningStaffCountSummer"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Кол-во сотрудников (лето)
              <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="equipmentCountSummer"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Кол-во техники (лето)
              <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="cleaningStaffCountWinter"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Кол-во сотрудников (зима)
              <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="equipmentCountWinter"
        render={({ field, fieldState }) => (
          <Field
            className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel className="flex @5xl:flex w-auto!">
              Кол-во техники (зима)
              <span className="text-red-500">*</span>
            </FieldLabel>

            <InputGroup>
              <InputGroupInput
                key="text-input-0"
                placeholder=""
                type="number"
                className=""
                {...field}
              />
            </InputGroup>

            <InputFieldError fieldState={fieldState} />
          </Field>
        )}
      /> */}
    </>
  );
}
