import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Mail, Calendar, User, MessageSquare, ArrowLeft, Star, Check, Trash2, Archive, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { getQueryFn, queryClient, apiRequest } from "@/lib/queryClient";
import { type Contact } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn<Contact[]>({ on401: "throw" }),
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Contact> }) => {
      return apiRequest(`/api/contacts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({
        title: "Success",
        description: "Contact updated successfully",
      });
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: number[]; updates: Partial<Contact> }) => {
      return apiRequest("/api/contacts/bulk", {
        method: "PATCH",
        body: JSON.stringify({ ids, updates }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      setSelectedContacts([]);
      toast({
        title: "Success",
        description: "Contacts updated successfully",
      });
    },
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "read" && contact.isRead) ||
      (statusFilter === "unread" && !contact.isRead) ||
      (statusFilter === "starred" && contact.isStarred);
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contactId: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedContacts.length === 0) return;
    
    let updates: Partial<Contact> = {};
    switch (action) {
      case "mark-read":
        updates = { isRead: true };
        break;
      case "mark-unread":
        updates = { isRead: false };
        break;
      case "star":
        updates = { isStarred: true };
        break;
      case "unstar":
        updates = { isStarred: false };
        break;
    }
    
    bulkUpdateMutation.mutate({ ids: selectedContacts, updates });
  };

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
                  <Check className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-slate-600">Read Messages</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {contacts.filter(c => c.isRead).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-slate-600">Starred</p>
                    <p className="text-2xl font-bold text-navy-800">
                      {contacts.filter(c => c.isStarred).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
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
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search messages by name, email, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedContacts.length > 0 && (
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-navy-800">
                      {selectedContacts.length} message{selectedContacts.length !== 1 ? 's' : ''} selected
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("mark-read")}
                        disabled={bulkUpdateMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark Read
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("mark-unread")}
                        disabled={bulkUpdateMutation.isPending}
                      >
                        Mark Unread
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("star")}
                        disabled={bulkUpdateMutation.isPending}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Star
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("unstar")}
                        disabled={bulkUpdateMutation.isPending}
                      >
                        Unstar
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedContacts([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          {filteredContacts.length > 0 && (
            <div className="flex items-center space-x-4 mb-4">
              <Checkbox
                checked={selectedContacts.length === filteredContacts.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-slate-600">
                Select all ({filteredContacts.length} messages)
              </span>
            </div>
          )}
          
          {filteredContacts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {searchTerm || statusFilter !== "all" ? 'No matching messages' : 'No messages yet'}
                </h3>
                <p className="text-slate-600">
                  {searchTerm || statusFilter !== "all"
                    ? 'Try adjusting your search terms or filters' 
                    : 'Contact messages from your portfolio will appear here'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => (
              <Card 
                key={contact.id} 
                className={`hover:shadow-md transition-shadow ${!contact.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CardTitle className={`text-lg ${!contact.isRead ? 'text-navy-800 font-bold' : 'text-slate-700'}`}>
                              {contact.firstName} {contact.lastName}
                            </CardTitle>
                            {!contact.isRead && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                New
                              </Badge>
                            )}
                            {contact.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-blue-600">{contact.email}</p>
                        </div>
                        <div className="text-right flex flex-col items-end space-y-2">
                          <Badge variant="outline" className="mb-1">
                            {contact.subject}
                          </Badge>
                          <p className="text-sm text-slate-500">
                            {formatDate(contact.createdAt)}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => updateContactMutation.mutate({ 
                                  id: contact.id, 
                                  updates: { isRead: !contact.isRead } 
                                })}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Mark as {contact.isRead ? 'Unread' : 'Read'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => updateContactMutation.mutate({ 
                                  id: contact.id, 
                                  updates: { isStarred: !contact.isStarred } 
                                })}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                {contact.isStarred ? 'Unstar' : 'Star'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-8">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank');
                          if (!contact.isRead) {
                            updateContactMutation.mutate({ 
                              id: contact.id, 
                              updates: { isRead: true } 
                            });
                          }
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </Button>
                    </div>
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