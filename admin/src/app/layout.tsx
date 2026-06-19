import type { Metadata } from 'next';
import './globals.css';
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Noble Essence Admin | Dashboard',
  description: 'Admin dashboard for Noble Essence e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
