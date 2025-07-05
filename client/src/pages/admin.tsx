import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Calendar, User, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { getQueryFn } from "@/lib/queryClient";
import { type Contact } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn<Contact[]>({ on401: "throw" }),
  });

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/")}
                className="text-slate-600 hover:text-navy-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-navy-800">Admin Dashboard</h1>
                <p className="text-slate-600">Manage contact messages from your portfolio</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {contacts.length} Total Messages
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-600">Total Messages</p>
                    <p className="text-2xl font-bold text-navy-800">{contacts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-slate-600">Today</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {contacts.filter(c => 
                        new Date(c.createdAt).toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-slate-600">Unique Contacts</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {new Set(contacts.map(c => c.email)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-slate-600">Latest Message</p>
                    <p className="text-sm font-medium text-navy-800">
                      {contacts.length > 0 
                        ? formatDate(contacts[0].createdAt).split(',')[0]
                        : 'No messages'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Input
            placeholder="Search messages by name, email, subject, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          {filteredContacts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {searchTerm ? 'No matching messages' : 'No messages yet'}
                </h3>
                <p className="text-slate-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Contact messages from your portfolio will appear here'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-navy-800">
                        {contact.firstName} {contact.lastName}
                      </CardTitle>
                      <p className="text-blue-600">{contact.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {contact.subject}
                      </Badge>
                      <p className="text-sm text-slate-500">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank')}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}