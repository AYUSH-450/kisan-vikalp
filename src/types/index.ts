export type Role = 'farmer' | 'officer' | 'admin';

export type Status = 'Booked' | 'Confirmed' | 'Checked In' | 'Quality Inspection' | 'Weighing' | 'Completed' | 'Paid';

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  preferredLanguage: string;
}

export interface Centre {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  capacity: number;
  currentQueue: number;
  averageWaitTimeMin: number;
  processingRatePerHour: number;
  status: 'Low Load' | 'Medium Load' | 'High Load' | 'Offline';
  expectedArrivals?: number;
  activeCounters?: number;
  totalCounters?: number;
  risk?: string;
}

export interface Forecast {
  centreId: string;
  date: string;
  predictedFarmers: number;
  predictedDemand: string;
  availableCapacity: number;
  congestionRisk: string;
  confidence: string;
  recommendations: string[];
}

export interface Transaction {
  id: string;
  secureToken: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  expectedQuantity: number;
  actualQuantity?: number;
  centreId: string;
  centreName: string;
  bookingDate: string;
  slot: string;
  tokenNumber?: string;
  expectedServiceTime?: string;
  recommendedDepartureTime?: string;
  status: Status;
  paymentAmount?: number;
  paymentStatus?: 'Pending' | 'Processing' | 'Completed';
  paymentTransactionId?: string;
}

export interface Slot {
  time: string;
  status: 'Almost full' | 'Moderate' | 'Recommended' | 'Available' | 'Limited';
}

export interface Alert {
  id: string;
  centreId: string;
  centreName: string;
  severity: 'Critical' | 'Warning' | 'Info';
  time: string;
  description: string;
  recommendedAction: string;
  status?: 'New' | 'Acknowledged' | 'Resolved';
}
