"use client"

import { useState } from "react"
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [notifications, setNotifications] = useState(3)

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
                  <Input type="search" placeholder="Search..." className="w-full md:w-[300px] pl-9 bg-gray-50" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    DR
                  </div>
                  <span className="hidden md:inline font-medium">Dr. Smith</span>
                </div>
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
            <span className="text-white font-bold">HC</span>
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
        <div className="text-xs text-gray-500">HealthCare AI Dashboard v1.0</div>
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
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Dr. Smith</h1>
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

