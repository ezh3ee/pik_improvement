import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

export default async function SubobjectsAddForm() {
  const complex = await fetchResidentialComplexAction("1");
  console.log(complex);
  return <div className="left-side pr-4">SubobjectsAddForm</div>;
}
