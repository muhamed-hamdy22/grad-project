import Navbar from "./_componant/Navbar";
import Sidebar from "./_componant/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar/>
            </div>
            <div className="hidden md:flex items-center h-full w-56 flex-col fixed inset-y-0 z-50 justify-between p-4 border-r">
                <Sidebar  />
            </div>
            <main className="md:pl-56 h-full pt-[80px]">
                {children}
                </main>
        </div>
    );
};

export default DashboardLayout;