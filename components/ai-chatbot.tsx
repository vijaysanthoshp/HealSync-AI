"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Camera, Mic, X, AlertCircle, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hello! I'm your AI health assistant. I can help with medical questions and analyze medications. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [drugImage, setDrugImage] = useState(null)
  const [drugAnalysis, setDrugAnalysis] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (input.trim() === "") return

    const newMessages = [...messages, { role: "user", content: input }]

    setMessages(newMessages)
    setInput("")
    simulateResponse(input)
  }

  const simulateResponse = (userMessage) => {
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      let response

      if (userMessage.toLowerCase().includes("headache")) {
        response =
          "Headaches can have many causes including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, over-the-counter pain relievers like acetaminophen or ibuprofen may help. If you're experiencing frequent or severe headaches, I'd recommend consulting with a healthcare provider."
      } else if (userMessage.toLowerCase().includes("blood pressure")) {
        response =
          "Normal blood pressure is typically around 120/80 mmHg. High blood pressure (hypertension) is generally considered to be 130/80 mmHg or higher. Lifestyle factors that can help manage blood pressure include regular exercise, reducing sodium intake, maintaining a healthy weight, limiting alcohol, and managing stress."
      } else if (userMessage.toLowerCase().includes("diabetes")) {
        response =
          "Diabetes is a condition where your body either doesn't produce enough insulin or can't effectively use the insulin it produces. Key symptoms include increased thirst, frequent urination, hunger, fatigue, and blurred vision. Managing diabetes typically involves monitoring blood sugar, medication or insulin therapy, healthy eating, and regular physical activity."
      } else if (userMessage.toLowerCase().includes("heart rate")) {
        response =
          "Your current heart rate is 72 BPM, which is within the normal range. A normal resting heart rate for adults is typically between 60-100 BPM. Factors like age, fitness level, and medications can affect heart rate."
      } else if (userMessage.toLowerCase().includes("diet")) {
        response =
          "For weight loss, a balanced diet that includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats is recommended. Portion control and regular physical activity are also important. It's best to consult with a healthcare provider or dietitian for personalized advice."
      } else if (userMessage.toLowerCase().includes("covid 19")) {
        response =
          "Common symptoms of COVID-19 include fever, cough, shortness of breath, fatigue, muscle aches, loss of taste or smell, and sore throat. If you're experiencing symptoms or have been exposed to someone with COVID-19, it's important to get tested and follow public health guidelines."
        }
      else {
        response =
          "Thank you for your question. While I can provide general health information, remember that I'm an AI assistant and not a substitute for professional medical advice. For personalized guidance, please consult with a healthcare provider."
      }

      setMessages((prev) => [...prev, { role: "system", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setDrugImage(event.target.result)
        simulateDrugAnalysis()
      }
      reader.readAsDataURL(file)
    }
  }

  const simulateDrugAnalysis = () => {
    // Simulate drug analysis
    setTimeout(() => {
      setDrugAnalysis({
        name: "Lisinopril",
        dosage: "10mg",
        purpose: "ACE inhibitor used to treat high blood pressure and heart failure",
        sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
        interactions: [
          "NSAIDs (like ibuprofen) may reduce effectiveness",
          "Potassium supplements may cause high potassium levels",
          "Lithium levels may increase when taken with lisinopril",
        ],
        alternatives: [
          "Losartan (Angiotensin II receptor blocker)",
          "Amlodipine (Calcium channel blocker)",
          "Hydrochlorothiazide (Diuretic)",
        ],
      })
    }, 2000)
  }

  const clearDrugAnalysis = () => {
    setDrugImage(null)
    setDrugAnalysis(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Health Assistant</h1>
        <p className="text-muted-foreground">Chat with our AI about health concerns and medications</p>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="drug-analysis">Drug Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle>AI Health Chat</CardTitle>
              <CardDescription>Ask questions about symptoms, conditions, or general health advice</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className={message.role === "user" ? "bg-blue-100" : "bg-green-100"}>
                        <div className={message.role === "user" ? "text-blue-700" : "text-green-700"}>
                          {message.role === "user" ? "U" : "AI"}
                        </div>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <Avatar className="bg-green-100">
                        <div className="text-green-700">AI</div>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your health question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage} disabled={input.trim() === ""}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This AI assistant provides general health information only and is not a substitute for professional
              medical advice, diagnosis, or treatment.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="drug-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medication Analysis</CardTitle>
              <CardDescription>Upload a photo of your medication for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!drugImage ? (
                <div className="border-2 border-dashed rounded-lg p-10 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Take or upload a photo of your medication</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Our AI will identify the medication and provide information
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleCameraClick}>
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={drugImage || "/placeholder.svg"}
                      alt="Medication"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearDrugAnalysis}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {drugAnalysis ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                        <h3 className="font-medium text-lg text-green-800 mb-1">
                          {drugAnalysis.name} ({drugAnalysis.dosage})
                        </h3>
                        <p className="text-green-700">{drugAnalysis.purpose}</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            Side Effects
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {drugAnalysis.sideEffects.map((effect, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            Drug Interactions
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {drugAnalysis.interactions.map((interaction, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{interaction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2">Alternative Medications</h4>
                        <div className="grid gap-2 md:grid-cols-3">
                          {drugAnalysis.alternatives.map((alt, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                              {alt}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        <p>Analyzing medication...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Read Aloud
              </Button>
              {drugAnalysis && <Button>Save Analysis</Button>}
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              Always consult with a healthcare professional or pharmacist before making any changes to your medication
              regimen.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}