import { create } from 'zustand';

interface College {
  id: string;
  name: string;
}

interface RegistrationState {
  // Current step
  step: number;
  
  // Form data
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
  ideaTitle: string;
  document: File | null;
  
  // UI states
  error: string;
  isSubmitting: boolean;
  isValidating: boolean;
  serverErrors: { [key: string]: string };
  
  // Error states
  nameError: boolean;
  emailError: boolean;
  ageError: boolean;
  phoneError: boolean;
  studentOrProfessionalError: boolean;
  collegeOrCompanyNameError: boolean;
  githubError: boolean;
  linkedinError: boolean;
  devfolioError: boolean;
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
  
  // Form data setters
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAge: (age: string) => void;
  setStdCode: (stdCode: string) => void;
  setPhone: (phone: string) => void;
  setStudentOrProfessional: (studentOrProfessional: string) => void;
  setCollegeOrCompanyName: (collegeOrCompanyName: string) => void;
  setGithubLink: (githubLink: string) => void;
  setLinkedinLink: (linkedinLink: string) => void;
  setDevfolioLink: (devfolioLink: string) => void;
  setIdeaTitle: (ideaTitle: string) => void;
  setDocument: (document: File | null) => void;
  
  // UI state setters
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsValidating: (isValidating: boolean) => void;
  setServerErrors: (serverErrors: { [key: string]: string }) => void;
  
  // Error state setters
  setNameError: (nameError: boolean) => void;
  setEmailError: (emailError: boolean) => void;
  setAgeError: (ageError: boolean) => void;
  setPhoneError: (phoneError: boolean) => void;
  setStudentOrProfessionalError: (studentOrProfessionalError: boolean) => void;
  setCollegeOrCompanyNameError: (collegeOrCompanyNameError: boolean) => void;
  setGithubError: (githubError: boolean) => void;
  setLinkedinError: (linkedinError: boolean) => void;
  setDevfolioError: (devfolioError: boolean) => void;
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
  
  // Reset functions
  resetErrors: () => void;
  resetForm: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  // Initial state
  step: 0,
  
  // Form data initial values
  name: '',
  email: '',
  age: '',
  stdCode: '+91',
  phone: '',
  studentOrProfessional: '',
  collegeOrCompanyName: '',
  githubLink: '',
  linkedinLink: '',
  devfolioLink: '',
  ideaTitle: '',
  document: null,
  
  // UI states initial values
  error: '',
  isSubmitting: false,
  isValidating: false,
  serverErrors: {},
  
  // Error states initial values
  nameError: false,
  emailError: false,
  ageError: false,
  phoneError: false,
  studentOrProfessionalError: false,
  collegeOrCompanyNameError: false,
  githubError: false,
  linkedinError: false,
  devfolioError: false,
  ideaTitleError: false,
  documentError: false,
  
  // Additional states initial values
  documentFileName: '',
  colleges: [],
  collegeSearchInput: '',
  isCustomCollege: false,
  dropdownVisible: false,
  
  // Step actions
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 2) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),
  
  // Form data setters
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setAge: (age) => set({ age }),
  setStdCode: (stdCode) => set({ stdCode }),
  setPhone: (phone) => set({ phone }),
  setStudentOrProfessional: (studentOrProfessional) => set({ studentOrProfessional }),
  setCollegeOrCompanyName: (collegeOrCompanyName) => set({ collegeOrCompanyName }),
  setGithubLink: (githubLink) => set({ githubLink }),
  setLinkedinLink: (linkedinLink) => set({ linkedinLink }),
  setDevfolioLink: (devfolioLink) => set({ devfolioLink }),
  setIdeaTitle: (ideaTitle) => set({ ideaTitle }),
  setDocument: (document) => set({ document }),
  
  // UI state setters
  setError: (error) => set({ error }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsValidating: (isValidating) => set({ isValidating }),
  setServerErrors: (serverErrors) => set({ serverErrors }),
  
  // Error state setters
  setNameError: (nameError) => set({ nameError }),
  setEmailError: (emailError) => set({ emailError }),
  setAgeError: (ageError) => set({ ageError }),
  setPhoneError: (phoneError) => set({ phoneError }),
  setStudentOrProfessionalError: (studentOrProfessionalError) => set({ studentOrProfessionalError }),
  setCollegeOrCompanyNameError: (collegeOrCompanyNameError) => set({ collegeOrCompanyNameError }),
  setGithubError: (githubError) => set({ githubError }),
  setLinkedinError: (linkedinError) => set({ linkedinError }),
  setDevfolioError: (devfolioError) => set({ devfolioError }),
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
      nameError: false,
      emailError: false,
      ageError: false,
      phoneError: false,
      studentOrProfessionalError: false,
      collegeOrCompanyNameError: false,
    });
    
    if (!state.name.trim()) {
      set({ nameError: true });
      isValid = false;
    }
    if (!state.email.trim() || !/\S+@\S+\.\S+/.test(state.email)) {
      set({ emailError: true });
      isValid = false;
    }
    if (!state.age.trim()) {
      set({ ageError: true });
      isValid = false;
    } else {
      const ageNum = parseInt(state.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        set({ ageError: true, error: "Please enter a valid age between 1 and 120" });
        isValid = false;
      }
    }
    if (!state.phone.trim()) {
      set({ phoneError: true });
      isValid = false;
    } else if (state.phone.length !== 10) {
      set({ phoneError: true });
      isValid = false;
    }
    if (!state.studentOrProfessional) {
      set({ studentOrProfessionalError: true });
      isValid = false;
    }
    if (!state.collegeOrCompanyName.trim()) {
      set({ collegeOrCompanyNameError: true });
      isValid = false;
    }
    
    return isValid;
  },
  
  validateStep2: () => {
    const state = get();
    let isValid = true;
    
    // Reset error states
    set({
      githubError: false,
      linkedinError: false,
      devfolioError: false,
    });
    
    // Username validation pattern (allow letters, numbers, hyphens, underscores)
    const usernamePattern = /^[a-zA-Z0-9_-]+$/;
    const devfolioUrlPattern = /^https?:\/\/(www\.)?devfolio\.co\/@?[a-zA-Z0-9_-]+\/?$/;
    
    // Validate GitHub username (optional)
    if (state.githubLink && !usernamePattern.test(state.githubLink)) {
      set({ githubError: true, error: "Please enter a valid GitHub username (letters, numbers, hyphens, underscores only)" });
      isValid = false;
    }
    
    // Validate LinkedIn username (optional)
    if (state.linkedinLink && !usernamePattern.test(state.linkedinLink)) {
      set({ linkedinError: true, error: "Please enter a valid LinkedIn username (letters, numbers, hyphens, underscores only)" });
      isValid = false;
    }
    
    // Validate Devfolio link (optional)
    if (state.devfolioLink && !devfolioUrlPattern.test(state.devfolioLink)) {
      set({ devfolioError: true, error: "Please enter a valid Devfolio profile URL (https://devfolio.co/@username)" });
      isValid = false;
    }
    
    return isValid;
  },
  
  validateStep3: () => {
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
  resetErrors: () => set({
    error: '',
    nameError: false,
    emailError: false,
    ageError: false,
    phoneError: false,
    studentOrProfessionalError: false,
    collegeOrCompanyNameError: false,
    githubError: false,
    linkedinError: false,
    devfolioError: false,
    ideaTitleError: false,
    documentError: false,
    serverErrors: {},
  }),
  
  resetForm: () => set({
    step: 0,
    name: '',
    email: '',
    age: '',
    stdCode: '+91',
    phone: '',
    studentOrProfessional: '',
    collegeOrCompanyName: '',
    githubLink: '',
    linkedinLink: '',
    devfolioLink: '',
    ideaTitle: '',
    document: null,
    error: '',
    isSubmitting: false,
    isValidating: false,
    serverErrors: {},
    nameError: false,
    emailError: false,
    ageError: false,
    phoneError: false,
    studentOrProfessionalError: false,
    collegeOrCompanyNameError: false,
    githubError: false,
    linkedinError: false,
    devfolioError: false,
    ideaTitleError: false,
    documentError: false,
    documentFileName: '',
    colleges: [],
    collegeSearchInput: '',
    isCustomCollege: false,
    dropdownVisible: false,
  }),
})); 