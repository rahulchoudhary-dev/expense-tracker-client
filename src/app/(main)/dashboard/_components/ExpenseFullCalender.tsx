"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  DollarSign,
  Tag,
  CreditCard,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { EventClickArg } from "@fullcalendar/core";
import {
  categoryColors,
  Expense,
  FullCalendarEvent,
} from "@/interfaces/expense";

const ExpenseCalendar = ({ expenseData }: any) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setExpenses(expenseData);
  }, [expenseData]);

  const transformExpensesToEvents = (
    expenseData: Expense[]
  ): FullCalendarEvent[] => {
    return expenseData.map((expense: Expense) => ({
      id: expense.id.toString(),
      title: `$${expense.amount} - ${expense.Category.name}`,
      date: expense.date.split("T")[0], // Extract date part
      backgroundColor:
        categoryColors[expense.Category.name] || categoryColors["Other"],
      borderColor:
        categoryColors[expense.Category.name] || categoryColors["Other"],
      extendedProps: {
        amount: expense.amount,
        description: expense.description,
        category: expense.Category.name,
        paymentMethod: expense.PaymentMethod.name,
        attachments: expense.attachments || [],
        fullExpense: expense,
      },
    }));
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedExpense(clickInfo.event.extendedProps.fullExpense as Expense);
    setIsDialogOpen(true);
  };

  const handleDateClick = (arg: { dateStr: string }) => {
    // Optional: Handle date clicks to add new expenses
    console.log("Date clicked:", arg.dateStr);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <CalendarDays className="h-8 w-8 text-blue-600" />
            Expense Calendar
          </h1>
          <p className="text-gray-600">
            Track and visualize your expenses over time
          </p>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={transformExpensesToEvents(expenses)}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                height="auto"
                eventDisplay="block"
                dayMaxEvents={3}
                moreLinkClick="popover"
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                eventDidMount={(info) => {
                  // Add custom styling to events
                  info.el.style.cursor = "pointer";
                  info.el.style.borderRadius = "4px";
                  info.el.style.fontSize = "12px";
                  info.el.style.padding = "2px 4px";
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Category Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryColors).map(([category, color]) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="flex items-center gap-1"
                  style={{ borderColor: color }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Expense Details</DialogTitle>
            </DialogHeader>
            {selectedExpense && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedExpense.amount)}
                  </span>
                  <Badge
                    style={{
                      backgroundColor:
                        categoryColors[selectedExpense.Category.name] ||
                        categoryColors["Other"],
                      color: "white",
                    }}
                  >
                    {selectedExpense.Category.name}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Description:</span>
                  </div>
                  <p className="text-gray-700 ml-6">
                    {selectedExpense.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Payment Method:</span>
                  </div>
                  <p className="text-gray-700 ml-6">
                    {selectedExpense.PaymentMethod.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                  </div>
                  <p className="text-gray-700 ml-6">
                    {formatDate(selectedExpense.date)}
                  </p>
                </div>

                {selectedExpense.attachments &&
                  selectedExpense.attachments.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Attachments:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-6">
                        {selectedExpense.attachments.map(
                          (attachment, index) => (
                            <img
                              key={attachment.id || index}
                              src={attachment.attachmentUrl}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                              onClick={() =>
                                window.open(attachment.attachmentUrl, "_blank")
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExpenseCalendar;
