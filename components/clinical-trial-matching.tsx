"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Building, Filter, BookmarkPlus, ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ClinicalTrialMatching() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const mockTrials = [
    {
      id: "NCT01234567",
      title: "Novel Treatment for Type 2 Diabetes",
      sponsor: "University Medical Center",
      location: "Boston, MA",
      distance: "5 miles away",
      phase: "Phase 3",
      status: "Recruiting",
      posted: "2 weeks ago",
      eligibility: "Adults 18-75 with Type 2 Diabetes",
      description:
        "This study evaluates the efficacy and safety of a new oral medication for managing blood glucose levels in patients with Type 2 Diabetes who have not achieved adequate control with current treatments.",
      tags: ["Diabetes", "Endocrinology", "Oral Medication"],
    },
    {
      id: "NCT02345678",
      title: "Hypertension Management Study",
      sponsor: "National Heart Institute",
      location: "Chicago, IL",
      distance: "Virtual participation available",
      phase: "Phase 2",
      status: "Recruiting",
      posted: "5 days ago",
      eligibility: "Adults 30-65 with high blood pressure",
      description:
        "This trial investigates a new approach to blood pressure management combining medication with lifestyle modifications, aimed at patients with resistant hypertension.",
      tags: ["Hypertension", "Cardiology", "Lifestyle Intervention"],
    },
    {
      id: "NCT03456789",
      title: "Cognitive Behavioral Therapy for Anxiety",
      sponsor: "Mental Health Research Center",
      location: "Online Study",
      distance: "Virtual participation available",
      phase: "N/A",
      status: "Recruiting",
      posted: "1 month ago",
      eligibility: "Adults 18+ diagnosed with Generalized Anxiety Disorder",
      description:
        "This study evaluates the effectiveness of a digital cognitive behavioral therapy program for managing symptoms of generalized anxiety disorder.",
      tags: ["Mental Health", "Anxiety", "Digital Therapy"],
    },
    {
      id: "NCT04567890",
      title: "Rheumatoid Arthritis Biologic Treatment",
      sponsor: "Arthritis Research Foundation",
      location: "Multiple Locations",
      distance: "Nearest: 12 miles away",
      phase: "Phase 3",
      status: "Recruiting",
      posted: "3 weeks ago",
      eligibility: "Adults 18+ with moderate to severe rheumatoid arthritis",
      description:
        "This clinical trial tests a new biologic medication for patients with rheumatoid arthritis who have had an inadequate response to conventional treatments.",
      tags: ["Rheumatoid Arthritis", "Immunology", "Biologics"],
    },
  ]

  const filteredTrials = mockTrials.filter(
    (trial) =>
      trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clinical Trial Matching</h1>
        <p className="text-muted-foreground">Find clinical trials that match your health profile</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Find Clinical Trials</CardTitle>
              <CardDescription>Search for trials by condition, treatment, or location</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search conditions or treatments..."
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
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="location" className="text-sm">
                  Location
                </Label>
                <div className="flex mt-1">
                  <Input id="location" placeholder="City, State or ZIP" />
                </div>
              </div>

              <div>
                <Label htmlFor="distance" className="text-sm">
                  Distance
                </Label>
                <Select defaultValue="50">
                  <SelectTrigger id="distance" className="mt-1">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                    <SelectItem value="100">Within 100 miles</SelectItem>
                    <SelectItem value="any">Any distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phase" className="text-sm">
                  Trial Phase
                </Label>
                <Select defaultValue="any">
                  <SelectTrigger id="phase" className="mt-1">
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Phase</SelectItem>
                    <SelectItem value="early">Early Phase 1</SelectItem>
                    <SelectItem value="phase1">Phase 1</SelectItem>
                    <SelectItem value="phase2">Phase 2</SelectItem>
                    <SelectItem value="phase3">Phase 3</SelectItem>
                    <SelectItem value="phase4">Phase 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Recruitment Status</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="recruiting" defaultChecked />
                    <label htmlFor="recruiting" className="text-sm">
                      Recruiting
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="not-recruiting" />
                    <label htmlFor="not-recruiting" className="text-sm">
                      Not Recruiting
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="completed" />
                    <label htmlFor="completed" className="text-sm">
                      Completed
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active" />
                    <label htmlFor="active" className="text-sm">
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                Reset
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        )}

        <CardContent className="pt-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Trials</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {filteredTrials.length > 0 ? (
                filteredTrials.map((trial) => (
                  <Card key={trial.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{trial.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Building className="h-4 w-4" />
                              <span>{trial.sponsor}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <BookmarkPlus className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div className="text-sm">
                              <div>{trial.location}</div>
                              <div className="text-gray-500">{trial.distance}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div className="text-sm">
                              <div>{trial.status}</div>
                              <div className="text-gray-500">Posted {trial.posted}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div className="text-sm">
                              <div>{trial.phase}</div>
                              <div className="text-gray-500">{trial.eligibility}</div>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-600">{trial.description}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {trial.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                      <div className="text-sm text-gray-500">ID: {trial.id}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Check Eligibility
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No trials found</h3>
                  <p className="text-gray-500 mt-1">
                    Try adjusting your search or filters to find more clinical trials
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommended">
              <div className="text-center py-12">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">Complete your health profile</h3>
                <p className="text-gray-500 mt-1 max-w-md mx-auto">
                  To get personalized trial recommendations, please complete your health profile with your conditions
                  and medications.
                </p>
                <Button className="mt-4">Complete Health Profile</Button>
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="text-center py-12">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <BookmarkPlus className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No saved trials</h3>
                <p className="text-gray-500 mt-1">
                  You haven't saved any clinical trials yet. Click the bookmark icon to save trials for later.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

