import type { Transaction, Centre, Slot, Alert, Farmer } from '../types';

export const MOCK_FARMER: Farmer = {
  id: 'F12345',
  name: 'Ramesh Kumar',
  phone: '+91 9876543210',
  preferredLanguage: 'English',
};

let currentTransaction: Transaction = {
  id: 'TX938421',
  secureToken: 'SP-TX938421-SECURE',
  farmerId: 'F12345',
  farmerName: 'Ramesh Kumar',
  crop: 'Paddy',
  expectedQuantity: 30,
  actualQuantity: 29.6,
  centreId: 'C_B',
  centreName: 'Centre B',
  bookingDate: '2026-09-10',
  slot: '10:40 AM',
  tokenNumber: 'A042',
  expectedServiceTime: '11:35 AM',
  recommendedDepartureTime: '11:01 AM',
  status: 'Confirmed',
  paymentAmount: 58200,
  paymentStatus: 'Processing',
  paymentTransactionId: 'PAY92831',
};

export const MOCK_CENTRES: Centre[] = [
  {
    id: 'C_A',
    name: 'Centre A',
    location: 'District North',
    coordinates: [28.6139, 77.2090], // mock lat lng
    capacity: 400,
    currentQueue: 142,
    averageWaitTimeMin: 78,
    processingRatePerHour: 12,
    status: 'High Load',
    expectedArrivals: 180,
    activeCounters: 2,
    totalCounters: 3,
    risk: 'High',
  },
  {
    id: 'C_B',
    name: 'Centre B',
    location: 'District East',
    coordinates: [28.6200, 77.2100],
    capacity: 350,
    currentQueue: 34,
    averageWaitTimeMin: 24,
    processingRatePerHour: 20,
    status: 'Low Load',
    expectedArrivals: 80,
    activeCounters: 3,
    totalCounters: 3,
    risk: 'Low',
  },
  {
    id: 'C_C',
    name: 'Centre C',
    location: 'District South',
    coordinates: [28.6300, 77.2200],
    capacity: 500,
    currentQueue: 80,
    averageWaitTimeMin: 45,
    processingRatePerHour: 15,
    status: 'Medium Load',
    expectedArrivals: 120,
    activeCounters: 4,
    totalCounters: 5,
    risk: 'Low',
  },
  {
    id: 'C_D',
    name: 'Centre D',
    location: 'District West',
    coordinates: [28.6400, 77.1900],
    capacity: 300,
    currentQueue: 110,
    averageWaitTimeMin: 65,
    processingRatePerHour: 14,
    status: 'Medium Load',
    expectedArrivals: 150,
    activeCounters: 2,
    totalCounters: 4,
    risk: 'Medium',
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'A1',
    centreId: 'C_A',
    centreName: 'Centre A',
    severity: 'Critical',
    time: '10:15 AM',
    description: 'High congestion detected.',
    recommendedAction: 'Redirect new bookings to Centre C.',
    status: 'New'
  },
  {
    id: 'A2',
    centreId: 'C_D',
    centreName: 'Centre D',
    severity: 'Warning',
    time: '09:45 AM',
    description: 'Processing slowdown.',
    recommendedAction: 'Monitor processing rate closely.',
    status: 'Acknowledged'
  },
];

export const MOCK_FORECASTS = [
  {
    centreId: 'C_A',
    date: 'Tomorrow',
    predictedFarmers: 470,
    predictedDemand: 'Very High',
    availableCapacity: 400,
    congestionRisk: 'HIGH',
    confidence: '92%',
    recommendations: [
      'Increase counter availability (Counter 3 offline).',
      'Adjust available booking slots downward by 15%.',
      'Recommend redirecting new bookings to nearby Centre B.',
      'Consider temporary staffing support.'
    ]
  },
  {
    centreId: 'C_B',
    date: 'Tomorrow',
    predictedFarmers: 220,
    predictedDemand: 'Normal',
    availableCapacity: 350,
    congestionRisk: 'LOW',
    confidence: '88%',
    recommendations: [
      'Current capacity sufficient.',
      'Can absorb overflow from Centre A.'
    ]
  }
];

class MockDataService {
  async getFarmerDashboard() {
    return {
      farmer: MOCK_FARMER,
      upcomingTransaction: currentTransaction,
      queueStatus: {
        currentlyServing: 'A034',
        farmersAhead: 7,
        estimatedWaitMin: 32,
      },
    };
  }

  async getProcurementCentres() {
    return MOCK_CENTRES;
  }

  async getAvailableSlots(): Promise<Slot[]> {
    return [
      { time: '09:00 AM', status: 'Almost full' },
      { time: '09:40 AM', status: 'Moderate' },
      { time: '10:20 AM', status: 'Recommended' },
      { time: '11:00 AM', status: 'Available' },
      { time: '11:40 AM', status: 'Available' },
      { time: '12:20 PM', status: 'Limited' },
    ];
  }

  async createBooking(data: Partial<Transaction>) {
    currentTransaction = { ...currentTransaction, ...data, id: `TX${Math.floor(Math.random() * 1000000)}` };
    return currentTransaction;
  }

  async getTransaction(id: string) {
    if (id === currentTransaction.id || id === currentTransaction.secureToken) {
      return currentTransaction;
    }
    throw new Error('Transaction not found');
  }

  async getQueue(_centreId: string) {
    return {
      currentlyServing: 'A034',
      next: ['A035', 'A036', 'A037', 'A038', 'A039', 'A040', 'A041', 'A042'],
      averageWaitTimeMin: 34,
    };
  }

  async verifySecureToken(secureToken: string) {
    return this.getTransaction(secureToken);
  }

  async checkInFarmer(_transactionId: string) {
    currentTransaction = { ...currentTransaction, status: 'Checked In' };
    return currentTransaction;
  }

  async updateQuality(_transactionId: string, _qualityData: any) {
    currentTransaction = { ...currentTransaction, status: 'Quality Inspection' };
    return currentTransaction;
  }

  async updateWeight(_transactionId: string, weight: number) {
    currentTransaction = { ...currentTransaction, actualQuantity: weight, status: 'Weighing' };
    return currentTransaction;
  }

  async completeProcurement(_transactionId: string) {
    currentTransaction = { ...currentTransaction, status: 'Completed' };
    return currentTransaction;
  }

  async getPaymentStatus(_transactionId: string) {
    return { paymentAmount: 58200, paymentStatus: currentTransaction.paymentStatus, paymentTransactionId: 'PAY92831' };
  }

  async getAdminStats() {
    return {
      totalCentres: 128,
      active: 121,
      farmersToday: 18420,
      completed: 12840,
      averageWaitMin: 31,
      averageProcessingMin: 19,
      capacityPercent: 76,
      highRiskCentres: 8,
    };
  }

  async getAlerts() {
    return MOCK_ALERTS;
  }
  
  async getAIForecasts() {
    return MOCK_FORECASTS;
  }

  async resetDemo() {
    currentTransaction = {
      id: 'TX938421',
      secureToken: 'SP-TX938421-SECURE',
      farmerId: 'F12345',
      farmerName: 'Ramesh Kumar',
      crop: 'Paddy',
      expectedQuantity: 30,
      actualQuantity: 29.6,
      centreId: 'C_B',
      centreName: 'Centre B',
      bookingDate: '2026-09-10',
      slot: '10:40 AM',
      tokenNumber: 'A042',
      expectedServiceTime: '11:35 AM',
      recommendedDepartureTime: '11:01 AM',
      status: 'Confirmed',
      paymentAmount: 58200,
      paymentStatus: 'Processing',
      paymentTransactionId: 'PAY92831',
    };
    return currentTransaction;
  }
}

export const mockService = new MockDataService();
