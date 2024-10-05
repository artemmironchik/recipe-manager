const Layout = async ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
);

export default Layout;
