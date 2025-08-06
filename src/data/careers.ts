export interface Career {
  id: string;
  icon: string;
  description: string;
  responses: string[];
}

export const CAREERS: Career[] = [
  {
    id: "resume-builder",
    icon: "📄",
    description: "Get expert help crafting your perfect resume",
    responses: [
      "Focus on measurable achievements in your resume",
      "Tailor your resume for each job application",
      "Keep it concise - 1-2 pages maximum"
    ]
  },
  {
    id: "interview-prep",
    icon: "💼",
    description: "Prepare for technical and behavioral interviews",
    responses: [
      "Practice common questions for your field",
      "Prepare 2-3 stories using the STAR method",
      "Research the company thoroughly before interviewing"
    ]
  },
  {
    id: "career-path",
    icon: "🛣️",
    description: "Explore potential career paths in your field",
    responses: [
      "Consider both technical and management tracks",
      "Look at adjacent fields that might interest you",
      "Identify key skills needed for advancement"
    ]
  }
];
