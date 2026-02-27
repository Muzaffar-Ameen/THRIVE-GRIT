import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import WhyThriveGrit from "./pages/WhyThriveGrit/WhyThriveGrit";
import Services from "./pages/Services/Services";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";

// import BlogPost from "./pages/Blog/BlogPost";
import Contact from "./pages/Contact/Contact";
// import NotFound from "./pages/NotFound/NotFound";


// const Layout = () => (
//   <>
//     <Navbar />
//     <Header />
//     <main>
//       <Outlet /> 
//     </main>
//     <Footer />
//   </>
// );
const Layout = () => (
  <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020617] dark:text-slate-100 transition-colors duration-300">
    <Navbar />
    
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
const HomeLayout = () => (
  <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020617] dark:text-slate-100 transition-colors duration-300">
    <Navbar />
    <Header />
    <main>
      <Home />
    </main>
    <Footer />
  </div>
);
const App = () => (
  <BrowserRouter>
    <Routes>
        {/* Home has its own layout with Header */}
      <Route path="/" element={<HomeLayout />} />
      {/* Public pages with shared layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/why" element={<WhyThriveGrit />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-a-call" element={<Contact />} />
      </Route>

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
