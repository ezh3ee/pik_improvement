import { InputFieldError } from "@/components/errors/input-field";
import { fullSubObjectSchema } from "@/components/objects-management/subobjects/schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Control, Controller } from "react-hook-form";
import z from "zod";

export default function MkdForm({
  control,
}: {
  control: Control<z.infer<typeof fullSubObjectSchema>>;
}) {
  return (
    <Controller
      control={control}
      name="buildingFootprintArea"
      render={({ field, fieldState }) => (
        <Field
          className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
          data-invalid={fieldState.invalid}
        >
          <FieldLabel className="flex @5xl:flex w-auto!">
            Площадь застройки <span className="text-red-500">*</span>
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
}
