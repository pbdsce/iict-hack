import { create } from "zustand";

interface College {
  id: string;
  name: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  age: string;
  stdCode: string;
  phone: string;
  studentOrProfessional: string;
  collegeOrCompanyName: string;
  githubLink: string;
  linkedinLink: string;
  devfolioLink: string;
}

interface RegistrationState {
  // Current step
  step: number;

  // Team data
  teamName: string;
  teamSize: number;
  participants: Participant[];
  currentParticipantIndex: number;

  // Idea data
  ideaTitle: string;
  document: File | null;

  // UI states
  error: string;
  isSubmitting: boolean;
  isValidating: boolean;
  serverErrors: { [key: string]: string };

  // Error states
  teamNameError: boolean;
  teamSizeError: boolean;
  participantErrors: { [key: string]: boolean };
  ideaTitleError: boolean;
  documentError: boolean;

  // Additional states
  documentFileName: string;
  colleges: College[];
  collegeSearchInput: string;
  isCustomCollege: boolean;
  dropdownVisible: boolean;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Team data setters
  setTeamName: (teamName: string) => void;
  setTeamSize: (teamSize: number) => void;
  setParticipants: (participants: Participant[]) => void;
  setCurrentParticipantIndex: (index: number) => void;
  updateParticipant: (index: number, participant: Partial<Participant>) => void;
  addParticipant: () => void;
  removeParticipant: (index: number) => void;

  // Idea data setters
  setIdeaTitle: (ideaTitle: string) => void;
  setDocument: (document: File | null) => void;

  // UI state setters
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsValidating: (isValidating: boolean) => void;
  setServerErrors: (serverErrors: { [key: string]: string }) => void;

  // Error state setters
  setTeamNameError: (teamNameError: boolean) => void;
  setTeamSizeError: (teamSizeError: boolean) => void;
  setParticipantErrors: (participantErrors: { [key: string]: boolean }) => void;
  setIdeaTitleError: (ideaTitleError: boolean) => void;
  setDocumentError: (documentError: boolean) => void;

  // Additional state setters
  setDocumentFileName: (documentFileName: string) => void;
  setColleges: (colleges: College[]) => void;
  setCollegeSearchInput: (collegeSearchInput: string) => void;
  setIsCustomCollege: (isCustomCollege: boolean) => void;
  setDropdownVisible: (dropdownVisible: boolean) => void;

  // Validation functions
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  validateStep3: () => boolean;
  validateStep4: () => boolean;

  // Reset functions
  resetErrors: () => void;
  resetForm: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  // Initial state
  step: 0,

  // Team data initial values
  teamName: "",
  teamSize: 1,
  participants: [],
  currentParticipantIndex: 0,

  // Idea data initial values
  ideaTitle: "",
  document: null,

  // UI states initial values
  error: "",
  isSubmitting: false,
  isValidating: false,
  serverErrors: {},

  // Error states initial values
  teamNameError: false,
  teamSizeError: false,
  participantErrors: {},
  ideaTitleError: false,
  documentError: false,

  // Additional states initial values
  documentFileName: "",
  colleges: [],
  collegeSearchInput: "",
  isCustomCollege: false,
  dropdownVisible: false,

  // Step actions
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),

  // Team data setters
  setTeamName: (teamName) => set({ teamName }),
  setTeamSize: (teamSize) => set({ teamSize }),
  setParticipants: (participants) => set({ participants }),
  setCurrentParticipantIndex: (index) =>
    set({ currentParticipantIndex: index }),
  updateParticipant: (index, participant) =>
    set((state) => ({
      participants: state.participants.map((p, i) =>
        i === index ? { ...p, ...participant } : p
      ),
    })),
  addParticipant: () =>
    set((state) => ({
      participants: [
        ...state.participants,
        {
          id: Date.now().toString(),
          name: "",
          email: "",
          age: "",
          stdCode: "+91",
          phone: "",
          studentOrProfessional: "",
          collegeOrCompanyName: "",
          githubLink: "",
          linkedinLink: "",
          devfolioLink: "",
        },
      ],
    })),
  removeParticipant: (index) =>
    set((state) => ({
      participants: state.participants.filter((_, i) => i !== index),
    })),

  // Idea data setters
  setIdeaTitle: (ideaTitle) => set({ ideaTitle }),
  setDocument: (document) => set({ document }),

  // UI state setters
  setError: (error) => set({ error }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsValidating: (isValidating) => set({ isValidating }),
  setServerErrors: (serverErrors) => set({ serverErrors }),

  // Error state setters
  setTeamNameError: (teamNameError) => set({ teamNameError }),
  setTeamSizeError: (teamSizeError) => set({ teamSizeError }),
  setParticipantErrors: (participantErrors) => set({ participantErrors }),
  setIdeaTitleError: (ideaTitleError) => set({ ideaTitleError }),
  setDocumentError: (documentError) => set({ documentError }),

  // Additional state setters
  setDocumentFileName: (documentFileName) => set({ documentFileName }),
  setColleges: (colleges) => set({ colleges }),
  setCollegeSearchInput: (collegeSearchInput) => set({ collegeSearchInput }),
  setIsCustomCollege: (isCustomCollege) => set({ isCustomCollege }),
  setDropdownVisible: (dropdownVisible) => set({ dropdownVisible }),

  // Validation functions
  validateStep1: () => {
    const state = get();
    let isValid = true;

    // Reset error states
    set({
      teamNameError: false,
      teamSizeError: false,
    });

    if (!state.teamName.trim()) {
      set({ teamNameError: true, error: "Team name is required" });
      isValid = false;
    }
    if (state.teamSize < 1 || state.teamSize > 4) {
      set({ teamSizeError: true, error: "Team size must be between 1 and 4" });
      isValid = false;
    }

    return isValid;
  },

  validateStep2: () => {
    const state = get();
    let isValid = true;
    const errors: { [key: string]: boolean } = {};

    // Validate all participants
    state.participants.forEach((participant, index) => {
      if (!participant.name.trim()) {
        errors[`participant-${index}-name`] = true;
        isValid = false;
      }
      if (
        !participant.email.trim() ||
        !/\S+@\S+\.\S+/.test(participant.email)
      ) {
        errors[`participant-${index}-email`] = true;
        isValid = false;
      }
      if (!participant.age.trim()) {
        errors[`participant-${index}-age`] = true;
        isValid = false;
      } else {
        const ageNum = parseInt(participant.age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
          errors[`participant-${index}-age`] = true;
          isValid = false;
        }
      }
      if (!participant.phone.trim()) {
        errors[`participant-${index}-phone`] = true;
        isValid = false;
      } else if (participant.phone.length !== 10) {
        errors[`participant-${index}-phone`] = true;
        isValid = false;
      }
      if (!participant.studentOrProfessional) {
        errors[`participant-${index}-studentOrProfessional`] = true;
        isValid = false;
      }
      if (!participant.collegeOrCompanyName.trim()) {
        errors[`participant-${index}-collegeOrCompanyName`] = true;
        isValid = false;
      }
    });

    set({ participantErrors: errors });
    if (!isValid) {
      set({ error: "Please fill in all required participant information" });
    }

    return isValid;
  },

  validateStep3: () => {
    const state = get();
    let isValid = true;
    const errors: { [key: string]: boolean } = {};

    // Username validation pattern (allow letters, numbers, hyphens, underscores)
    const usernamePattern = /^[a-zA-Z0-9_-]+$/;

    // Validate professional profiles for each participant
    state.participants.forEach((participant, index) => {
      // Validate GitHub username (optional)
      if (
        participant.githubLink &&
        !usernamePattern.test(participant.githubLink)
      ) {
        errors[`participant-${index}-github`] = true;
        isValid = false;
      }

      // Validate LinkedIn username (optional)
      if (
        participant.linkedinLink &&
        !usernamePattern.test(participant.linkedinLink)
      ) {
        errors[`participant-${index}-linkedin`] = true;
        isValid = false;
      }

      // Validate Devfolio username (optional) - frontend stores username only
      if (
        participant.devfolioLink &&
        !usernamePattern.test(participant.devfolioLink)
      ) {
        errors[`participant-${index}-devfolio`] = true;
        isValid = false;
      }
    });

    set({ participantErrors: errors });
    if (!isValid) {
      set({ error: "Please enter valid professional profile information" });
    }

    return isValid;
  },

  validateStep4: () => {
    const state = get();
    let isValid = true;

    // Reset error states
    set({
      ideaTitleError: false,
      documentError: false,
    });

    // Validate idea title (required)
    if (!state.ideaTitle.trim()) {
      set({ ideaTitleError: true, error: "Idea title is required" });
      isValid = false;
    }

    // Validate document (required)
    if (!state.document) {
      set({ documentError: true, error: "Please upload your idea document" });
      isValid = false;
    }

    return isValid;
  },

  // Reset functions
  resetErrors: () =>
    set({
      error: "",
      teamNameError: false,
      teamSizeError: false,
      participantErrors: {},
      ideaTitleError: false,
      documentError: false,
      serverErrors: {},
    }),

  resetForm: () =>
    set({
      step: 0,
      teamName: "",
      teamSize: 1,
      participants: [],
      currentParticipantIndex: 0,
      ideaTitle: "",
      document: null,
      error: "",
      isSubmitting: false,
      isValidating: false,
      serverErrors: {},
      teamNameError: false,
      teamSizeError: false,
      participantErrors: {},
      ideaTitleError: false,
      documentError: false,
      documentFileName: "",
      colleges: [],
      collegeSearchInput: "",
      isCustomCollege: false,
      dropdownVisible: false,
    }),
}));
