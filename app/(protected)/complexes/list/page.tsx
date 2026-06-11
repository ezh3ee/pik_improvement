// import ComplexTable from "@/components/complex-list/data-table";

import ComplexListWrapper from "@/components/complex-list/table-wrapper";

export default async function ComplexList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    // <div className="container w-full py-10">
    <div className="w-full py-10">
      {/* <Suspense fallback="loading1111" key={currentPage}> */}
      <ComplexListWrapper currentPage={currentPage} />
      {/* <Loading /> */}
      {/* </Suspense> */}
    </div>
  );
}
