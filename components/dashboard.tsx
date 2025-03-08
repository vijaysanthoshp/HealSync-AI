"use client"

import { useState, useMemo } from "react"
import { Bell, Search, FileText, MessageSquare, FlaskRoundIcon as Flask, UserPlus, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import MedicalReportUpload from "./medical-report-upload"
import AIChatbot from "./ai-chatbot"
import ClinicalTrialMatching from "./clinical-trial-matching"
import DoctorRecommendations from "./doctor-recommendations"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface SearchableItem {
  id: string
  title: string
  description: string
  type: 'report' | 'trial' | 'doctor' | 'feature'
  path?: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Medical Report",
      message: "Your blood test results have been analyzed",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: "Clinical Trial Match",
      message: "New trial matching your health profile",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: 3,
      title: "Doctor Appointment",
      message: "Reminder: Follow-up appointment tomorrow",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: false,
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const notificationsList = [
    { id: 1, message: "COVID-19: New variant detected in your area" },
    { id: 2, message: "Diabetes: Time for your regular check-up" },
    { id: 3, message: "Heart Rate: Your recent heart rate is normal" },
  ]
  const { logout } = useAuth()

  const unreadCount = notifications.filter(n => !n.read).length
  
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const features = [
    {
      id: "reports",
      title: "Medical Report Analysis",
      description: "Upload and analyze your medical reports with AI",
      icon: FileText,
      color: "bg-blue-100 text-blue-700",
      path: "./medical-report-upload"
    },
    {
      id: "chatbot",
      title: "AI Health Assistant",
      description: "Chat with our AI about health concerns and medications",
      icon: MessageSquare,
      color: "bg-green-100 text-green-700",
      path: "./ai-chatbot"
    },
    {
      id: "trials",
      title: "Clinical Trial Matching",
      description: "Find clinical trials that match your health profile",
      icon: Flask,
      color: "bg-purple-100 text-purple-700",
      path: "./clinical-trial-matching"
    },
    {
      id: "doctors",
      title: "Doctor Recommendations",
      description: "Get AI-powered doctor and clinic recommendations",
      icon: UserPlus,
      color: "bg-orange-100 text-orange-700",
      path: "./doctor-recommendations"
    },
  ]

  const searchableItems: SearchableItem[] = useMemo(() => [
    // Features
    ...features.map(feature => ({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      type: 'feature' as const,
      path: feature.path
    })),
    // Recent Reports
    {
      id: 'report-1',
      title: 'Blood Test Report',
      description: 'Latest blood test analysis results',
      type: 'report' as const
    },
    // Clinical Trials
    {
      id: 'trial-1',
      title: 'Diabetes Prevention Study',
      description: 'Clinical trial for diabetes prevention',
      type: 'trial' as const
    },
    // Add more searchable items as needed
  ], [])

  const filteredItems = useMemo(() => {
    if (!searchQuery) return []
    
    return searchableItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, searchableItems])

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <MedicalReportUpload />
      case "chatbot":
        return <AIChatbot />
      case "trials":
        return <ClinicalTrialMatching />
      case "doctors":
        return <DoctorRecommendations />
      default:
        return <DashboardHome setActiveTab={setActiveTab} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4 md:hidden" />
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="w-full md:w-[300px] pl-9 bg-gray-50" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-xs"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`px-4 py-2 cursor-pointer ${
                              notification.read ? 'opacity-60' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <span className="text-xs text-gray-500">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">{notification.message}</p>
                            </div>
                          </DropdownMenuItem>
                        ))
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    JF
                  </div>
                  <span className="hidden md:inline font-medium">John Fernandez</span>
                </div>
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Menu },
    { id: "reports", label: "Medical Reports", icon: FileText },
    { id: "chatbot", label: "AI Chatbot", icon: MessageSquare },
    { id: "trials", label: "Clinical Trials", icon: Flask },
    { id: "doctors", label: "Find Doctors", icon: UserPlus },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">HS</span>
          </div>
          <div className="font-semibold text-lg">HealSync AI </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton onClick={() => setActiveTab(item.id)} isActive={activeTab === item.id}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-gray-500">HealSync AI dashboard</div>
      </SidebarFooter>
    </Sidebar>
  )
}

function DashboardHome({ setActiveTab }) {
  const router = useRouter()

  const features = [
    {
      id: "reports",
      title: "Medical Report Analysis",
      description: "Upload and analyze your medical reports with AI",
      icon: FileText,
      color: "bg-blue-100 text-blue-700",
      path: "./medical-report-upload.tsx"
    },
    {
      id: "chatbot",
      title: "AI Health Assistant",
      description: "Chat with our AI about health concerns and medications",
      icon: MessageSquare,
      color: "bg-green-100 text-green-700",
      path: "./ai-chatbot.tsx"
    },
    {
      id: "trials",
      title: "Clinical Trial Matching",
      description: "Find clinical trials that match your health profile",
      icon: Flask,
      color: "bg-purple-100 text-purple-700",
      path: "./clinical-trial-matching.tsx"
    },
    {
      id: "doctors",
      title: "Doctor Recommendations",
      description: "Get AI-powered doctor and clinic recommendations",
      icon: UserPlus,
      color: "bg-orange-100 text-orange-700",
      path: "./doctor-recommendations.tsx"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Mr.Fernandez</h1>
        <p className="text-muted-foreground">Here's an overview of your healthcare dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card 
            key={feature.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveTab(feature.id)}
          >
            <CardHeader className="pb-2">
              <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-2`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your recently analyzed medical reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">Blood Test Report</div>
                    <div className="text-xs text-gray-500">Analyzed on {new Date().toLocaleDateString()}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Trials</CardTitle>
            <CardDescription>Clinical trials you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
                  <Flask className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <div className="font-medium">Diabetes Prevention Study</div>
                    <div className="text-xs text-gray-500">Enrolling until {new Date().toLocaleDateString()}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

