type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <main className="bg-gray-100 h-screen text-gray-600 pt-4 md:flex ">
      {children}
    </main>
  );
}
