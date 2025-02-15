import React from "react";
import Sidebar from "../sidebar/Sidebar.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AccountsPayable = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Invalid amount format (max 2 decimal places).",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Define form submit handler
  const onSubmit = (data) => {
    console.log("Form Submitted: ", data);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseFloat(value);
    if (isNaN(number)) return value; // Return as-is if invalid
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="flex h-screen">
      {/* Main content, dynamically resizes */}
      <div className="flex-1 min-w-0 px-24 bg-[#FAFBFF]">
        <h1 className="text-2xl font-bold mb-4 mt-6 text-blue-400">
          ACCOUNTS PAYABLE
        </h1>

        {/* Summary Cards */}
        <div className="flex justify-center mb-8">
          <div className="flex min-w-min bg-white rounded-xl">
            <div className="flex-col self-center mb-6 mr-12">
              <div className="p-6 m-6">
                <h2 className="text-lg font-semibold">Total Payable</h2>
                <p className="text-2xl font-bold">₱5,423</p>
                <span className="text-red-500">UNPAID</span>
              </div>
              <div className="border-b mx-8" />
              <div className="p-6 m-6">
                <h2 className="text-lg font-semibold">Unpaid Payables</h2>
                <p className="text-2xl font-bold">189</p>
              </div>
            </div>

            <div className="p-12 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">
                Add Record to Payables
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Customer Name */}
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter customer name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Invoice Number */}
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice #</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter invoice number"
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              ))
                            } // Remove non-numeric characters
                            min="0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (PHP)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter amount"
                            className="rounded-xl"
                            value={field.value} // Show raw value while typing
                            onChange={(e) => {
                              let rawValue = e.target.value.replace(/,/g, ""); // Remove commas

                              // Allow only valid numbers (including decimals)
                              if (
                                /^\d*\.?\d{0,2}$/.test(rawValue) ||
                                rawValue === ""
                              ) {
                                field.onChange(rawValue);
                              }
                            }}
                            onBlur={() => {
                              if (field.value) {
                                field.onChange(formatCurrency(field.value)); // Format on blur
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="unpaid" />
                              <FormLabel>Unpaid</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="paid" />
                              <FormLabel>Paid</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Record
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">All Customers</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2">Customer Name</th>
                <th className="p-2">Invoice #</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">Jane Cooper</td>
                  <td className="p-2">7542</td>
                  <td className="p-2">March 10, 2025</td>
                  <td className="p-2">₱6,541</td>
                  <td className="p-2">April 10, 2025</td>
                  <td className="p-2 text-red-500">Unpaid</td>
                  <td className="p-2 justify-center flex gap-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Pay Now
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Update
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar on the right, fixed width */}
      <div className="w-[300px]">
        <Sidebar />
      </div>
    </div>
  );
};

export default AccountsPayable;
