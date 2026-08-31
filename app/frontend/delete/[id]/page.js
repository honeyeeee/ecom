export const instant = false;

export default async function DeletePage({ params }) {
  const { id } = await params;

  return (
    <div className="p-5">
      <h1>Delete Product ID: {id}</h1>
    </div>
  );
}