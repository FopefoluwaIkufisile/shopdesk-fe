import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const apiUrl = "https://api.timbu.cloud/organizations";
export async function GET(request: NextRequest) {
  const accessToken = await getToken();
  const organization_id = getOrganizationId(request);
  if (!accessToken || !organization_id)
    return NextResponse.json(
      { message: "Access token and Organization ID are requireed." },
      { status: 400 }
    );
  try {
    const response = await fetch(
      `${apiUrl}/${organization_id}/image?organization_id=${organization_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return handleResponse(response);
  } catch (error) {
    NextResponse.json({
      message: error instanceof Error ? error : "Internal Server Error",
    });
  }
}

export async function PATCH(request: NextRequest) {
  const accessToken = await getToken();
  const organization_id = getOrganizationId(request);
  if (!accessToken || !organization_id)
    return NextResponse.json(
      { message: "Access token and Organization ID are required." },
      { status: 400 }
    );
  const body = await request.formData();
  try {
    const response = await fetch(
      `${apiUrl}/${organization_id}/update-image?organization_id=${organization_id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }
    );
    return handleResponse(response);
  } catch (error) {
    NextResponse.json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}

async function getToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  return accessToken;
}

function getOrganizationId(request: NextRequest) {
  const organization_id = new URL(request.url).searchParams.get(
    "organization_id"
  );
  return organization_id;
}

async function handleResponse(response: Response) {
  if (!response.ok)
    return NextResponse.json(
      {
        message: "Request failed with Status code: " + response.status,
      },
      { status: response.status }
    );
  return NextResponse.json(await response.json());
}
