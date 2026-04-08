"use client";
import { InputFieldError } from "@/components/errors/input-field";
import { Step, useComplexStore } from "@/components/map/state/complex-store";
import {
  addResidentialComplexAction,
  fetchResidentialComplexAction,
  updateResidentialComplexAction,
} from "@/components/objects-management/complex/action";
import ComplexDetailed from "@/components/objects-management/complex/detailed";
import { complexSchema } from "@/components/objects-management/complex/schema";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HousePlusIcon } from "lucide-react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ResidentialComplexFetched = {
  name: string;
};

// export default function ResidentialComplexForm({complex}: {complex?: ResidentialComplexFetched;}) {
export default function ResidentialComplexForm() {
  const setStep = useComplexStore((state) => state.setStep);
  const setComplexId = useComplexStore((state) => state.setComplexId);
  const complexId = useComplexStore((state) => state.complexId);
  const queryClient = useQueryClient();

  const complex = useQuery({
    queryKey: ["complex", complexId],
    queryFn: () => {
      if (!complexId) return;
      return fetchResidentialComplexAction(complexId);
    },
    enabled: !!complexId,
    // staleTime: 1000 * 60 * 1,
  });

  const { handleSubmit, formState, reset, control } = useForm<
    z.infer<typeof complexSchema>
  >({
    resolver: zodResolver(complexSchema),
    defaultValues: {
      name: complex?.data?.name || "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: ({
      formData,
      id,
    }: {
      formData: FormData;
      id?: string | null;
    }) => {
      if (id) {
        return updateResidentialComplexAction(id, formData);
      } else {
        return addResidentialComplexAction(formData);
      }
    },
    onSuccess: (newComplex) => {
      queryClient.invalidateQueries({ queryKey: ["complexes"] });
      // queryClient.setQueryData(["complex", newComplex.id], newComplex);
      queryClient.setQueryData(["complexes", newComplex.id], newComplex);
      // queryClient.setQueryData(
      //   ["complexes"],
      //   (old: ResidentialComplexFetched[]) =>
      //     old ? [...old, newComplex] : [newComplex],
      // );

      if (!complexId) {
        setComplexId(newComplex.id);
        setStep(Step.ObjectAdd);
      }
    },
  });

  function onSubmit(data: z.infer<typeof complexSchema>) {
    mutation.mutate({ formData: dataObjectToFormData(data), id: complexId });
  }

  const resetForm = useCallback(() => {
    reset();
    return () => {};
  }, [reset]);

  if (!complexId) return null;

  return (
    <div>
      <ComplexDetailed complexId={complexId} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetForm}
        className="space-y-8 @container"
      >
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
