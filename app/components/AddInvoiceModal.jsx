"use client";

import React, { useState } from "react";
import { FileText, DollarSign, Calendar, X, User } from "lucide-react";

export default function AddInvoiceModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    dueDate: "",
    invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000), // Auto-generate dummy ID
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating invoice:", formData);
    // Add logic to create invoice here
    onClose();
    setFormData({
      customer: "",
      amount: "",
      dueDate: "",
      invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-[#24303F] rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-100 dark:border-[#2E3A47]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2E3A47]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Invoice
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333A48] transition-colors text-gray-500 dark:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Customer
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a customer...</option>
                  <option value="1">Ravi Kumar</option>
                  <option value="2">Priya Sharma</option>
                  <option value="3">Amit Verma</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#2E3A47] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-[#1A222C] text-gray-900 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Invoice Number
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.invoiceNo}
                  readOnly
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-[#2E3A47] rounded-xl bg-gray-50 dark:bg-[#1A222C]/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-[#2E3A47] text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A222C] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
              >
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
