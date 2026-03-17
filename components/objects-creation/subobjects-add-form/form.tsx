"use client";

import { InputFieldError } from "@/components/errors/input-field";
import { addSubobjectAction } from "@/components/objects-creation/subobjects-add-form/action";
import { subobjectSchema } from "@/components/objects-creation/subobjects-add-form/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { dataObjectToFormData } from "@/lib/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HousePlusIcon } from "lucide-react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function SubobjectsAddForm() {
  const queryClient = useQueryClient();

  const { handleSubmit, formState, reset, control } = useForm<
    z.infer<typeof subobjectSchema>
  >({
    resolver: zodResolver(subobjectSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: addSubobjectAction,
    // onSuccess: (newComplex) => {
    //   queryClient.invalidateQueries({ queryKey: ["complexes"] });
    //   // queryClient.invalidateQueries({ queryKey: ["complex", newComplex.id] });
    //   queryClient.setQueryData(["complex", newComplex.id], newComplex);

    //   setComplexId(newComplex.id);
    //   setStep(Step.ObjectAdd);
    // },
  });

  function onSubmit(data: z.infer<typeof subobjectSchema>) {
    mutation.mutate(dataObjectToFormData(data));
  }

  const resetForm = useCallback(() => {
    reset();
    return () => {};
  }, [reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetForm}
        className="space-y-8 @container"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
          Добавление строительного объекта
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
                disabled={!formState.errors || mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner className="size-5" />
                ) : (
                  "Добавить объект"
                )}
              </Button>
            </div>
          </Field>

          {mutation.isError && (
            <p className="mt-2 text-sm text-red-500">
              {mutation.error.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
