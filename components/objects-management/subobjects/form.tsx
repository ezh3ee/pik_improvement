"use client";

import { InputFieldError } from "@/components/errors/input-field";
import useCombine from "@/components/map/hooks/use-combine";
import useRenderGeometryFromDb from "@/components/map/hooks/use-render-geometry-from-db";
import { useComplexStore } from "@/components/map/state/complex-store";
import {
  addSubobjectAction,
  editSubobjectAction,
  SubObjectFull,
} from "@/components/objects-management/subobjects/action";
import UploadGeometryButton from "@/components/objects-management/subobjects/buttons/upload-geometry-button";
import {
  SubobjectEnum,
  subobjectSchema,
} from "@/components/objects-management/subobjects/schema";
import { mapSubobjectType } from "@/components/objects-management/subobjects/subobject-type-map";
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
import { useClearFormFields } from "@/hooks/use-clear-form-fields";
import { dataObjectToFormData } from "@/lib/client-utils";
import { SubObjectType } from "@/lib/generated/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HousePlusIcon } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import z from "zod";

export default function SubobjectsForm({
  object,
}: {
  object?: SubObjectFull | null;
}) {
  const complexId = useComplexStore((state) => state.complexId) as string;
  const objectIdToEdit = useComplexStore((state) => state.objectIdToEdit);
  const setObjectIdToEdit = useComplexStore((state) => state.setObjectIdToEdit);

  const queryClient = useQueryClient();
  const { convertToDb, convertFromDb } = useCombine();
  const clearFields = useClearFormFields();

  const renderGeometryFromDb = useRenderGeometryFromDb();

  const geometry =
    (object?.geometry && JSON.parse(object.geometry as string)) || null;
  console.log("geometry", geometry);

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<z.infer<typeof subobjectSchema>>({
    resolver: zodResolver(subobjectSchema),
    values: {
      name: object?.name || "",
      complexId: complexId,
      type: object?.type || ("" as unknown as SubObjectType),
      geometry:
        // (object?.geometry as unknown as GeoJsonGeometry) ||
        // geometry || (null as unknown as GeoJsonGeometry),
        geometry,
    },
    mode: "onChange",
  });

  console.log(getValues());

  const geometryValue = useWatch({
    control,
    name: "geometry",
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

  // useEffect(() => {
  //   const values = {
  //     ...clearFields(getValues()),
  //     complexId: complexId,
  //     geometry: null as unknown as GeoJsonGeometry,
  //   };

  //   if (!object) {
  //     reset(values);
  //     // reset({
  //     //   name: "",
  //     //   type: "" as unknown as SubobjectEnum,
  //     //   geometry: null as unknown as GeoJsonGeometry,
  //     // });
  //   }

  //   return () => {};
  // }, [clearFields, getValues, object, reset, complexId]);

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
            {/* </div> */}
          </Field>

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
