"use client";

import React from "react";
import { Plus, FileText, Bell, Download } from "lucide-react";

export default function QuickActions({ onAddCustomer, onAddInvoice }) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden h-full">
      <div className="relative z-10">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddCustomer}
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
          >
            <Plus size={16} /> Customer
          </button>
          <button
            onClick={onAddInvoice}
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium"
          >
            <FileText size={16} /> Invoice
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
            <Bell size={16} /> Remind All
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm text-sm font-medium">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      {/* Decorative circles */}
      <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
  );
}
