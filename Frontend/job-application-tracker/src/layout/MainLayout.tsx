import LogoutButton from '../components/LogoutButton';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
        <header className="bg-[#113F67] h-16 flex justify-between">
            <h1 className="text-2xl font-semibold text-white px-8 py-4">Job Application Tracker</h1>
            <div className="px-4 py-4">
                <LogoutButton />
            </div>
        </header>
        <main>
            <Outlet />
        </main>
    </>
    
  )
}

export default MainLayout;
