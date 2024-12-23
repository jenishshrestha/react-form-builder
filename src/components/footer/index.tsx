/**
 * ===============================================================================
 * Footer Component
 * @returns
 * ===============================================================================
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="py-4">
      <div className="container mx-auto text-center">
        <p className="text-xs tracking-wide">
          &copy; {currentYear} ReactFooterBuilder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
