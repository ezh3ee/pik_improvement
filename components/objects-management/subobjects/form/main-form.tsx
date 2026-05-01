"use client";

import { InputFieldError } from "@/components/errors/input-field";
import useCombine from "@/components/map/hooks/use-combine";
import useRenderGeometryFromDb from "@/components/map/hooks/use-convert-geometry-from-db";
import { useComplexStore } from "@/components/map/state/complex-store";
import {
  addSubobjectAction,
  editSubobjectAction,
  SubObjectFull,
} from "@/components/objects-management/subobjects/action";
import UploadGeometryButton from "@/components/objects-management/subobjects/buttons/upload-geometry-button";
import {
  fullSubObjectSchema,
  subobjectSchema,
} from "@/components/objects-management/subobjects/schema";
import {
  mapSubobjectType,
  SubobjectEnum,
} from "@/components/objects-management/subobjects/subobject-type-map";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
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
import { SubObjectType } from "@/lib/generated/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Geometry as GeoJsonGeometry } from "geojson";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import z from "zod";
import MkdForm from "./mkd-form";

export default function SubobjectsMainForm({
  object,
}: {
  object?: SubObjectFull | null;
}) {
  const complexId = useComplexStore((state) => state.complexId) as string;
  const objectIdToEdit = useComplexStore((state) => state.objectIdToEdit);
  const setObjectIdToEdit = useComplexStore((state) => state.setObjectIdToEdit);
  const isAddingGeometry = useComplexStore((state) => state.isAddingGeometry);

  const queryClient = useQueryClient();
  const { convertToDb } = useCombine();

  const renderGeometryFromDb = useRenderGeometryFromDb();

  const geometry =
    (object?.geometry && JSON.parse(object.geometry as string)) || null;

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    resetField,
  } = useForm<z.infer<typeof fullSubObjectSchema>>({
    resolver: zodResolver(fullSubObjectSchema),
    values: {
      name: object?.name || "",
      complexId: complexId,
      type: object?.type || ("" as unknown as SubObjectType),
      buildAddress: object?.buildAddress || "",
      postAddress: object?.postAddress || "",
      payer: object?.payer || "",
      buildingFootprintArea: object?.mkdDetails?.buildingFootprintArea || 1,
      geometry:
        // (object?.geometry as unknown as GeoJsonGeometry) ||
        // geometry || (null as unknown as GeoJsonGeometry),
        geometry,
    },
    mode: "onChange",
  });

  const geometryValue = useWatch({
    control,
    name: "geometry",
  });

  const typeValue = useWatch({
    control,
    name: "type",
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
        return editSubobjectAction(id, formData);
      } else {
        return addSubobjectAction(formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objects"] });

      if (objectIdToEdit) setObjectIdToEdit(null);

      reset();
    },
  });

  function onSubmit(data: z.infer<typeof subobjectSchema>) {
    mutation.mutate({
      formData: dataObjectToFormData(data),
      id: object?.id,
    });
  }

  function renderGeometryOnMap() {
    renderGeometryFromDb({ geojson: geometryValue });
  }

  function appendGeometryToForm() {
    const geometry = convertToDb();
    if (geometry) {
      setValue("geometry", geometry, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      clearErrors("geometry");
    } else {
      if (!geometryValue) {
        setError("geometry", {
          type: "manual",
          message: "Геометрия обязательна",
        });
      }
    }
  }

  const subobjectTypes = [
    { label: mapSubobjectType(SubobjectEnum.MKD), value: SubobjectEnum.MKD },
    { label: mapSubobjectType(SubobjectEnum.ODH), value: SubobjectEnum.ODH },
    {
      label: mapSubobjectType(SubobjectEnum.GARAGE),
      value: SubobjectEnum.GARAGE,
    },
  ];

  useEffect(() => {
    if (isAddingGeometry) {
      resetField("geometry", {
        defaultValue: null as unknown as GeoJsonGeometry,
      });
    }
  }, [isAddingGeometry, resetField]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 @container">
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
                  Наименование объекта <span className="text-red-500">*</span>
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="text"
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
            name="buildAddress"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex @5xl:flex w-auto!">
                  Строительный адрес <span className="text-red-500">*</span>
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="text"
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
            name="postAddress"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex @5xl:flex w-auto!">
                  Почтовый адрес <span className="text-red-500">*</span>
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="text"
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
            name="payer"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto @5xl:col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex @5xl:flex w-auto!">
                  Наименование плательщика{" "}
                  <span className="text-red-500">*</span>
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    key="text-input-0"
                    placeholder=""
                    type="text"
                    className=""
                    {...field}
                  />
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
            <Controller
              name="geometry"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <UploadGeometryButton
                    isAdded={field.value !== null}
                    submit={appendGeometryToForm}
                    renderGeometry={renderGeometryOnMap}
                  />
                  <div>
                    <InputFieldError fieldState={fieldState} />
                  </div>
                </>
              )}
            />
          </Field>

          {typeValue === SubObjectType.MKD && <MkdForm control={control} />}

          <Field className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="flex justify-center">
              <Button
                className="w-[20%]"
                type="submit"
                variant="default"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner className="size-5" />
                ) : objectIdToEdit ? (
                  "Редактировать"
                ) : (
                  "Добавить"
                )}
              </Button>
              {objectIdToEdit && (
                <Button
                  className="w-[20%]"
                  variant="outline"
                  disabled={mutation.isPending}
                  onClick={() => (setObjectIdToEdit(null), reset())}
                >
                  {mutation.isPending ? (
                    <Spinner className="size-5" />
                  ) : (
                    "Отменить"
                  )}
                </Button>
              )}
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
