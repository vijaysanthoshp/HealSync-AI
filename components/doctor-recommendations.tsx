"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Star, Calendar, Phone, Mail, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Doctor {
  id: number
  name: string
  specialty: string
  hospital: string
  location: string
  distance: string
  rating: number
  reviews: number
  availability: string
  education: string
  experience: string
  languages: string[]
  insurances: string[]
  image: string
}

interface Filters {
  specialty: string
  location: string
  insurance: string
  availability: string
}

export default function DoctorRecommendations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    specialty: "any",
    location: "",
    insurance: "any",
    availability: "any"
  })
  const [activeTab, setActiveTab] = useState("recommended")

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "Heart & Vascular Institute",
      location: "123 Medical Center Dr, Boston, MA",
      distance: "2.3 miles away",
      rating: 4.8,
      reviews: 124,
      availability: "Next available: Tomorrow, 10:00 AM",
      education: "Harvard Medical School",
      experience: "15 years",
      languages: ["English", "Spanish"],
      insurances: ["Blue Cross", "Aetna", "Medicare"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      hospital: "Diabetes & Endocrine Center",
      location: "456 Health Parkway, Boston, MA",
      distance: "3.5 miles away",
      rating: 4.6,
      reviews: 98,
      availability: "Next available: Friday, 2:30 PM",
      education: "Johns Hopkins University",
      experience: "12 years",
      languages: ["English", "Mandarin"],
      insurances: ["Blue Cross", "United Healthcare", "Cigna"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      hospital: "Neuroscience Center",
      location: "789 Brain Health Blvd, Boston, MA",
      distance: "5.1 miles away",
      rating: 4.9,
      reviews: 156,
      availability: "Next available: Monday, 9:15 AM",
      education: "Stanford University",
      experience: "18 years",
      languages: ["English", "Spanish", "Portuguese"],
      insurances: ["Aetna", "Cigna", "Medicare", "Medicaid"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      specialty: "Dermatologist",
      hospital: "Skin Health Clinic",
      location: "321 Dermatology Way, Boston, MA",
      distance: "1.8 miles away",
      rating: 4.5,
      reviews: 87,
      availability: "Next available: Thursday, 11:45 AM",
      education: "Yale School of Medicine",
      experience: "9 years",
      languages: ["English"],
      insurances: ["Blue Cross", "Aetna", "United Healthcare"],
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const filteredDoctors = useMemo(() => {
    let filtered = [...mockDoctors]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply specialty filter
    if (filters.specialty !== "any") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty.toLowerCase() === filters.specialty.toLowerCase()
      )
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(
        (doctor) => doctor.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Apply insurance filter
    if (filters.insurance !== "any") {
      filtered = filtered.filter(
        (doctor) => doctor.insurances.some(i => i.toLowerCase() === filters.insurance.toLowerCase())
      )
    }

    // Apply availability filter
    if (filters.availability !== "any") {
      const today = new Date()
      filtered = filtered.filter((doctor) => {
        const availDate = doctor.availability.toLowerCase()
        switch (filters.availability) {
          case "today":
            return availDate.includes("today")
          case "tomorrow":
            return availDate.includes("tomorrow")
          case "this-week":
            return !availDate.includes("next")
          case "next-week":
            return availDate.includes("next")
          default:
            return true
        }
      })
    }

    return filtered
  }, [mockDoctors, searchQuery, filters])

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      specialty: "any",
      location: "",
      insurance: "any",
      availability: "any"
    })
    setSearchQuery("")
  }

  const handleBookAppointment = (doctorId: number) => {
    // Implement booking logic here
    alert(`Booking appointment with doctor ${doctorId}`)
  }

  const handleCallDoctor = (doctorId: number) => {
    // Implement call logic here
    alert(`Calling doctor ${doctorId}`)
  }

  const handleMessageDoctor = (doctorId: number) => {
    // Implement messaging logic here
    alert(`Messaging doctor ${doctorId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Doctor Recommendations</h1>
        <p className="text-muted-foreground">Find the right healthcare providers for your needs</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Find Doctors</CardTitle>
              <CardDescription>Search by specialty, name, or condition</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search doctors or specialties..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setFiltersOpen(!filtersOpen)}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {filtersOpen && (
          <CardContent className="pb-3 border-b">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="specialty" className="text-sm">
                  Specialty
                </Label>
                <Select 
                  value={filters.specialty} 
                  onValueChange={(value) => handleFilterChange("specialty", value)}
                >
                  <SelectTrigger id="specialty" className="mt-1">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Specialty</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm">
                  Location
                </Label>
                <div className="flex mt-1">
                  <Input 
                    id="location" 
                    placeholder="City, State or ZIP"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="insurance" className="text-sm">
                  Insurance
                </Label>
                <Select 
                  value={filters.insurance}
                  onValueChange={(value) => handleFilterChange("insurance", value)}
                >
                  <SelectTrigger id="insurance" className="mt-1">
                    <SelectValue placeholder="Select insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Insurance</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="bluecross">Blue Cross</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="united">United Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-sm">Availability</Label>
              <RadioGroup 
                value={filters.availability}
                onValueChange={(value) => handleFilterChange("availability", value)}
                className="flex flex-wrap gap-4 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="today" />
                  <Label htmlFor="today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tomorrow" id="tomorrow" />
                  <Label htmlFor="tomorrow">Tomorrow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="this-week" id="this-week" />
                  <Label htmlFor="this-week">This week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="next-week" id="next-week" />
                  <Label htmlFor="next-week">Next week</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2" onClick={resetFilters}>
                Reset
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        )}

        <CardContent className="pt-6">
          <Tabs defaultValue="recommended">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-4 space-y-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-[120px] p-4 flex items-center justify-center">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="rounded-full h-20 w-20 object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <span>{doctor.specialty}</span>
                              <span>•</span>
                              <span>{doctor.hospital}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span className="text-sm text-gray-500">({doctor.reviews})</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div className="text-sm">
                              <div>{doctor.location}</div>
                              <div className="text-gray-500">{doctor.distance}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div className="text-sm">
                              <div>{doctor.availability}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm font-medium">Education & Experience</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {doctor.education} • {doctor.experience} experience
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {doctor.languages.map((language, index) => (
                            <Badge key={index} variant="outline">
                              {language}
                            </Badge>
                          ))}
                          {doctor.insurances.map((insurance, index) => (
                            <Badge key={index} variant="secondary">
                              {insurance}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => handleCallDoctor(doctor.id)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleMessageDoctor(doctor.id)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                      <Button size="sm" onClick={() => handleBookAppointment(doctor.id)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No doctors found</h3>
                  <p className="text-gray-500 mt-1">
                    Try adjusting your search or filters to find more healthcare providers
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="nearby">
              <div className="mt-4">
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Map view will display nearby doctors</p>
                      <Button className="mt-4">Enable Location</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="top-rated">
              <div className="mt-4 space-y-4">
                {mockDoctors
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 2)
                  .map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-[120px] p-4 flex items-center justify-center">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="rounded-full h-20 w-20 object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{doctor.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>{doctor.specialty}</span>
                                <span>•</span>
                                <span>{doctor.hospital}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span className="text-sm text-gray-500">({doctor.reviews})</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <div className="text-sm">
                                <div>{doctor.location}</div>
                                <div className="text-gray-500">{doctor.distance}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <div className="text-sm">
                                <div>{doctor.availability}</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="text-sm font-medium">Education & Experience</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {doctor.education} • {doctor.experience} experience
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {doctor.languages.map((language, index) => (
                              <Badge key={index} variant="outline">
                                {language}
                              </Badge>
                            ))}
                            {doctor.insurances.map((insurance, index) => (
                              <Badge key={index} variant="secondary">
                                {insurance}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" onClick={() => handleCallDoctor(doctor.id)}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleMessageDoctor(doctor.id)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </div>
                        <Button size="sm" onClick={() => handleBookAppointment(doctor.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Appointment
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

