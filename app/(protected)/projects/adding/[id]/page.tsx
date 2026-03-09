import { fetchResidentialComplexAction } from "@/components/residential-complex-add-form/action";
import ResidentialComplexAddForm from "@/components/residential-complex-add-form/residential-complex-add-form";
import { notFound } from "next/navigation";

export type ResidentialComplexFetched = {
  name?: string;
  id?: string;
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  let complex: ResidentialComplexFetched | null = {};

  if (id) {
    complex = await fetchResidentialComplexAction(id);
  }

  if (!complex) {
    notFound();
  }

  return <ResidentialComplexAddForm complex={complex} />;
}
