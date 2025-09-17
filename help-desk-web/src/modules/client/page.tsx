import { SidebarHeader } from "../../shared/components/sidebar/sidebar-header";
import { SidebarFooter } from "../../shared/components/sidebar/sidebar-footer";
import { SidebarLayout } from "../../shared/components/sidebar/sidebar-layout";
import { Dashboard } from "../../shared/components/layouts-pages/dashboard";
import { Layout } from "../../shared/components/layouts-pages/layout";
import { useAuth } from "../../shared/context/auth-context";
import { ClientSidebar } from "./components/sidebar-client";
import { Outlet } from "react-router";

export function ClientPage() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <p>carregando...</p>;
  }
  if (!user) {
    return null;
  }
  return (
    <Layout>
      <SidebarLayout>
        <SidebarHeader userClass="CLIENTE" />
        <ClientSidebar />
        <SidebarFooter
          userName={user.username}
          userEmail={user.email}
          profilePicture={user.profilePicture}
        />
      </SidebarLayout>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Layout>
  );
}
