"use client";

import { InputFieldError } from "@/components/errors/input-field";
import useCombine from "@/components/map/hooks/use-combine";
import { addSubobjectAction } from "@/components/objects-creation/subobjects-add-form/action";
import UploadGeometryButton from "@/components/objects-creation/subobjects-add-form/buttons/upload-geometry-button";
import {
  SubobjectEnum,
  subobjectSchema,
} from "@/components/objects-creation/subobjects-add-form/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { dataObjectToFormData } from "@/lib/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HousePlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function SubobjectsAddForm({
  complexId,
}: {
  complexId: string;
}) {
  const queryClient = useQueryClient();
  const { convertToDb } = useCombine();

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    formState,
  } = useForm<z.infer<typeof subobjectSchema>>({
    resolver: zodResolver(subobjectSchema),
    defaultValues: {
      name: "",
      complexId: complexId,
      type: "" as unknown as SubobjectEnum,
      // geometry: null as unknown as GeoJsonGeometry,
    },
    mode: "onChange",
  });

  // const resetForm = useCallback(() => {
  //   reset();
  //   return () => {};
  // }, [reset]);

  const mutation = useMutation({
    mutationFn: addSubobjectAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objects"] });
      // queryClient.setQueryData(["object", newObject.id], newObject);
      // flushSync(() => {
      //   reset();
      // });

      reset();
    },
  });

  function onSubmit(data: z.infer<typeof subobjectSchema>) {
    mutation.mutate(dataObjectToFormData(data));
  }

  function appendGeometry() {
    const geometry = convertToDb();
    if (geometry) {
      setValue("geometry", geometry, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      clearErrors("geometry");
    } else {
      setError("geometry", {
        type: "manual",
        message: "Геометрия обязательна",
      });
    }
  }

  const subobjectTypes = [
    { label: "МКД", value: SubobjectEnum.MKD },
    { label: "ОДХ", value: SubobjectEnum.ODH },
    { label: "Гараж", value: SubobjectEnum.GARAGE },
  ];

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onReset={resetForm}
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
                  Наименование <span className="text-red-500">*</span>
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

          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FieldLabel htmlFor="type">
                  Тип объекта <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Выберите тип объекта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subobjectTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <InputFieldError fieldState={fieldState} />
              </Field>
            )}
          />

          <Field className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="flex justify-start">
              <UploadGeometryButton isAdded={false} submit={appendGeometry} />
              <Controller
                name="geometry"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <InputFieldError fieldState={fieldState} />
                  </div>
                )}
              />
            </div>
          </Field>

          <Field className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="flex justify-center">
              <Button
                className="w-[20%]"
                type="submit"
                variant="default"
                disabled={mutation.isPending}
                //   disabled={isPending}
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
