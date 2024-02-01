import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";


interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
