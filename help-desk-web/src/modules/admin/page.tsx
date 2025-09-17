import { SidebarLayout } from "../../shared/components/sidebar/sidebar-layout";
import { SidebarHeader } from "../../shared/components/sidebar/sidebar-header";
import { SidebarFooter } from "../../shared/components/sidebar/sidebar-footer";
import { Dashboard } from "../../shared/components/layouts-pages/dashboard";
import { Layout } from "../../shared/components/layouts-pages/layout";
import { AdminSidebar } from "./components/sidebar-admin";
import { useAuth } from "../../shared/context/auth-context";
import { Outlet } from "react-router";

export function AdminPage() {
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
        <SidebarHeader userClass="ADMIN" />
        <div className="hidden md:flex md:flex-col md:justify-start md:flex-1 ">
          <AdminSidebar />
        </div>
        <SidebarFooter userName={user.username} userEmail={user.email} />
      </SidebarLayout>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Layout>
  );
}
