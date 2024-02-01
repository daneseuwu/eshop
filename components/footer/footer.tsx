const Footer = () => {
    const anio = new Date();
    const year = anio.getFullYear();
    return (
      <div className="text-center pt-2">
        <div className="flex justify-center gap-2 text-xs">
          <span>Copyright ©️ {year} Eshop | Decodehud. All rights reserved.</span>
        </div>
      </div>
    );
  };
  
  export default Footer;
  