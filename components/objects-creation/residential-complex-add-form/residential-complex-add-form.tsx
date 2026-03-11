"use client";
import { ResidentialComplexFetched } from "@/app/(protected)/projects/adding/[id]/page";
import { InputFieldError } from "@/components/errors/input-field";
import {
  addResidentialComplexAction,
  complexState,
} from "@/components/objects-creation/residential-complex-add-form/action";
import { complexSchema } from "@/components/objects-creation/residential-complex-add-form/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { dataObjectToFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HousePlusIcon } from "lucide-react";
import { useActionState, useCallback, useEffect, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

export default function ResidentialComplexAddForm({
  complex,
}: {
  complex?: ResidentialComplexFetched;
}) {
  console.log("complex ", complex);

  const initialState: complexState = {
    message: null,
    errors: {},
    success: false,
  };

  const [complexAddFormState, addComplexSubmit] = useActionState(
    addResidentialComplexAction,
    initialState,
  );

  const [isPending, startTransition] = useTransition();

  const { handleSubmit, formState, reset, control } = useForm<
    z.infer<typeof complexSchema>
  >({
    resolver: zodResolver(complexSchema),
    defaultValues: {
      name: complex?.name || "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof complexSchema>) {
    startTransition(() => {
      addComplexSubmit(dataObjectToFormData(data));
    });
  }

  const resetForm = useCallback(() => {
    reset();
    // form.clearErrors();

    return () => {};
  }, [reset]);

  useEffect(() => {
    if (complexAddFormState.success) {
      resetForm();
    }

    return () => {};
  }, [complexAddFormState.success, resetForm]);

  const watchAllFields = useWatch({
    control,
  });

  useEffect(() => {
    console.log("Form data changed:", watchAllFields);
    // Perform side effects here
  }, [watchAllFields, control]);

  // useEffect(() => {}, [form]);

  return (
    <div className="left-side pr-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetForm}
        className="space-y-8 @container"
      >
        {/* <div className="flex flex-row justify-center">
          <PIKLogo />
        </div> */}
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
          Добавление ЖК
        </h3>
        <div className="grid grid-cols-12 gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex @5xl:flex w-auto!">
                  Наименование
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="text"
                    className=""
                    {...field}
                  />
                  <InputGroupAddon align="inline-start">
                    <HousePlusIcon className="size-4" strokeWidth={2} />
                  </InputGroupAddon>
                </InputGroup>

                <InputFieldError fieldState={fieldState} />
              </Field>
            )}
          />
          <Field className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="flex justify-center">
              <Button
                className="w-[20%]"
                type="submit"
                variant="default"
                disabled={!formState.errors || isPending}
              >
                Добавить ЖК
              </Button>
            </div>
          </Field>

          {complexAddFormState.message && !complexAddFormState.success && (
            <p className="mt-2 text-sm text-red-500">
              {complexAddFormState.message}
            </p>
          )}

          {complexAddFormState.success && (
            <p className="mt-2 text-sm text-green-500">ЖК успешно добавлен</p>
          )}
        </div>
      </form>
    </div>
  );
}
