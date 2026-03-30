/* =============================================================
   db.js — IN-MEMORY DATABASE
   ✏️  Edit seed data below to pre-fill notices, gallery, fees.
       In production: replace with MongoDB + Express API calls.
   ============================================================= */
const DB = (() => {

  /* ---- ADMISSIONS ---- */
  const admissions = [
    { id:1, studentName:'Aarav Sharma',  fatherName:'Rajesh Sharma', dob:'2012-03-15', className:'Class 8',  phone:'9876543210', email:'rajesh@gmail.com',  address:'Gandhi Nagar, Chhatarpur',  prevSchool:'St. Mary School', message:'',                      date:'2025-01-10', status:'Approved'     },
    { id:2, studentName:'Priya Gupta',   fatherName:'Suresh Gupta',  dob:'2014-07-22', className:'Class 6',  phone:'9753112345', email:'suresh@gmail.com',  address:'Civil Lines, Chhatarpur',   prevSchool:'',               message:'',                      date:'2025-01-15', status:'Pending'      },
    { id:3, studentName:'Rohan Patel',   fatherName:'Dinesh Patel',  dob:'2010-11-08', className:'Class 10', phone:'8765432109', email:'dinesh@gmail.com',  address:'Jabalpur Road, Chhatarpur', prevSchool:'Modern School',   message:'Needs hostel facility', date:'2025-02-02', status:'Under Review' },
  ];

  /* ---- MESSAGES ---- */
  const messages = [
    { id:1, name:'Meena Singh', email:'meena@gmail.com', phone:'9812345678', subject:'Admission Enquiry', message:'I want to know about admission for Class 1 for my daughter.', date:'2025-01-18' },
    { id:2, name:'Vikas Kumar', email:'vikas@gmail.com', phone:'9765432100', subject:'Fee Related',        message:'Can you provide the detailed fee structure for Class 9?',      date:'2025-01-25' },
  ];

  /* ---- NOTICES ---- */
  const notices = [
    { id:1, title:'Annual Day Celebration 2025',        desc:'Annual Day will be celebrated on 26th January 2025. All students requested to participate.',        category:'Event',     date:'2025-01-10', hasPdf:true  },
    { id:2, title:'Half-Yearly Examination Schedule',   desc:'Half-yearly exams begin from 15th February 2025. Time table attached. Carry Hall Ticket.',          category:'Exam',      date:'2025-01-20', hasPdf:true  },
    { id:3, title:'Republic Day Holiday Notice',        desc:'School will remain closed on 26th January 2025 on account of Republic Day.',                         category:'Holiday',   date:'2025-01-22', hasPdf:false },
    { id:4, title:'Admission Open for Session 2025–26', desc:'Admissions are now open for all classes Nursery to Class 12. Apply online.',                         category:'Admission', date:'2025-02-01', hasPdf:false },
    { id:5, title:'Fee Payment Last Date',              desc:'Last date for second quarter fee payment is 10th February 2025. Late fee ₹100 after due date.',      category:'Fee',       date:'2025-02-05', hasPdf:true  },
  ];

  /* ---- GALLERY ----
     imageData: stores base64 dataURL for uploaded images
     emoji    : fallback if no image uploaded
  ---- */
  const gallery = [
    { id:1, emoji:'🏆', imageData:null, caption:'Annual Prize Distribution',       category:'events',    date:'2025-01-26', bg:'#1e3a8a' },
    { id:2, emoji:'⚽', imageData:null, caption:'Inter-School Football Tournament', category:'sports',    date:'2025-01-18', bg:'#065f46' },
    { id:3, emoji:'🔬', imageData:null, caption:'Science Exhibition 2025',          category:'academics', date:'2025-01-15', bg:'#7c3aed' },
    { id:4, emoji:'🎭', imageData:null, caption:'Annual Drama Performance',         category:'cultural',  date:'2025-01-26', bg:'#b45309' },
    { id:5, emoji:'🏸', imageData:null, caption:'Badminton Championship',           category:'sports',    date:'2025-02-05', bg:'#1d4ed8' },
    { id:6, emoji:'🎨', imageData:null, caption:'Art & Craft Exhibition',           category:'cultural',  date:'2025-02-08', bg:'#be185d' },
    { id:7, emoji:'📚', imageData:null, caption:'Library Day Celebration',          category:'academics', date:'2025-02-10', bg:'#0e7490' },
    { id:8, emoji:'🎊', imageData:null, caption:'Holi Celebration at School',       category:'events',    date:'2025-03-12', bg:'#c2410c' },
    { id:9, emoji:'🏅', imageData:null, caption:'Sports Day 2025',                  category:'sports',    date:'2025-03-20', bg:'#15803d' },
  ];

  /* ---- FACULTY ---- */
  const faculty = [
    {
      id:1,
      name:'Mr. Ramesh Kumar Sharma',
      designation:'Principal',
      subject:'School Administration',
      qualification:'M.Ed, M.A. (English)',
      experience:'25 Years',
      emoji:'👨‍💼',
      imageData:null,
      bg:'#1e3a8a',
      type:'management',
      achievements:'State Award Winner 2019',
      email:'principal@firstcryschool.com',
      phone:'+91 9876543210',
      date:'2025-01-01'
    },
    {
      id:2,
      name:'Mrs. Sunita Tiwari',
      designation:'Vice Principal',
      subject:'Hindi & Sanskrit',
      qualification:'M.A. (Hindi), B.Ed',
      experience:'18 Years',
      emoji:'👩‍💼',
      imageData:null,
      bg:'#7c3aed',
      type:'management',
      achievements:'Best Teacher Award 2021',
      email:'vp@firstcryschool.com',
      phone:'+91 9876543211',
      date:'2025-01-01'
    },
    {
      id:3,
      name:'Mr. Dinesh Patel',
      designation:'Senior Teacher',
      subject:'Mathematics',
      qualification:'M.Sc (Maths), B.Ed',
      experience:'15 Years',
      emoji:'👨‍🏫',
      imageData:null,
      bg:'#0e7490',
      type:'primary',
      achievements:'100% Board Results 5 Years Running',
      email:'d.patel@firstcryschool.com',
      phone:'+91 9876543212',
      date:'2025-01-01'
    },
    {
      id:4,
      name:'Mrs. Priya Mishra',
      designation:'Senior Teacher',
      subject:'Science & Biology',
      qualification:'M.Sc (Biology), B.Ed',
      experience:'12 Years',
      emoji:'👩‍🔬',
      imageData:null,
      bg:'#065f46',
      type:'primary',
      achievements:'Science Olympiad Coordinator',
      email:'p.mishra@firstcryschool.com',
      phone:'+91 9876543213',
      date:'2025-01-01'
    },
    {
      id:5,
      name:'Mr. Ajay Verma',
      designation:'Teacher',
      subject:'English Language',
      qualification:'M.A. (English), B.Ed',
      experience:'10 Years',
      emoji:'👨‍🏫',
      imageData:null,
      bg:'#b45309',
      type:'primary',
      achievements:'Best Speaker Award 2022',
      email:'a.verma@firstcryschool.com',
      phone:'+91 9876543214',
      date:'2025-01-01'
    },
    {
      id:6,
      name:'Mrs. Kavita Singh',
      designation:'Teacher',
      subject:'Social Science',
      qualification:'M.A. (History), B.Ed',
      experience:'8 Years',
      emoji:'👩‍🏫',
      imageData:null,
      bg:'#be185d',
      type:'primary',
      achievements:'Quiz Competition In-charge',
      email:'k.singh@firstcryschool.com',
      phone:'+91 9876543215',
      date:'2025-01-01'
    },
    {
      id:7,
      name:'Mr. Rohit Gupta',
      designation:'Computer Teacher',
      subject:'Computer Science & IT',
      qualification:'MCA, B.Ed',
      experience:'7 Years',
      emoji:'👨‍💻',
      imageData:null,
      bg:'#1d4ed8',
      type:'primary',
      achievements:'Digital Classroom Expert',
      email:'r.gupta@firstcryschool.com',
      phone:'+91 9876543216',
      date:'2025-01-01'
    },
    {
      id:8,
      name:'Mrs. Rekha Jain',
      designation:'Pre-Primary Teacher',
      subject:'Nursery – UKG',
      qualification:'B.Ed, Early Childhood Education',
      experience:'6 Years',
      emoji:'👩‍🏫',
      imageData:null,
      bg:'#c2410c',
      type:'preprimary',
      achievements:'Child Psychology Certified',
      email:'r.jain@firstcryschool.com',
      phone:'+91 9876543217',
      date:'2025-01-01'
    },
    {
      id:9,
      name:'Mr. Suresh Yadav',
      designation:'Sports Teacher',
      subject:'Physical Education',
      qualification:'B.P.Ed, M.P.Ed',
      experience:'9 Years',
      emoji:'👨‍🏃',
      imageData:null,
      bg:'#15803d',
      type:'sports',
      achievements:'District Sports Champion Coach',
      email:'s.yadav@firstcryschool.com',
      phone:'+91 9876543218',
      date:'2025-01-01'
    },
    {
      id:10,
      name:'Mrs. Meena Dubey',
      designation:'Arts Teacher',
      subject:'Art, Craft & Music',
      qualification:'B.F.A, Music Diploma',
      experience:'11 Years',
      emoji:'👩‍🎨',
      imageData:null,
      bg:'#6d28d9',
      type:'arts',
      achievements:'State Level Art Exhibition Winner',
      email:'m.dubey@firstcryschool.com',
      phone:'+91 9876543219',
      date:'2025-01-01'
    },
    {
      id:11,
      name:'Mr. Vikas Shukla',
      designation:'Teacher',
      subject:'Physics & Chemistry',
      qualification:'M.Sc (Physics), B.Ed',
      experience:'13 Years',
      emoji:'👨‍🔬',
      imageData:null,
      bg:'#0f766e',
      type:'primary',
      achievements:'Lab Safety Officer',
      email:'v.shukla@firstcryschool.com',
      phone:'+91 9876543220',
      date:'2025-01-01'
    },
    {
      id:12,
      name:'Mrs. Anita Rajput',
      designation:'Librarian',
      subject:'Library & Information',
      qualification:'M.Lib.Sc',
      experience:'14 Years',
      emoji:'👩‍📚',
      imageData:null,
      bg:'#92400e',
      type:'support',
      achievements:'Digital Library Setup Expert',
      email:'a.rajput@firstcryschool.com',
      phone:'+91 9876543221',
      date:'2025-01-01'
    },
  ];

  /* ---- ANNOUNCEMENTS (ticker) ---- */
  const announcements = [
    'Admission Open for Session 2025–26 — Apply Online Now!',
    'Annual Sports Day on 20th March 2025 — All Parents Invited!',
    'Half-Yearly Results Declared — Check Notice Board',
    'School Closed on Holi (13–14 March) — Happy Holidays!',
    'New Computer Lab inaugurated with 40 latest systems',
    'Our students won 3 Gold Medals at District Science Olympiad 🏆',
    'Parent-Teacher Meeting scheduled for 22nd February 2025',
  ];

  /* ---- ACADEMIC CALENDAR ---- */
  const academicCalendar = [
    { month:'April 2025',     event:'New Session Begins',            details:'Classes start, new books distributed',            status:'Upcoming' },
    { month:'May–June 2025',  event:'Summer Vacation',               details:'School closed for summer break',                   status:'Upcoming' },
    { month:'July 2025',      event:'Classes Resume',                details:'Session resumes after summer vacation',            status:'Upcoming' },
    { month:'August 2025',    event:'Independence Day Celebration',  details:'Flag hoisting, cultural programs on 15th August',  status:'Upcoming' },
    { month:'September 2025', event:'Half-Yearly Examinations',      details:'Unit tests for all classes 1–12',                  status:'Upcoming' },
    { month:'October 2025',   event:'Dussehra Vacation',             details:'School closed for festival holidays',              status:'Upcoming' },
    { month:'November 2025',  event:'Annual Day Preparations',       details:'Rehearsals and practice for Annual Day',           status:'Upcoming' },
    { month:'December 2025',  event:'Annual Day & Winter Break',     details:'Annual Day celebrations and winter vacation',      status:'Upcoming' },
    { month:'January 2026',   event:'Pre-Board Examinations',        details:'Pre-board for Class 10 & 12 students',            status:'Upcoming' },
    { month:'February 2026',  event:'CBSE Board Exams Begin',        details:'Practical exams from Feb, Theory from March',     status:'Upcoming' },
    { month:'March 2026',     event:'Annual Examinations',           details:'Final exams for Class 1–9 & 11',                  status:'Upcoming' },
  ];

  /* ---- FEE STRUCTURE ---- */
  const feeStructure = [
    { cls:'Nursery – UKG',  admission:'₹3,000', monthly:'₹1,200', annual:'₹15,000' },
    { cls:'Class 1 – 3',    admission:'₹4,000', monthly:'₹1,500', annual:'₹19,000' },
    { cls:'Class 4 – 5',    admission:'₹4,500', monthly:'₹1,700', annual:'₹21,500' },
    { cls:'Class 6 – 8',    admission:'₹5,000', monthly:'₹2,000', annual:'₹26,000' },
    { cls:'Class 9 – 10',   admission:'₹5,500', monthly:'₹2,400', annual:'₹30,500' },
    { cls:'Class 11 – 12',  admission:'₹6,000', monthly:'₹2,800', annual:'₹35,000' },
  ];

  /* ---- CLASSES ---- */
  const classes = [
    { name:'Nursery',  emoji:'🧸', sub:'Pre-Primary'   },
    { name:'LKG',      emoji:'🌱', sub:'Pre-Primary'   },
    { name:'UKG',      emoji:'🌿', sub:'Pre-Primary'   },
    { name:'Class 1',  emoji:'✏️', sub:'Primary'       },
    { name:'Class 2',  emoji:'📖', sub:'Primary'       },
    { name:'Class 3',  emoji:'📝', sub:'Primary'       },
    { name:'Class 4',  emoji:'🔢', sub:'Primary'       },
    { name:'Class 5',  emoji:'🌍', sub:'Primary'       },
    { name:'Class 6',  emoji:'🔬', sub:'Middle'        },
    { name:'Class 7',  emoji:'⚗️', sub:'Middle'        },
    { name:'Class 8',  emoji:'💡', sub:'Middle'        },
    { name:'Class 9',  emoji:'📐', sub:'Secondary'     },
    { name:'Class 10', emoji:'🎓', sub:'Secondary'     },
    { name:'Class 11', emoji:'🔭', sub:'Sr. Secondary' },
    { name:'Class 12', emoji:'🏆', sub:'Sr. Secondary' },
  ];

  /* ---- SUBJECTS ---- */
  const subjects = [
    { icon:'📖', name:'English Language & Literature'         },
    { icon:'📚', name:'Hindi Literature'                      },
    { icon:'🔢', name:'Mathematics'                           },
    { icon:'🔬', name:'Science (Physics, Chemistry, Biology)' },
    { icon:'🌍', name:'Social Science'                        },
    { icon:'💻', name:'Computer Science / IT'                 },
    { icon:'🌐', name:'Sanskrit / Third Language'             },
    { icon:'🎨', name:'Art & Craft'                           },
    { icon:'🎵', name:'Music & Performing Arts'               },
    { icon:'⚽', name:'Physical Education'                    },
    { icon:'💰', name:'Accountancy (Class 11–12)'             },
    { icon:'📊', name:'Business Studies (Class 11–12)'        },
  ];

  /* ---- UPCOMING EVENTS ---- */
  const upcomingEvents = [
    { date:'15 Mar', event:'Science Olympiad',      icon:'🔬' },
    { date:'20 Mar', event:'Sports Day',            icon:'⚽' },
    { date:'26 Mar', event:'Annual Prize Ceremony', icon:'🏆' },
    { date:'01 Apr', event:'New Session Begins',    icon:'📚' },
    { date:'14 Apr', event:'Dr. Ambedkar Jayanti',  icon:'🎉' },
  ];

  /* ---- ID COUNTERS ---- */
  let nextId = {
    admission: 10,
    message:   10,
    notice:    10,
    gallery:   10,
    faculty:   20,   // starts after seed data (12 items)
  };

  /* ---- ADMIN CREDENTIALS ---- */
  let adminCreds = {
    username: (typeof CONFIG !== 'undefined') ? CONFIG.admin.username : 'admin',
    password: (typeof CONFIG !== 'undefined') ? CONFIG.admin.password : 'admin123',
  };

  /* =============================================================
     PUBLIC API
     ============================================================= */
  return {

    /* ----------------------------------------------------------
       GETTERS
       ---------------------------------------------------------- */
    getAnnouncements:  () => [...announcements],
    getNotices:        () => [...notices],
    getGallery:        () => [...gallery],
    getAdmissions:     () => [...admissions],
    getMessages:       () => [...messages],
    getCalendar:       () => [...academicCalendar],
    getFeeStructure:   () => [...feeStructure],
    getClasses:        () => [...classes],
    getSubjects:       () => [...subjects],
    getUpcomingEvents: () => [...upcomingEvents],
    getFaculty:        () => [...faculty],
    getAdminUsername:  () => adminCreds.username,

    /* Faculty category labels (for filter buttons) */
    getFacultyCategories: () => [
      { key:'all',        label:'All Staff',    icon:'👥' },
      { key:'management', label:'Management',   icon:'👔' },
      { key:'primary',    label:'Teachers',     icon:'📚' },
      { key:'preprimary', label:'Pre-Primary',  icon:'🧸' },
      { key:'sports',     label:'Sports',       icon:'⚽' },
      { key:'arts',       label:'Arts & Music', icon:'🎨' },
      { key:'support',    label:'Support Staff',icon:'🛠️' },
    ],

    /* ----------------------------------------------------------
       ADMISSIONS
       ---------------------------------------------------------- */
    addAdmission(data) {
      data.id     = nextId.admission++;
      data.date   = new Date().toISOString().split('T')[0];
      data.status = 'Pending';
      admissions.push(data);
      return {
        success: true,
        message: 'Admission submitted successfully!',
        id: data.id
      };
    },

    /* ----------------------------------------------------------
       MESSAGES
       ---------------------------------------------------------- */
    addMessage(data) {
      data.id   = nextId.message++;
      data.date = new Date().toISOString().split('T')[0];
      messages.push(data);
      return { success: true };
    },

    /* ----------------------------------------------------------
       NOTICES
       ---------------------------------------------------------- */
    addNotice(data) {
      data.id   = nextId.notice++;
      data.date = new Date().toISOString().split('T')[0];
      notices.unshift(data);
      announcements.unshift(data.title);
      return { success: true, notice: data };
    },

    deleteNotice(id) {
      const idx = notices.findIndex(n => n.id === id);
      if (idx > -1) { notices.splice(idx, 1); return true; }
      return false;
    },

    /* ----------------------------------------------------------
       GALLERY
       imageData field stores base64 string from FileReader
       ---------------------------------------------------------- */
    addGalleryItem(data) {
      data.id   = nextId.gallery++;
      data.date = new Date().toISOString().split('T')[0];
      gallery.unshift(data);
      return { success: true, item: data };
    },

    deleteGalleryItem(id) {
      const idx = gallery.findIndex(g => g.id === id);
      if (idx > -1) { gallery.splice(idx, 1); return true; }
      return false;
    },

    /* ----------------------------------------------------------
       FACULTY
       imageData field stores base64 string from FileReader
       ---------------------------------------------------------- */
    addFaculty(data) {
      data.id   = nextId.faculty++;
      data.date = new Date().toISOString().split('T')[0];
      faculty.unshift(data);
      return { success: true, member: data };
    },

    deleteFaculty(id) {
      const idx = faculty.findIndex(f => f.id === id);
      if (idx > -1) { faculty.splice(idx, 1); return true; }
      return false;
    },

    /* Update faculty member */
    updateFaculty(id, updatedData) {
      const idx = faculty.findIndex(f => f.id === id);
      if (idx > -1) {
        faculty[idx] = { ...faculty[idx], ...updatedData };
        return { success: true, member: faculty[idx] };
      }
      return { success: false, message: 'Faculty member not found.' };
    },

    /* Get single faculty member by ID */
    getFacultyById(id) {
      return faculty.find(f => f.id === id) || null;
    },

    /* Faculty stats summary */
    getFacultyStats() {
      return {
        total:      faculty.length,
        management: faculty.filter(f => f.type === 'management').length,
        primary:    faculty.filter(f => f.type === 'primary').length,
        preprimary: faculty.filter(f => f.type === 'preprimary').length,
        sports:     faculty.filter(f => f.type === 'sports').length,
        arts:       faculty.filter(f => f.type === 'arts').length,
        support:    faculty.filter(f => f.type === 'support').length,
      };
    },

    /* ----------------------------------------------------------
       AUTH
       ---------------------------------------------------------- */
    login(user, pass) {
      return user === adminCreds.username && pass === adminCreds.password;
    },

    changePassword(currentPass, newUser, newPass) {
      if (currentPass !== adminCreds.password) {
        return { success: false, message: 'Current password is incorrect.' };
      }
      if (newPass.length < 6) {
        return { success: false, message: 'New password must be at least 6 characters.' };
      }
      adminCreds.username = newUser || adminCreds.username;
      adminCreds.password = newPass;
      return { success: true, message: 'Credentials updated successfully!' };
    },

    /* ----------------------------------------------------------
       DASHBOARD SUMMARY STATS
       (used by admin overview panel)
       ---------------------------------------------------------- */
    getDashboardStats() {
      return {
        totalAdmissions: admissions.length,
        pendingAdmissions: admissions.filter(a =>
          a.status === 'Pending').length,
        approvedAdmissions: admissions.filter(a =>
          a.status === 'Approved').length,
        totalMessages: messages.length,
        totalNotices:  notices.length,
        totalGallery:  gallery.length,
        totalFaculty:  faculty.length,
        totalAnnouncements: announcements.length,
      };
    },

    /* ----------------------------------------------------------
       SEARCH HELPERS
       ---------------------------------------------------------- */

    /* Search admissions by student name or father name */
    searchAdmissions(query) {
      const q = query.toLowerCase();
      return admissions.filter(a =>
        a.studentName.toLowerCase().includes(q) ||
        a.fatherName.toLowerCase().includes(q)  ||
        a.className.toLowerCase().includes(q)
      );
    },

    /* Search notices by title */
    searchNotices(query) {
      const q = query.toLowerCase();
      return notices.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q)
      );
    },

    /* Search faculty by name or subject */
    searchFaculty(query) {
      const q = query.toLowerCase();
      return faculty.filter(f =>
        f.name.toLowerCase().includes(q)    ||
        f.subject.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q)
      );
    },

    /* Filter admissions by status */
    filterAdmissionsByStatus(status) {
      if (status === 'all') return [...admissions];
      return admissions.filter(a =>
        a.status.toLowerCase() === status.toLowerCase()
      );
    },

    /* Filter gallery by category */
    filterGalleryByCategory(category) {
      if (category === 'all') return [...gallery];
      return gallery.filter(g => g.category === category);
    },

    /* Filter faculty by type */
    filterFacultyByType(type) {
      if (type === 'all') return [...faculty];
      return faculty.filter(f => f.type === type);
    },

  };

})();