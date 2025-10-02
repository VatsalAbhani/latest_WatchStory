// client/components/WatchModal.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Interface must be shared so it's consistent with DriftingWatches
export interface SelectedWatch {
  src: string;
  index: number;
}

interface WatchModalProps {
  watch: SelectedWatch;
  onClose: () => void;
}

export default function WatchModal({ watch, onClose }: WatchModalProps) {
  // Mock data to provide unique titles based on the index
  const mockWatchDetails = [
    { brand: "Rolex", model: "Submariner" },
    { brand: "Audemars Piguet", model: "Royal Oak" },
    { brand: "Patek Philippe", model: "Nautilus" },
    { brand: "Richard Mille", model: "RM 011" },
    { brand: "Cartier", model: "Tank" },
    { brand: "Tudor", model: "Black Bay" },
    { brand: "Omega", model: "Speedmaster" },
    { brand: "IWC", model: "Pilot" },
  ];
  
  // Cycle through the mock details using the watch's index
  const details = mockWatchDetails[watch.index % mockWatchDetails.length];

  return (
    <Dialog open={!!watch} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{details.brand} {details.model}</DialogTitle>
          <DialogDescription>
            Reference: RW{watch.index + 1} | Click on a drifting watch to view its story.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center">
          <img 
            src={watch.src} 
            alt="Selected Watch" 
            // Apply a consistent style to display the image nicely
            className="w-full h-auto object-contain max-h-60 rounded-md" 
          />
          <p className="mt-4 text-sm text-center text-offwhite/80">
            This watch is currently drifting towards a new owner. Learn more in the shop.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}