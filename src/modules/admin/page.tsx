import { AdminSidebar } from "./components/sidebar";
import { Dashboard } from "../../shared/components/layouts/dashboard";
import { Outlet } from "react-router";
import { Layout } from "../../shared/components/layouts/layout";
import { SidebarLayout } from "../../shared/components/sidebar/sidebar-layout";
import { SidebarHeader } from "../../shared/components/sidebar/sidebar-header";
import { SidebarSeparator } from "../../shared/components/sidebar/sidebar-separator";
import { SidebarFooter } from "../../shared/components/sidebar/sidebar-footer";

export function AdminPage() {
  return (
    <Layout>
      <SidebarLayout>
        <SidebarHeader userClass="ADMIN" />
        <SidebarSeparator />
        <AdminSidebar />
        <SidebarSeparator />
        <SidebarFooter userName="Usuário adm" userEmail="user.adm@test.com" />
      </SidebarLayout>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Layout>
  );
}
