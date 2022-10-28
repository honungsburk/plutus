import { useState, Suspense, lazy } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import Layout from "./Layout";
import Loading from "./Pages/Loading";
import PageErrorBoundary from "src/Components/ErrorBoundary/PageErrorBoundary";

// Lazy load routes to allow for code splitting.
const NotFound = lazy(() => import("./Pages/NotFound"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  return (
    <PageErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <PageErrorBoundary>
                  <Home />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/*"
              element={
                <PageErrorBoundary>
                  <NotFound />
                </PageErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </PageErrorBoundary>
  );
}

export default App;
