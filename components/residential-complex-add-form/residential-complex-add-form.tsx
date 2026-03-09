"use client";
import { ResidentialComplexFetched } from "@/app/(protected)/projects/adding/[id]/page";
import { InputFieldError } from "@/components/errors/input-field";
import { PIKLogo } from "@/components/logo";
import {
  addResidentialComplexAction,
  complexState,
} from "@/components/residential-complex-add-form/action";
import { complexSchema } from "@/components/residential-complex-add-form/schema";
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
import { startTransition, useActionState, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function ResidentialComplexAddForm({
  complex,
}: {
  complex: ResidentialComplexFetched | null;
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

  const form = useForm<z.infer<typeof complexSchema>>({
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
    form.reset();
    form.clearErrors();
  }, [form]);

  useEffect(() => {
    if (complexAddFormState.success) {
      resetForm();
    }
  }, [complexAddFormState.success, resetForm]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={resetForm}
      className="space-y-8 @container"
    >
      <div className="flex flex-row justify-center">
        <PIKLogo />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Controller
          control={form.control}
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
          <FieldLabel className="hidden w-auto!">Submit</FieldLabel>
          <Button
            className="w-full"
            type="submit"
            variant="default"
            disabled={!form.formState.isValid}
          >
            Добавить ЖК
          </Button>
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
  );
}
