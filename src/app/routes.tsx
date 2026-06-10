import { createBrowserRouter, Navigate, useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Wudhu } from "./pages/Wudhu";
import { Ghusl } from "./pages/Ghusl";
import { Tayammum } from "./pages/Tayammum";
import { Najis } from "./pages/Najis";
import { NotFound } from "./pages/NotFound";
import { QuizHub } from "./pages/quiz/QuizHub";
import { QuizPlayer } from "./pages/quiz/QuizPlayer";
import { QuizResults } from "./pages/quiz/QuizResults";
import { QuizReview } from "./pages/quiz/QuizReview";
import { Login } from "./modules/auth/pages/Login";
import { Register } from "./modules/auth/pages/Register";
import { DashboardLayout } from "./modules/dashboard/components/DashboardLayout";
import { DashboardOverview } from "./modules/dashboard/pages/Overview";

import { QuizList } from "./modules/dashboard/pages/QuizList";
import { StudentResults } from "./modules/dashboard/pages/StudentResults";
import { StudentDetail } from "./modules/dashboard/pages/StudentDetail";
import { Settings } from "./modules/dashboard/pages/Settings";
import { StudentQuiz } from "./modules/student/pages/StudentQuiz";
import { isAuthenticated } from "./modules/auth/services/auth.service";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
}

function Redirect({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}

function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    console.error({
      type: "ROUTE_404",
      pathname: window.location.pathname,
      search: window.location.search,
      timestamp: new Date().toISOString(),
    });
    return <NotFound />;
  }

  console.error({
    type: "ROUTE_ERROR",
    error,
    pathname: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Error</h1>
      <p className="text-muted-foreground mb-6">Terjadi kesalahan yang tidak terduga.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, Component: Home },
      { path: "wudhu", Component: Wudhu },
      { path: "ghusl", Component: Ghusl },
      { path: "tayammum", Component: Tayammum },
      { path: "najis", Component: Najis },
      { path: "quiz", Component: QuizHub },
      { path: "quiz/:topic", Component: QuizPlayer },
      { path: "quiz/results", Component: QuizResults },
      { path: "quiz/review/:attemptId", Component: QuizReview },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
      { path: "quizs", Component: () => <Redirect to="/quiz" /> },
      { path: "quizes", Component: () => <Redirect to="/quiz" /> },
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
      { path: "quizzes", Component: QuizList },
      { path: "results", Component: StudentResults },
      { path: "results/:id", Component: StudentDetail },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/s/:slug",
    Component: StudentQuiz,
  },
  { path: "/scores", Component: () => <Redirect to="/dashboard/results" /> },
  { path: "/nilai", Component: () => <Redirect to="/dashboard/results" /> },
  { path: "/daftar-nilai", Component: () => <Redirect to="/dashboard/results" /> },
]);
