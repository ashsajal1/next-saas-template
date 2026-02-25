"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare,
  User,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ElementType;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    title: "New feature available",
    message: "We've added a new automation feature that can help you save more time. Check it out!",
    time: "2 minutes ago",
    read: false,
    icon: Info,
  },
  {
    id: "2",
    type: "success",
    title: "Payment successful",
    message: "Your subscription has been renewed successfully. Thank you for your continued support!",
    time: "1 hour ago",
    read: false,
    icon: CheckCircle2,
  },
  {
    id: "3",
    type: "warning",
    title: "Trial ending soon",
    message: "Your free trial will expire in 3 days. Upgrade now to continue using all features.",
    time: "3 hours ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: "4",
    type: "info",
    title: "New message from support",
    message: "You have a new reply to your support ticket #12345. Click to view the response.",
    time: "Yesterday",
    read: true,
    icon: MessageSquare,
  },
  {
    id: "5",
    type: "success",
    title: "Team member joined",
    message: "Sarah Thompson has joined your team and been assigned to the Workspace project.",
    time: "Yesterday",
    read: true,
    icon: User,
  },
  {
    id: "6",
    type: "error",
    title: "Payment failed",
    message: "We were unable to process your payment. Please update your billing information.",
    time: "2 days ago",
    read: true,
    icon: XCircle,
  },
  {
    id: "7",
    type: "info",
    title: "Scheduled maintenance",
    message: "System maintenance is scheduled for Sunday at 2:00 AM UTC. Expected downtime: 15 minutes.",
    time: "3 days ago",
    read: true,
    icon: Settings,
  },
  {
    id: "8",
    type: "success",
    title: "Invoice generated",
    message: "Your monthly invoice for January 2026 is now available. Download it from your dashboard.",
    time: "1 week ago",
    read: true,
    icon: CreditCard,
  },
];

const typeStyles = {
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-500",
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: "text-green-500",
  },
  warning: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: "text-yellow-500",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "text-red-500",
  },
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 mt-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-sm">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Stay updated with the latest activity and updates from your workspace.
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Unread
            </Button>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <Card className="border-border/50">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {filter === "unread" ? "All caught up!" : "No notifications"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {filter === "unread"
                      ? "You've read all your notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {filteredNotifications.map((notification) => {
                    const styles = typeStyles[notification.type];
                    const Icon = notification.icon || Bell;

                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 hover:bg-muted/50 transition-colors cursor-pointer group",
                          !notification.read && "bg-muted/30"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-4">
                          <div
                            className={cn(
                              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                              styles.bg,
                              styles.icon
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3
                                className={cn(
                                  "font-semibold truncate",
                                  !notification.read && "text-foreground",
                                  notification.read && "text-muted-foreground"
                                )}
                              >
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {notification.time}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn("text-xs", styles.icon)}
                              >
                                {notification.type}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
