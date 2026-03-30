/* =============================================================
   config.js — SCHOOL CONFIGURATION
   ✏️  Edit this file to change school info, contact details,
       social links, and admin credentials.
   ============================================================= */
const CONFIG = {

  /* ----------------------------------------------------------
     SCHOOL INFO — Change school name, tagline, location
     ---------------------------------------------------------- */
  school: {
    name:        "First Cry Convent School",
    tagline:     "Nurturing Minds. Building Characters. Shaping Futures.",
    established: "2005",
    affiliation: "CBSE Affiliated",
    location:    "Chhatarpur, Madhya Pradesh, India",
    address:     "Near Gandhi Chowk, Chhatarpur, Madhya Pradesh – 471001",
    logo:        "🏫",
  },

  /* ----------------------------------------------------------
     CONTACT — Phone, email, hours
     ---------------------------------------------------------- */
  contact: {
    phone1:    "+91 9876543210",
    phone2:    "+91 7682-250000",
    email:     "firstcryconventschool@gmail.com",
    hoursWeek: "Mon–Sat: 8:00 AM – 2:30 PM",
    hoursOfc:  "Office: 8:00 AM – 4:00 PM",
  },

  /* ----------------------------------------------------------
     SOCIAL LINKS — Replace # with actual URLs
     ---------------------------------------------------------- */
  social: {
    facebook:  "#",
    instagram: "#",
    youtube:   "#",
    twitter:   "#",
    whatsapp:  "#",
  },

  /* ----------------------------------------------------------
     HERO STATS — Numbers shown on homepage
     ---------------------------------------------------------- */
  stats: [
    { target: 1500, label: "Students"      },
    { target: 80,   label: "Expert Teachers" },
    { target: 40,   label: "Classrooms"    },
    { target: 20,   label: "Years Legacy"  },
  ],

  /* ----------------------------------------------------------
     ADMIN CREDENTIALS
     ✏️  Change username and password here.
         Password must be at least 6 characters.
     ---------------------------------------------------------- */
  admin: {
    username: "admin",
    password: "admin123",
  },

  /* ----------------------------------------------------------
     GALLERY — Folder/category list
     ✏️  Add or rename categories here.
         These appear as filter buttons + upload dropdown.
     ---------------------------------------------------------- */
  galleryCategories: [
    { key: "events",    label: "Events",    color: "#1e3a8a" },
    { key: "sports",    label: "Sports",    color: "#065f46" },
    { key: "academics", label: "Academics", color: "#7c3aed" },
    { key: "cultural",  label: "Cultural",  color: "#b45309" },
    { key: "classroom", label: "Classroom", color: "#0e7490" },
    { key: "other",     label: "Other",     color: "#475569" },
  ],

  /* ----------------------------------------------------------
     NOTICE CATEGORIES
     ---------------------------------------------------------- */
  noticeCategories: ["General","Exam","Holiday","Fee","Event","Admission"],

  /* ----------------------------------------------------------
     PRINCIPAL INFO
     ---------------------------------------------------------- */
  principal: {
    name:   "Mrs. Anjali Sharma",
    avatar: "👨‍💼",
    message: `"Welcome to First Cry Convent School — a place where every child's dream is
              nurtured with care and dedication. Our team of passionate educators works
              tirelessly to create an environment where learning is joyful, creativity
              flourishes, and every student feels valued. Together, we are building
              tomorrow's leaders."`,
  },
  /* ----------------------------------------------------------
   👨‍🏫 FACULTY / STAFF DATA
   Add or remove teachers here
   ---------------------------------------------------------- */
faculty: [
  {
    id: 1,
    name: "Mr. Ramesh Kumar Sharma",
    designation: "Principal",
    subject: "School Administration",
    qualification: "M.Ed, M.A. (English)",
    experience: "25 Years",
    emoji: "👨‍💼",
    bg: "#1e3a8a",
    type: "management",
    achievements: "State Award Winner 2019",
    email: "principal@firstcryschool.com",
    phone: "+91 9876543210"
  },
  {
    id: 2,
    name: "Mrs. Sunita Tiwari",
    designation: "Vice Principal",
    subject: "Hindi & Sanskrit",
    qualification: "M.A. (Hindi), B.Ed",
    experience: "18 Years",
    emoji: "👩‍💼",
    bg: "#7c3aed",
    type: "management",
    achievements: "Best Teacher Award 2021",
    email: "vp@firstcryschool.com",
    phone: "+91 9876543211"
  },
  {
    id: 3,
    name: "Mr. Dinesh Patel",
    designation: "Senior Teacher",
    subject: "Mathematics",
    qualification: "M.Sc (Maths), B.Ed",
    experience: "15 Years",
    emoji: "👨‍🏫",
    bg: "#0e7490",
    type: "primary",
    achievements: "100% Board Results 5 Years",
    email: "d.patel@firstcryschool.com",
    phone: "+91 9876543212"
  },
  {
    id: 4,
    name: "Mrs. Priya Mishra",
    designation: "Senior Teacher",
    subject: "Science & Biology",
    qualification: "M.Sc (Biology), B.Ed",
    experience: "12 Years",
    emoji: "👩‍🔬",
    bg: "#065f46",
    type: "primary",
    achievements: "Science Olympiad Coordinator",
    email: "p.mishra@firstcryschool.com",
    phone: "+91 9876543213"
  },
  {
    id: 5,
    name: "Mr. Ajay Verma",
    designation: "Teacher",
    subject: "English Language",
    qualification: "M.A. (English), B.Ed",
    experience: "10 Years",
    emoji: "👨‍🏫",
    bg: "#b45309",
    type: "primary",
    achievements: "Best Speaker Award 2022",
    email: "a.verma@firstcryschool.com",
    phone: "+91 9876543214"
  },
  {
    id: 6,
    name: "Mrs. Kavita Singh",
    designation: "Teacher",
    subject: "Social Science",
    qualification: "M.A. (History), B.Ed",
    experience: "8 Years",
    emoji: "👩‍🏫",
    bg: "#be185d",
    type: "primary",
    achievements: "Quiz Competition In-charge",
    email: "k.singh@firstcryschool.com",
    phone: "+91 9876543215"
  },
  {
    id: 7,
    name: "Mr. Rohit Gupta",
    designation: "Computer Teacher",
    subject: "Computer Science & IT",
    qualification: "MCA, B.Ed",
    experience: "7 Years",
    emoji: "👨‍💻",
    bg: "#1d4ed8",
    type: "primary",
    achievements: "Digital Classroom Expert",
    email: "r.gupta@firstcryschool.com",
    phone: "+91 9876543216"
  },
  {
    id: 8,
    name: "Mrs. Rekha Jain",
    designation: "Pre-Primary Teacher",
    subject: "Nursery – UKG",
    qualification: "B.Ed, Early Childhood Education",
    experience: "6 Years",
    emoji: "👩‍🏫",
    bg: "#c2410c",
    type: "preprimary",
    achievements: "Child Psychology Certified",
    email: "r.jain@firstcryschool.com",
    phone: "+91 9876543217"
  },
  {
    id: 9,
    name: "Mr. Suresh Yadav",
    designation: "Sports Teacher",
    subject: "Physical Education",
    qualification: "B.P.Ed, M.P.Ed",
    experience: "9 Years",
    emoji: "👨‍🏃",
    bg: "#15803d",
    type: "sports",
    achievements: "District Sports Champion Coach",
    email: "s.yadav@firstcryschool.com",
    phone: "+91 9876543218"
  },
  {
    id: 10,
    name: "Mrs. Meena Dubey",
    designation: "Arts Teacher",
    subject: "Art, Craft & Music",
    qualification: "B.F.A, Music Diploma",
    experience: "11 Years",
    emoji: "👩‍🎨",
    bg: "#6d28d9",
    type: "arts",
    achievements: "State Level Art Exhibition Winner",
    email: "m.dubey@firstcryschool.com",
    phone: "+91 9876543219"
  },
  {
    id: 11,
    name: "Mr. Vikas Shukla",
    designation: "Teacher",
    subject: "Physics & Chemistry",
    qualification: "M.Sc (Physics), B.Ed",
    experience: "13 Years",
    emoji: "👨‍🔬",
    bg: "#0f766e",
    type: "primary",
    achievements: "Lab Safety Officer",
    email: "v.shukla@firstcryschool.com",
    phone: "+91 9876543220"
  },
  {
    id: 12,
    name: "Mrs. Anita Rajput",
    designation: "Librarian",
    subject: "Library & Information",
    qualification: "M.Lib.Sc",
    experience: "14 Years",
    emoji: "👩‍📚",
    bg: "#92400e",
    type: "support",
    achievements: "Digital Library Setup Expert",
    email: "a.rajput@firstcryschool.com",
    phone: "+91 9876543221"
  }
],

/* Faculty filter categories */
facultyCategories: [
  { key: "all",        label: "All Staff",      icon: "👥" },
  { key: "management", label: "Management",     icon: "👔" },
  { key: "primary",    label: "Teachers",       icon: "📚" },
  { key: "preprimary", label: "Pre-Primary",    icon: "🧸" },
  { key: "sports",     label: "Sports",         icon: "⚽" },
  { key: "arts",       label: "Arts & Music",   icon: "🎨" },
  { key: "support",    label: "Support Staff",  icon: "🛠️" }
]
};