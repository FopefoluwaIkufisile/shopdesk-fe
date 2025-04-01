import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateOrganization from "./_components/CreateOrganization";

export const metadata: Metadata = {
  title: 'Create Organization',
  description:
    'Set up your organization to start managing your business with ShopDesk.',
};

const CreateOrganizationPage = async () => {
  const cookieStore = await cookies(); // ✅ await is now required
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    redirect("/sign-in"); // or wherever your login page is
  }
  return <CreateOrganization />;
};

export default CreateOrganizationPage;
