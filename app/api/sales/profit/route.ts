import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getWeekRange() {
  const today = new Date();

  const start = new Date(today);
  start.setDate(today.getDate() - 7);

  const friday = new Date(today);
  const daysToFriday = 5 - friday.getDay();
  friday.setDate(today.getDate() + daysToFriday);

  return {
    start: start.toISOString().split("T")[0],
    end: friday.toISOString().split("T")[0],
  };
}

const getAllProductIds = async (
  organization_id: string,
  accessToken: string
): Promise<string[]> => {
  let page = 1;
  const size = 50;
  const allProductIds: string[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch(
      `https://api.timbu.cloud/products?organization_id=${organization_id}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    const ids = data.items.map((product: { id: string }) => product.id);
    allProductIds.push(...ids);
    hasNextPage = !!data.next_page;
    page += 1;
  }

  return allProductIds;
};

export async function POST(req: Request) {
  try {
    const { organization_id } = await req.json();

    if (!organization_id) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const { start, end } = getWeekRange();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product_ids = await getAllProductIds(organization_id, accessToken);

    const response = await fetch(
      "https://api.timbu.cloud/products/profit-analytics",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_id,
          product_ids,
          date_range_start: start,
          date_range_end: end,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profit analytics: ${response.status}`);
    }

    const results = await response.json();

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
