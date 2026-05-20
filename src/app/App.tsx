import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from './contexts/LanguageContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
