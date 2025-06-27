import { PersonDto } from '@/shared/models/account/PersonDto';
import { createTravelerTicketDto } from '@/shared/models/ticketOrder/createTravelerTicketDto';
import { TransportationSearchResult } from '@/shared/models/transportation/transportationSearchResult';
import { create } from 'zustand';

const defaultTraveler: createTravelerTicketDto = {
  id: 0,
  creatorAccountId: 0,
  firstName: '',
  lastName: '',
  genderId: 0,
  birthDate: '',
  idNumber: '',
  phoneNumber: '',
  englishFirstName: '',
  englishLastName: '',
  isVIP: false,
  seatId: null,
  description: '',
};

type ReservationStep = "transportation" | "travelers" | "review" | "payment" | "success";

interface ReservationState {
  transportation: TransportationSearchResult | null;
  travelers: createTravelerTicketDto[];
  ticketOrderId: number;
  couponCode: string | null;
  paymentInfo: any;
  people: PersonDto[],
  currentStep: ReservationStep,
  isConfirmed: boolean,
  isPayed: boolean,
  isTravelerPartDone: boolean, 
  addTraveler: (traveler: createTravelerTicketDto) => void;
  setTravelers: (travelers: createTravelerTicketDto[]) => void;
  updateTraveler: (index: number, traveler: createTravelerTicketDto) => void;
  removeTraveler: (index: number) => void;
  setTicketOrderId: (newId: number) => void;
  setTransportation: (transportation: TransportationSearchResult) => void;
  setCouponCode: (code: string | null) => void;
  setPaymentInfo: (info: any) => void;
  setPeople: (people: PersonDto[]) => void;

  setCurrentStep: (step: ReservationStep) => void;
  setIsConfirmed: (value: boolean) => void;
  setIsPayed: (value: boolean) => void;
  setIsTravelerPartDone: (value: boolean) => void;

  resetReservation: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  transportation: null,
  people: [],
  travelers: [defaultTraveler],
  couponCode: null,
  paymentInfo: null,
  ticketOrderId : 0,
  currentStep: "transportation",
  isConfirmed: false,
  isPayed : false,
  isTravelerPartDone : false,
  setTicketOrderId: (newId) => set(() =>({
      ticketOrderId : newId
  })),
  addTraveler: (traveler) => set((state) => ({ travelers: [...state.travelers, traveler] })),
  setTravelers: (newTravelers) => set(() => ({
    travelers : newTravelers
  })),
  setPeople: (newPeople) => set(() => ({
    people : newPeople
  })),
  updateTraveler: (index, traveler) =>
    set((state) => {
      const updated = [...state.travelers];
      updated[index] = traveler;
      return { travelers: updated };
    }),

  removeTraveler: (index) =>
    set((state) => {
      if (state.travelers.length <= 1) return state;
      const updated = [...state.travelers];
      updated.splice(index, 1);
      return { travelers: updated };
    }),

  setTransportation: (theTransportation) => set({ transportation: theTransportation }),
  setCouponCode: (code) => set({ couponCode: code }),
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  setCurrentStep: (step) => set({ currentStep: step }),

  resetReservation: () =>
    set({
      transportation: null,
      travelers: [],
      ticketOrderId: 0,
      couponCode: null,
      paymentInfo: null,
      people: [],
      currentStep: "transportation",
      isConfirmed: false,
      isPayed: false,
      isTravelerPartDone: false
    }),
    
  setIsConfirmed: (value) => set(() => ({
    isConfirmed : value
  })),
  setIsPayed: (value) => set(() => ({
    isPayed : value
  })),
  setIsTravelerPartDone: (value) => set(() => ({
    isTravelerPartDone : value
  })),
}));
