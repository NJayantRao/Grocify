import { createGroceryItem, listGroceryItems } from "@/lib/db-actions";

export async function GET() {
  try {
    const items = await listGroceryItems();

    return Response.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching grocery items:", error);
    return Response.json(
      { error: "Failed to fetch grocery items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json(
        { error: "Missing required fields: name, category, priority" },
        { status: 400 }
      );
    }

    const item = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });

    return Response.json({ item }, { status: 200 });
  } catch (error) {
    console.error("Error Creating grocery item:", error);
    return Response.json(
      { error: "Failed to create grocery item" },
      { status: 500 }
    );
  }
}
