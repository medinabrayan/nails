import React from 'react';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#FDF8F6] flex">
            {/* Persistent Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
