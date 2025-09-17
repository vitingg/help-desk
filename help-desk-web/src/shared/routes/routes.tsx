import { Routes, BrowserRouter, Route, Navigate } from "react-router";
import { ProtectedRoute } from "./protected-routes";
import { AuthLayout } from "../../modules/auth/components/layout";
import { SignUp } from "../../modules/auth/sign-up";
import { SignIn } from "../../modules/auth/sign-in";
import { AdminPage } from "../../modules/admin/page";
import { Ticket } from "../../modules/admin/tickets/ticket";
import { AdminDetail } from "../../modules/admin/tickets/admin-detail";
import { Technicians } from "../../modules/admin/technicians/technicians";
import { TechniciansProfile } from "../../modules/admin/technicians/technicians-profile";
import { Clients } from "../../modules/admin/clients/client";
import { Service } from "../../modules/admin/services/service";
import { TechPage } from "../../modules/tech/page";
import { TechTickets } from "../../modules/tech/tickets/my-tickets";
import { TechDetail } from "../../modules/tech/tickets/ticket-detail";
import { ClientPage } from "../../modules/client/page";
import { ClientTickets } from "../../modules/client/tickets/tickets";
import { ClientDetail } from "../../modules/client/tickets/client-detail";
import { CreateTicket } from "../../modules/client/create-ticket/create-ticket";
import { CreateTechForm } from "../../modules/admin/technicians/modals/create-tech-form";
import { PutTechForm } from "../../modules/admin/technicians/modals/put-tech-form";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";

export function AppRoutes() {
  return (
    <SkeletonTheme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
          </Route>

          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={[`ADMIN`]} />}
          >
            <Route path="admin" element={<AdminPage />}>
              <Route path="tickets" element={<Ticket />} />
              <Route path="ticket-detail/:ticketId" element={<AdminDetail />} />
              <Route path="techs" element={<Technicians />} />
              <Route path="technicians" element={<TechniciansProfile />}>
                <Route path="profile/:id" element={<PutTechForm />} />
                <Route path="form" element={<CreateTechForm />} />
              </Route>
              <Route path="clients" element={<Clients />} />
              <Route path="services" element={<Service />} />
            </Route>
          </Route>

          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={[`TECH`]} />}
          >
            <Route path="tech" element={<TechPage />}>
              <Route path="tickets" element={<TechTickets />} />
              <Route path="ticket-detail/:id" element={<TechDetail />} />
            </Route>
          </Route>

          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={[`CLIENT`]} />}
          >
            <Route path="client" element={<ClientPage />}>
              <Route path="tickets" element={<ClientTickets />} />
              <Route path="ticket-detail/:id" element={<ClientDetail />} />
              <Route path="create-ticket" element={<CreateTicket />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </SkeletonTheme>
  );
}
