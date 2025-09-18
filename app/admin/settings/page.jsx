"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
import { Button } from "../../component/ui/button"
import { Input } from "../../component/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select"
import { Settings, Save, Globe, CreditCard, Truck, Mail, Shield } from "lucide-react"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    siteName: "T-Shirt Store",
    siteDescription: "Premium T-Shirts Collection",
    contactEmail: "admin@tshirtstore.com",
    contactPhone: "+92 300 1234567",
    currency: "PKR",
    timezone: "Asia/Karachi",
    language: "en",
    paymentMethods: {
      cod: true,
      jazzcash: true,
      easypaisa: true,
      bankTransfer: false,
    },
    shippingRates: {
      standard: "150",
      express: "300",
      overnight: "500",
    },
    emailSettings: {
      smtpHost: "",
      smtpPort: "587",
      smtpUser: "",
      smtpPassword: "",
    },
  })

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8 text-gray-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your store configuration</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <Input
                      value={settings.siteName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                      placeholder="Enter site name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <Input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <Input
                      value={settings.contactPhone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="Enter contact phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                    placeholder="Enter site description"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Settings */}
          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Methods</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
                      <div key={method} className="flex items-center justify-between">
                        <span className="text-gray-700 capitalize">
                          {method === "cod" ? "Cash on Delivery" : method}
                        </span>
                        <button
                          onClick={() => handleInputChange("paymentMethods", method, !enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            enabled ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              enabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Settings */}
          {activeTab === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping (PKR)</label>
                    <Input
                      type="number"
                      value={settings.shippingRates.standard}
                      onChange={(e) => handleInputChange("shippingRates", "standard", e.target.value)}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping (PKR)</label>
                    <Input
                      type="number"
                      value={settings.shippingRates.express}
                      onChange={(e) => handleInputChange("shippingRates", "express", e.target.value)}
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overnight Shipping (PKR)</label>
                    <Input
                      type="number"
                      value={settings.shippingRates.overnight}
                      onChange={(e) => handleInputChange("shippingRates", "overnight", e.target.value)}
                      placeholder="500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <Input
                      value={settings.emailSettings.smtpHost}
                      onChange={(e) => handleInputChange("emailSettings", "smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <Input
                      value={settings.emailSettings.smtpPort}
                      onChange={(e) => handleInputChange("emailSettings", "smtpPort", e.target.value)}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <Input
                      value={settings.emailSettings.smtpUser}
                      onChange={(e) => handleInputChange("emailSettings", "smtpUser", e.target.value)}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <Input
                      type="password"
                      value={settings.emailSettings.smtpPassword}
                      onChange={(e) => handleInputChange("emailSettings", "smtpPassword", e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Password Policy</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-gray-700">Require minimum 8 characters</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-gray-700">Require uppercase letters</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-gray-700">Require numbers</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-700">Require special characters</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <Input type="number" defaultValue="30" placeholder="30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
