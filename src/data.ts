export interface Institution {
  id: number;
  name: string;
  location: string;
  directors: number;
  live: number;
  rev: number;
  pts: number;
  slots: string | null;
  domain: string;
}

export const INSTITUTIONS_INDIA_COLLEGE: Institution[] = [
  { id: 1, name: "Christ University", location: "Bangalore", directors: 2, live: 17, rev: 4, pts: 248, slots: null, domain: "christuniversity.in" },
  { id: 2, name: "Chennai Inst. of Technology", location: "Chennai", directors: 2, live: 14, rev: 3, pts: 201, slots: null, domain: "citchennai.net" },
  { id: 3, name: "Symbiosis", location: "Pune", directors: 2, live: 11, rev: 2, pts: 176, slots: null, domain: "symbiosis.ac.in" },
  { id: 4, name: "IIT Bombay", location: "Mumbai", directors: 2, live: 9, rev: 2, pts: 152, slots: null, domain: "iitb.ac.in" },
  { id: 5, name: "BITS Pilani", location: "Pilani", directors: 2, live: 8, rev: 2, pts: 134, slots: null, domain: "bits-pilani.ac.in" },
  { id: 6, name: "RV College of Engineering", location: "Bangalore", directors: 1, live: 7, rev: 1, pts: 108, slots: "1 slot open", domain: "rvce.edu.in" },
  { id: 7, name: "VIT Vellore", location: "Vellore", directors: 2, live: 6, rev: 1, pts: 89, slots: null, domain: "vit.ac.in" },
  { id: 8, name: "PES University", location: "Bangalore", directors: 0, live: 4, rev: 0, pts: 52, slots: "Both slots open", domain: "pes.edu" },
];

export const INSTITUTIONS_USA_COLLEGE: Institution[] = [
  { id: 1, name: "Stanford University", location: "Palo Alto, CA", directors: 2, live: 21, rev: 6, pts: 312, slots: null, domain: "stanford.edu" },
  { id: 2, name: "MIT", location: "Cambridge, MA", directors: 2, live: 18, rev: 5, pts: 274, slots: null, domain: "mit.edu" },
  { id: 3, name: "Harvard University", location: "Cambridge, MA", directors: 2, live: 15, rev: 4, pts: 230, slots: null, domain: "harvard.edu" },
  { id: 4, name: "UC Berkeley", location: "Berkeley, CA", directors: 2, live: 13, rev: 3, pts: 198, slots: null, domain: "berkeley.edu" },
  { id: 5, name: "NYU Stern", location: "New York, NY", directors: 2, live: 10, rev: 2, pts: 161, slots: null, domain: "nyu.edu" },
  { id: 6, name: "Carnegie Mellon", location: "Pittsburgh, PA", directors: 1, live: 8, rev: 2, pts: 125, slots: "1 slot open", domain: "cmu.edu" },
  { id: 7, name: "University of Michigan", location: "Ann Arbor, MI", directors: 1, live: 6, rev: 1, pts: 94, slots: "1 slot open", domain: "umich.edu" },
];

export const INSTITUTIONS_INDIA_HS: Institution[] = [
  { id: 1, name: "Delhi Public School, RKP", location: "New Delhi", directors: 2, live: 8, rev: 2, pts: 118, slots: null, domain: "dpsrkp.net" },
  { id: 2, name: "Jain Heritage School", location: "Bangalore", directors: 2, live: 6, rev: 1, pts: 91, slots: null, domain: "jainheritagegroup.com" },
  { id: 3, name: "The Shri Ram School", location: "Gurugram", directors: 2, live: 5, rev: 1, pts: 78, slots: null, domain: "tsrs.org" },
  { id: 4, name: "Oberoi International", location: "Mumbai", directors: 1, live: 4, rev: 1, pts: 64, slots: "1 slot open", domain: "oberoi-international.org" },
  { id: 5, name: "Modern School Barakhamba", location: "New Delhi", directors: 1, live: 3, rev: 0, pts: 42, slots: "1 slot open", domain: "modernschool.net" },
];

// Directors Data
export interface Director {
  name: string;
  city: string;
  subtitle: string;
  initials: string;
  role: "CAMPUS DIRECTOR" | "CITY DIRECTOR";
  badgeClass?: string;
  turf: string;
  ventures?: string;
  revenue?: string;
  walkIns?: string;
  isOpen: boolean;
  claimText?: string;
}

export interface DirectorsCountryData {
  campus: {
    banner: string;
    ctaText: string;
    cities: string[];
    items: Director[];
  };
  city: {
    banner: string;
    ctaText: string;
    items: Director[];
  };
}

export const DIRECTORS_DATA: Record<"India" | "USA", DirectorsCountryData> = {
  India: {
    campus: {
      banner: "Campus Directors run single campuses. Apply to represent your college and build the founder network on your campus.",
      ctaText: "Apply as Campus Director",
      cities: ["All", "Bangalore", "Chennai", "Pune", "Mumbai"],
      items: [
        {
          name: "Tanvir Ahmed",
          city: "Bangalore",
          subtitle: "Christ University, Bangalore",
          initials: "TA",
          role: "CAMPUS DIRECTOR",
          turf: "Koramangala + Indiranagar · 5 active merchants",
          ventures: "17",
          revenue: "4",
          walkIns: "340",
          isOpen: false
        },
        {
          name: "Sneha Rao",
          city: "Bangalore",
          subtitle: "PES University, Bangalore",
          initials: "SR",
          role: "CAMPUS DIRECTOR",
          turf: "Jayanagar + JP Nagar · 4 active merchants",
          ventures: "11",
          revenue: "2",
          walkIns: "218",
          isOpen: false
        },
        {
          name: "Open slot - IIT Delhi",
          city: "Delhi",
          subtitle: "Delhi NCR",
          initials: "❓",
          role: "CAMPUS DIRECTOR",
          turf: "This campus is waiting for its first Director. Be the pioneer on your campus.",
          claimText: "Claim this slot",
          isOpen: true
        },
        {
          name: "Ravi Venkat",
          city: "Chennai",
          subtitle: "SRM Institute of Technology, Chennai",
          initials: "RV",
          role: "CAMPUS DIRECTOR",
          turf: "Anna Nagar + Vadapalani · 5 active merchants",
          ventures: "14",
          revenue: "3",
          walkIns: "280",
          isOpen: false
        },
        {
          name: "Aditya More",
          city: "Pune",
          subtitle: "Symbiosis International, Pune",
          initials: "AM",
          role: "CAMPUS DIRECTOR",
          turf: "FC Road + Baner · 3 active merchants",
          ventures: "11",
          revenue: "2",
          walkIns: "176",
          isOpen: false
        },
        {
          name: "Nisha Kulkarni",
          city: "Mumbai",
          subtitle: "IIT Bombay, Mumbai",
          initials: "NK",
          role: "CAMPUS DIRECTOR",
          turf: "Powai + Andheri · 5 active merchants",
          ventures: "9",
          revenue: "2",
          walkIns: "198",
          isOpen: false
        }
      ]
    },
    city: {
      banner: "City Directors run entire metropolitan regions. One per city. Every campus in your territory reports through you.",
      ctaText: "Apply as City Director",
      items: [
        {
          name: "Karthik Dinesh",
          city: "Bangalore",
          subtitle: "Bangalore · 8 campuses",
          initials: "KD",
          role: "CITY DIRECTOR",
          turf: "All of Bangalore: Coordinates Christ, PES, RV College Directors",
          ventures: "32",
          revenue: "7",
          walkIns: "3",
          isOpen: false
        },
        {
          name: "Sowmya Natarajan",
          city: "Chennai",
          subtitle: "Chennai · 2 campuses",
          initials: "SN",
          role: "CITY DIRECTOR",
          turf: "All of Chennai: Coordinates VIT and SSN Directors",
          ventures: "20",
          revenue: "4",
          walkIns: "2",
          isOpen: false
        },
        {
          name: "Open - Pune",
          city: "Pune",
          subtitle: "Maharashtra",
          initials: "❓",
          role: "CITY DIRECTOR",
          turf: "All of Pune: Lead the entire student builder ecosystem in Pune.",
          claimText: "Apply for Pune",
          isOpen: true
        }
      ]
    }
  },
  USA: {
    campus: {
      banner: "US Launch — Richmond, Virginia. We are seeding our first US campuses now. First to claim owns the turf permanently.",
      ctaText: "Apply as Campus Director",
      cities: ["All", "Richmond"],
      items: [
        {
          name: "Open - Richmond, VA",
          city: "Richmond",
          subtitle: "VCU / Short Pump area",
          initials: "❓",
          role: "CAMPUS DIRECTOR",
          turf: "Greater Richmond metro area. Be the first Campus Director in the US.",
          claimText: "Claim Richmond",
          isOpen: true
        },
        {
          name: "Open - Stanford / Palo Alto",
          city: "Palo Alto",
          subtitle: "Stanford University, CA",
          initials: "❓",
          role: "CAMPUS DIRECTOR",
          turf: "Silicon Valley campus territory. Lead the Stanford venture founders.",
          claimText: "Claim Stanford",
          isOpen: true
        }
      ]
    },
    city: {
      banner: "US City Directors run an entire metro. Coordinate all Campus Directors and merchant partners in your territory.",
      ctaText: "Apply as City Director",
      items: [
        {
          name: "Open - New York City",
          city: "New York",
          subtitle: "New York, NY",
          initials: "❓",
          role: "CITY DIRECTOR",
          turf: "All NYC boroughs. Coordinate Manhattan, Brooklyn, and Queens campuses.",
          claimText: "Apply for NYC",
          isOpen: true
        },
        {
          name: "LA · Chicago · Houston · Atlanta",
          city: "Major US Metro",
          subtitle: "Major US Metros",
          initials: "❓",
          role: "CITY DIRECTOR",
          turf: "Major US city territories are open. Build the student founder network.",
          claimText: "Apply for My City",
          isOpen: true
        }
      ]
    }
  }
};

// Founding Members Data
export interface FoundingMember {
  name: string;
  location: string;
  initials: string;
  category: "Security" | "Design" | "Bug Fix" | "UX Suggestion" | "Community" | "Development";
  description: string;
  joined: string;
}

export interface FoundingMembersCountryData {
  stats: {
    members: number;
    bugs: number;
    vulns: number;
    design: number;
  };
  banner: string;
  members: FoundingMember[];
}

export const FOUNDING_MEMBERS_DATA: Record<"India" | "USA", FoundingMembersCountryData> = {
  India: {
    stats: { members: 47, bugs: 12, vulns: 8, design: 23 },
    banner: "India Founding Members — these early contributors helped us test early builds, spot critical system bugs, and refine features across campuses.",
    members: [
      {
        name: "VT Pranav Jeyan",
        location: "Christ University, Bangalore",
        initials: "PJ",
        category: "Security",
        description: "Identified a critical auth-flow vulnerability in the Spark team-formation endpoint that would have allowed uninvited users to join private groups.",
        joined: "Joined March 2026"
      },
      {
        name: "Ananga Rao",
        location: "PES University, Bengaluru",
        initials: "AR",
        category: "Design",
        description: "Co-designed the Deals Near You card layout and proposed the split drive-in UI vs. delivery visual distinction that is now moving to the fill-rate mechanic section.",
        joined: "Joined January 2026"
      },
      {
        name: "Siddharth Kumar",
        location: "RVCE, Bengaluru",
        initials: "SK",
        category: "Bug Fix",
        description: "Found and documented a race condition in the Spark expiry timer that caused group chats to form before the creator had accepted all members.",
        joined: "Joined January 2026"
      },
      {
        name: "Meera Pillai",
        location: "Symbiosis, Pune",
        initials: "MP",
        category: "UX Suggestion",
        description: "Proposed adding the '16 of 20 Sparks filled' counter to the create screen after beta testing showed users-banks were missing context.",
        joined: "Joined February 2026"
      },
      {
        name: "Rohan Nair",
        location: "IIT Bombay, Mumbai",
        initials: "RN",
        category: "Community",
        description: "Ran the first 20 manual Sparks during closed beta, personally responding to user feedback and helping test Spark-to-merchant workflow.",
        joined: "Joined December 2025"
      },
      {
        name: "Vikram Sharma",
        location: "BITS Pilani, Goa",
        initials: "VS",
        category: "Development",
        description: "Executed a static analysis of the Android APK and surfaced two hardcoded API keys that were unintentionally included in a pre-release build.",
        joined: "Joined April 2026"
      },
      {
        name: "Priya Bair",
        location: "IIT Madras, Chennai",
        initials: "PB",
        category: "Design",
        description: "Co-designed the Aspiring Venture Club stage roll-up and the Showcase card layout, ensuring the high school programme felt distinct from the college tier.",
        joined: "Joined March 2026"
      },
      {
        name: "Arjun Mehta",
        location: "BITS Pilani, Hyderabad",
        initials: "AM",
        category: "Development",
        description: "Built the working prototype of the Merchant Margin Calculator in SheetJS, validating the core math model before the app rewrite even began.",
        joined: "Joined March 2026"
      },
      {
        name: "Kavya Reddy",
        location: "IIT Delhi, New Delhi",
        initials: "KR",
        category: "Bug Fix",
        description: "Found and reproduced a ghost-messaging bug where QR-scan group-chats were stored in local text storage, causing cross-timezone messaging lag.",
        joined: "Joined April 2026"
      }
    ]
  },
  USA: {
    stats: { members: 8, bugs: 3, vulns: 2, design: 4 },
    banner: "US Founding Members — Early Access. We're seeding our first US campuses from Richmond, VA. Be among the first Campus Directors to put your college on the board.",
    members: [
      {
        name: "Jordan Mills",
        location: "VCU, Richmond, Virginia",
        initials: "JM",
        category: "Community",
        description: "First US Campus Director candidate at VCU. Ran initial student outreach in Broad Street, identified the first 3 merchant prospects in the pilot corridor.",
        joined: "Joined May 2026"
      },
      {
        name: "Sarah Chen",
        location: "University of Virginia, VA",
        initials: "SC",
        category: "UX Suggestion",
        description: "Flagged that the in-app currency display defaulted to ₹ for US users; proposed the automatic USD/INR switch based on user profile locale.",
        joined: "Joined May 2026"
      },
      {
        name: "Marcus Rodriguez",
        location: "Short Pump, Virginia",
        initials: "MR",
        category: "Development",
        description: "Validated that the DoorDash 15/20/30% commission tier model could be built into the Merchant Margin Calculator using publicly available rate data.",
        joined: "Joined June 2026"
      }
    ]
  }
};
