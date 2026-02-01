import React from 'react';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#FDF8F6]">
            {/* Sidebar / Header */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
