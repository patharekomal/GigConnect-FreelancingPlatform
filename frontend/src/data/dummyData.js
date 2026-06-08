// USERS

export const users = [
  {
    user_id: 1,
    name: "ABC Technologies",
    email: "abc@gmail.com",
    password: "1234",
    role: "CLIENT"
  },
  {
    user_id: 2,
    name: "XYZ Solutions",
    email: "xyz@gmail.com",
    password: "1234",
    role: "CLIENT"
  },
  {
    user_id: 3,
    name: "TechNova Pvt Ltd",
    email: "technova@gmail.com",
    password: "1234",
    role: "CLIENT"
  },
  {
    user_id: 4,
    name: "Innovate Systems",
    email: "innovate@gmail.com",
    password: "1234",
    role: "CLIENT"
  },
  {
    user_id: 5,
    name: "DigitalEdge",
    email: "digital@gmail.com",
    password: "1234",
    role: "CLIENT"
  },

  {
    user_id: 6,
    name: "Jane Smith",
    email: "jane@gmail.com",
    password: "1234",
    role: "FREELANCER"
  },
  {
    user_id: 7,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    password: "1234",
    role: "FREELANCER"
  },
  {
    user_id: 8,
    name: "Priya Patel",
    email: "priya@gmail.com",
    password: "1234",
    role: "FREELANCER"
  },
  {
    user_id: 9,
    name: "Amit Joshi",
    email: "amit@gmail.com",
    password: "1234",
    role: "FREELANCER"
  },
  {
    user_id: 10,
    name: "Sneha Kulkarni",
    email: "sneha@gmail.com",
    password: "1234",
    role: "FREELANCER"
  }
];

// JOBS

export const jobs = [
  {
    job_id: 1,
    client_id: 1,
    title: "React Developer Needed",
    description:
      "Looking for a React developer to build a responsive web application.",
    budget: 15000,
    deadline: "2026-05-15",
    status: "OPEN"
  },

  {
    job_id: 2,
    client_id: 2,
    title: "Spring Boot Backend Developer",
    description:
      "Need a backend developer to create REST APIs using Spring Boot.",
    budget: 25000,
    deadline: "2026-05-20",
    status: "OPEN"
  },

  {
    job_id: 3,
    client_id: 3,
    title: "UI/UX Designer",
    description:
      "Design modern and user-friendly interfaces for web applications.",
    budget: 12000,
    deadline: "2026-05-18",
    status: "OPEN"
  },

  {
    job_id: 4,
    client_id: 4,
    title: "Full Stack Developer",
    description:
      "Build complete web solution using React and Spring Boot.",
    budget: 40000,
    deadline: "2026-05-30",
    status: "OPEN"
  },

  {
    job_id: 5,
    client_id: 5,
    title: "Database Designer",
    description:
      "Design MySQL schema and optimize queries.",
    budget: 18000,
    deadline: "2026-05-25",
    status: "OPEN"
  }
];

// BIDS

export const bids = [
  {
    bid_id: 1,
    job_id: 1,
    freelancer_id: 6,
    amount: 14000,
    duration_days: 10,
    proposal: "I have 2 years of React experience.",
    status: "PENDING"
  },

  {
    bid_id: 2,
    job_id: 2,
    freelancer_id: 6,
    amount: 23000,
    duration_days: 15,
    proposal: "Experienced Spring Boot developer.",
    status: "ACCEPTED"
  },

  {
    bid_id: 3,
    job_id: 3,
    freelancer_id: 6,
    amount: 11000,
    duration_days: 7,
    proposal: "Professional UI/UX designer.",
    status: "REJECTED"
  }
];

// PROJECTS

export const projects = [
  {
    project_id: 1,
    job_id: 2,
    client_id: 2,
    freelancer_id: 7,
    agreed_amount: 23000,
    status: "IN_PROGRESS",
    submitted_work: null
  },

  {
    project_id: 2,
    job_id: 4,
    client_id: 4,
    freelancer_id: 6,
    agreed_amount: 38000,
    status: "COMPLETED",
    submitted_work: "github.com/project-link"
  }
];

// PAYMENTS

export const payments = [
  {
    payment_id: 1,
    project_id: 1,
    client_id: 1,
    amount: 15000,
    status: "PENDING",
    created_at: "2026-05-15"
  },

  {
    payment_id: 2,
    project_id: 2,
    client_id: 2,
    amount: 23000,
    status: "PENDING",
    created_at: "2026-05-20"
  },

  {
    payment_id: 3,
    project_id: 3,
    client_id: 3,
    amount: 12000,
    status: "RELEASED",
    created_at: "2026-05-10"
  }
];

// REVIEWS

export const reviews = [
  {
    review_id: 1,
    project_id: 2,
    reviewer_id: 4,
    reviewee_id: 6,
    rating: 5,
    comment: "Excellent work delivered on time."
  },

  {
    review_id: 2,
    project_id: 2,
    reviewer_id: 6,
    reviewee_id: 4,
    rating: 5,
    comment: "Great client and clear requirements."
  }
];

// MESSAGES

export const messages = [
  {
    message_id: 1,
    project_id: 1,
    sender_id: 2,
    sender_name: "XYZ Solutions",
    message: "Hello Rahul, can you share project progress?",
    time: "10:00 AM"
  },
  {
    message_id: 2,
    project_id: 1,
    sender_id: 7,
    sender_name: "Rahul Sharma",
    message: "Sure, I have completed 70% of the work.",
    time: "10:05 AM"
  },
  {
    message_id: 3,
    project_id: 1,
    sender_id: 2,
    sender_name: "XYZ Solutions",
    message: "Great. Please share screenshots.",
    time: "10:10 AM"
  }
];

// FREELANCER PROFILES

export const freelancerProfiles = [
{
    freelancer_id: 6,
    title: "Frontend Developer",
    skills: [
        "React",
        "JavaScript",
        "Bootstrap",
        "HTML",
        "CSS"
    ],
    experience: 2,
    portfolio: "https://portfolio-jane.com",
    bio: "Passionate frontend developer specializing in responsive web applications.",
    hourlyRate: 800,
    rating: 4.8
},
{
    freelancer_id: 7,
    title: "Full Stack Developer",
    skills: [
        "Java",
        "Spring Boot",
        "React",
        "MySQL"
    ],
    experience: 3,
    portfolio: "https://portfolio-john.com",
    bio: "Experienced full stack developer with strong backend expertise.",
    hourlyRate: 1200,
    rating: 4.9
}
];