'use client';

import { useState } from "react";
import { Promise } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateId, addDays } from "@/lib/utils";
import { X, Calendar, Clock, MapPin } from "lucide-react";

interface NewPromiseFormProps {
  onSave: (promise: Promise) => void;
  onCancel: () => void;
}

export function NewPromiseForm({ onSave, onCancel }: NewPromiseFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    timeSpecific: true,
    time: '09:00',
    placeSpecific: false,
    place: '',
    category: 'personal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const now = new Date();
    const promise: Promise = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      duration: formData.duration,
      startDate: now,
      endDate: addDays(now, formData.duration),
      timeSpecific: formData.timeSpecific,
      time: formData.timeSpecific ? formData.time : undefined,
      placeSpecific: formData.placeSpecific,
      place: formData.placeSpecific ? formData.place.trim() : undefined,
      category: formData.category,
      status: 'active',
      createdAt: now,
      updatedAt: now
    };

    onSave(promise);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-gray-900">Make a New Promise</CardTitle>
        <Button onClick={onCancel} variant="ghost" size="icon">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Promise Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="e.g., Daily post on X for 30 days"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Add any additional details about your promise..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Duration (days)
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => updateFormData('duration', parseInt(e.target.value) || 1)}
                min="1"
                max="365"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">days</span>
            </div>
          </div>

          {/* Time Specific */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="timeSpecific"
                checked={formData.timeSpecific}
                onChange={(e) => updateFormData('timeSpecific', e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="timeSpecific" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Set a specific time
              </label>
            </div>
            {formData.timeSpecific && (
              <div className="ml-6">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData('time', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Place Specific */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="placeSpecific"
                checked={formData.placeSpecific}
                onChange={(e) => updateFormData('placeSpecific', e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="placeSpecific" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Set a specific place
              </label>
            </div>
            {formData.placeSpecific && (
              <div className="ml-6">
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => updateFormData('place', e.target.value)}
                  placeholder="e.g., Home office, Gym, Coffee shop"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="health">Health & Fitness</option>
              <option value="work">Work & Career</option>
              <option value="social">Social Media</option>
              <option value="learning">Learning</option>
              <option value="creative">Creative</option>
              <option value="relationships">Relationships</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Promise
            </Button>
            <Button type="button" onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 