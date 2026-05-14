import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Wudhu } from "./pages/Wudhu";
import { Ghusl } from "./pages/Ghusl";
import { Tayammum } from "./pages/Tayammum";
import { Najis } from "./pages/Najis";
import { QuizHub } from "./pages/quiz/QuizHub";
import { QuizPlayer } from "./pages/quiz/QuizPlayer";
import { QuizResults } from "./pages/quiz/QuizResults";
import { Login } from "./modules/auth/pages/Login";
import { Register } from "./modules/auth/pages/Register";
import { DashboardLayout } from "./modules/dashboard/components/DashboardLayout";
import { DashboardOverview } from "./modules/dashboard/pages/Overview";
import { CreateQuiz } from "./modules/dashboard/pages/CreateQuiz";
import { QuizList } from "./modules/dashboard/pages/QuizList";
import { StudentResults } from "./modules/dashboard/pages/StudentResults";
import { StudentDetail } from "./modules/dashboard/pages/StudentDetail";
import { ExportPDF } from "./modules/dashboard/pages/ExportPDF";
import { ShareResults } from "./modules/dashboard/pages/ShareResults";
import { Settings } from "./modules/dashboard/pages/Settings";
import { StudentQuiz } from "./modules/student/pages/StudentQuiz";
import { isAuthenticated } from "./modules/auth/services/auth.service";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "wudhu", Component: Wudhu },
      { path: "ghusl", Component: Ghusl },
      { path: "tayammum", Component: Tayammum },
      { path: "najis", Component: Najis },
      { path: "quiz", Component: QuizHub },
      { path: "quiz/:topic", Component: QuizPlayer },
      { path: "quiz/results", Component: QuizResults },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardOverview },
      { path: "create", Component: CreateQuiz },
      { path: "quizzes", Component: QuizList },
      { path: "results", Component: StudentResults },
      { path: "results/:id", Component: StudentDetail },
      { path: "export", Component: ExportPDF },
      { path: "share", Component: ShareResults },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/s/:slug",
    Component: StudentQuiz,
  },
]);
