import LogoutButton from '../components/LogoutButton';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <header className="bg-[#113F67] h-16 flex justify-between">
            <h1 className="text-2xl font-semibold text-white px-8 py-4">Job Application Tracker</h1>
            <div className="px-4 py-4">
                <LogoutButton />
            </div>
        </header>
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
    
  )
}

export default MainLayout;
