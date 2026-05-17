import { fetchResidentialComplexesAction } from "@/components/objects-management/complex/action";

export default async function ComplexList() {
  const complexes = await fetchResidentialComplexesAction();
  return (
    <div>
      <h1>Список комплексов</h1>

      <ul>
        {complexes.map((complex) => {
          return <li key={complex.id}>{complex.name}</li>;
        })}
      </ul>
    </div>
  );
}
