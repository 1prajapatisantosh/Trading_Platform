"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [displayName, setDisplayName] = useState("User")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [currentTab, setCurrentTab] = useState("account")

  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully")
  }

  const handleTwoFactorToggle = () => {
    if (twoFactorEnabled) {
      // In a real app, this would need to confirm before disabling 2FA
      setTwoFactorEnabled(false)
      toast.warning("Two-factor authentication disabled")
    } else {
      // In a real app, this would show a 2FA setup flow
      setTwoFactorEnabled(true)
      toast.success("Two-factor authentication enabled")
    }
  }

  const handleLogoutAll = () => {
    toast.success("Logged out from all devices")
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="container max-w-4xl py-8">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{displayName}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                    />
                    <p className="text-sm text-muted-foreground">
                      Your email address is used for login and notifications
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={handleTwoFactorToggle}
                    />
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <Button variant="outline" className="w-auto">
                      Update Password
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Active Sessions</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Last active: Just now
                          </p>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Current
                        </Button>
                      </div>
                      <Button variant="destructive" onClick={handleLogoutAll}>
                        Log Out All Other Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive account updates and security alerts
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="pb-4">
                    <h3 className="font-medium mb-2">Interface Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="showBalances">Show Balances</Label>
                        <Switch id="showBalances" defaultChecked />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="simplifiedView">Simplified Trading View</Label>
                        <Switch id="simplifiedView" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
