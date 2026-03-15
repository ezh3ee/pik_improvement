"use client";
import { InputFieldError } from "@/components/errors/input-field";
import { Step, useComplexStore } from "@/components/map/state/complex-state";
import { addResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";
import { complexSchema } from "@/components/objects-creation/residential-complex-add-form/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { dataObjectToFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HousePlusIcon } from "lucide-react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ResidentialComplexFetched = {
  name: string;
};

export default function ResidentialComplexAddForm({
  complex,
}: {
  complex?: ResidentialComplexFetched;
}) {
  const setStep = useComplexStore((state) => state.setStep);
  const setComplexId = useComplexStore((state) => state.setComplexId);

  const queryClient = useQueryClient();

  const { handleSubmit, formState, reset, control } = useForm<
    z.infer<typeof complexSchema>
  >({
    resolver: zodResolver(complexSchema),
    defaultValues: {
      name: complex?.name || "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: addResidentialComplexAction,
    onSuccess: (newComplex) => {
      queryClient.invalidateQueries({ queryKey: ["complexes"] });
      // queryClient.invalidateQueries({ queryKey: ["complex", newComplex.id] });
      queryClient.setQueryData(["complex", newComplex.id], newComplex);

      setComplexId(newComplex.id);
      setStep(Step.ObjectAdd);
    },
  });

  function onSubmit(data: z.infer<typeof complexSchema>) {
    mutation.mutate(dataObjectToFormData(data));
  }

  const resetForm = useCallback(() => {
    reset();
    return () => {};
  }, [reset]);

  return (
    // <div className="left-side pr-4">
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetForm}
        className="space-y-8 @container"
      >
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
                disabled={!formState.errors || mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner className="size-5" />
                ) : (
                  "Добавить ЖК"
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
